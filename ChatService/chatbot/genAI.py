import json,os

from llama_index.llms.gemini import Gemini
from llama_index.core import SimpleDirectoryReader, StorageContext
from llama_index.core import VectorStoreIndex,Settings
from llama_index.vector_stores.postgres import PGVectorStore
import textwrap
from llama_index.embeddings.gemini import GeminiEmbedding
from sqlalchemy import make_url
import dotenv
import google.generativeai as genai
from llama_index.core.vector_stores import ExactMatchFilter
from llama_index.core.node_parser import (
    SentenceSplitter,
    SemanticSplitterNodeParser,
)
# from llama_index.core.response.notebook_utils import display_source_node
import psycopg2
from typing import List, Dict, Any

dotenv.load_dotenv(dotenv_path="./.env")
GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")
model_name = "models/text-embedding-004"
embed_model = GeminiEmbedding(model_name=model_name, api_key=GOOGLE_API_KEY)



llm = Gemini(model="models/gemini-1.5-flash")
Settings.embed_model = embed_model
Settings.llm = llm
from llama_index.core.schema import BaseNode, Document

nodes = []
class SessionDB:
    def __init__(self, connection_string: str):
        """Connect to PostgreSQL database"""
        self.conn = psycopg2.connect(connection_string)
        self.conn.autocommit = True
    def create_tables(self):
        """Create sessions table with JSON history"""
        with self.conn.cursor() as cur:
            # Create table with session_id as primary key and JSON history
            cur.execute("""
                CREATE TABLE IF NOT EXISTS sessions (
                    id SERIAL PRIMARY KEY,
                    user_id VARCHAR(255) NOT NULL,
                    session_id VARCHAR(255) NOT NULL,
                    history JSONB DEFAULT '{"contents":[]}'::jsonb,
                    CONSTRAINT unique_user_session UNIQUE (user_id, session_id)
                )
            """)

#trang
    def add_session(self, user_id: str, session_id: str):
        """Create new session only if it doesn't exist"""
        if session_id is None:
            raise ValueError("Session ID cannot be None")  # Raise error if session_id is None

        print(f"Inserting session for user {user_id} with session_id {session_id}")  # Debugging print
        
        try:
            with self.conn.cursor() as cur:
                cur.execute("""
                    INSERT INTO sessions (user_id, session_id)
                    VALUES (%s, %s)
                    ON CONFLICT (user_id, session_id) DO NOTHING
                """, (user_id, session_id))
                
                # Check if the session was inserted or skipped
                if cur.rowcount == 0:
                    print(f"Session for user {user_id} with session_id {session_id} already exists.")
                else:
                    print(f"Session for user {user_id} with session_id {session_id} inserted successfully.")
            
            self.conn.commit()  # Ensure the transaction is committed to the DB
        except Exception as e:
            print(f"Error inserting session for user {user_id}: {e}")
            self.conn.rollback()  # Rollback the transaction if an error occurs
            raise  # Reraise the exception if needed


    def add_history(self,user_id: str, session_id: str, role: str, text: str):
        """Add new history entry to session"""
        self.add_session(user_id, session_id)
        data = self.get_history(user_id, session_id)
        new_message = {
            "role": role,
            "parts": [
                {
                    "text": text
                }
            ]
        }
        my_data = data['contents']
        my_data.append(new_message)
        data['contents'] = my_data


        with self.conn.cursor() as cur:
            query = """
                UPDATE sessions
                SET history = history || %s::jsonb
                WHERE user_id = %s AND session_id = %s
            """
            # Append new history entry to existing history array
            try:
                cur.execute(
                    query=query,
                    vars=(json.dumps(data), user_id, session_id)
                )
                self.conn.commit()  # Make sure to commit the transaction
            except Exception as e:
                self.conn.rollback()  # Rollback on error
                print(f"Error updating session history: {e}")
                raise  # Re-raise the exception for proper error handling
    
    def get_history(self, user_id: str, session_id: str) -> List[dict]:
        self.add_session(user_id, session_id)
        with self.conn.cursor() as cur:
            cur.execute("""
                SELECT history
                FROM sessions
                WHERE user_id = %s AND session_id = %s
            """, (user_id, session_id))
            return cur.fetchone()[0]
    def get_all_sessions(self, user_id: str) -> List[dict]:
        """Get all sessions for a user"""
        with self.conn.cursor() as cur:
            cur.execute("""
                SELECT session_id
                FROM sessions
                WHERE user_id = %s
            """, (user_id,))
            return cur.fetchall()
    def get_session(self,user_id: str, session_id: str) -> dict:
        """Get session with its history"""
        self.add_session(user_id, session_id)
        with self.conn.cursor() as cur:
            cur.execute("""
                SELECT history
                FROM sessions
                WHERE user_id = %s AND session_id = %s
            """, (user_id, session_id))
            return cur.fetchone()
        
    def delete_session(self, user_id: str, session_id: str):
        """Delete session and its history"""
        self.add_session(user_id, session_id)
        with self.conn.cursor() as cur:
            cur.execute("""
                DELETE FROM sessions
                WHERE user_id = %s AND session_id = %s
            """, (user_id, session_id))
            return cur.rowcount
    def close(self):
        """Close database connection"""
        self.conn.close()
    
class EmbeddingDB:
    def __init__(self, connection_string: str):
        """Connect to PostgreSQL database"""
        self.connection_string = connection_string
        self.conn = psycopg2.connect(connection_string)
        self.conn.autocommit = True
    def embedding(self):
        # documents = SimpleDirectoryReader("./data").load_data()
        url = make_url(self.connection_string)

        # splitter = SemanticSplitterNodeParser(
        #     buffer_size=1, breakpoint_percentile_threshold=80, embed_model=embed_model,
        #     include_prev_next_rel=True, include_prev_next_abs=True
        # )

        # nodes = splitter.get_nodes_from_documents(documents)

        hybrid_vector_store = PGVectorStore.from_params(
            database=url.database,
            host=url.host,
            password=url.password,
            port=url.port,
            user=url.username,
            table_name="paul_graham_essay_hybrid_search",
            embed_dim=768,  # gemini embedding dimension
            hybrid_search=True,
            text_search_config="english",
            hnsw_kwargs={
                "hnsw_m": 16,
                "hnsw_ef_construction": 64,
                "hnsw_ef_search": 40,
                "hnsw_dist_method": "vector_cosine_ops",
            },
        )

        storage_context = StorageContext.from_defaults(vector_store=hybrid_vector_store)
        index = VectorStoreIndex(
            nodes, storage_context=storage_context, show_progress=True
        )
        return index
    def load_index(self):
        url = make_url(self.connection_string)
        hybrid_vector_store = PGVectorStore.from_params(
            database=url.database,
            host=url.host,
            password=url.password,
            port=url.port,
            user=url.username,
            table_name="paul_graham_essay_hybrid_search",
            embed_dim=768,  # gemini embedding dimension
            hybrid_search=True,
            text_search_config="english",
            hnsw_kwargs={
                "hnsw_m": 16,
                "hnsw_ef_construction": 64,
                "hnsw_ef_search": 40,
                "hnsw_dist_method": "vector_cosine_ops",
            },
        )
        
        index = VectorStoreIndex.from_vector_store(vector_store=hybrid_vector_store)
        return index

    def close(self):
        """Close database connection"""
        self.conn.close()


class ChatBot:
    def __init__(self, idx):
        self.idx = idx
    def get_response(self, history: str , question: str):
        # Testing it
        # qe = idx.as_query_engine()
        # ret = idx.as_retriever(    retriever_mode="llm", similarity_top_k=5)
        # ret2 = idx.as_retriever(
        #     similarity_top_k=5,
        #     # filter=[ExactMatchFilter(key="search_type", value="restaurant")]
        # )
        # bm25 = idx.as_retriever(similarity_top_k=5, vector_store_query_mode="hybrid", alpha=0.0)
        # hret = idx.as_retriever(similarity_top_k=5, vector_store_query_mode="hybrid", alpha=0.75)
        # hsnw = idx.as_retriever(similarity_top_k=5, vector_store_query_mode="hybrid", alpha=1.0)

        hybrid_query_engine = self.idx.as_query_engine(
            vector_store_query_mode="hybrid", sparse_top_k=5
        )
        search_results= ""
        query = question
        retrieved_nodes = hybrid_query_engine.retrieve(query)

        i = 0
        for node in retrieved_nodes:
            i += 1
            if (node.get_score()>0.5):
                search_results+= f"{i}. {node.get_text()}\n"
    
        prompt = """
        User: You are a question-answering agent specializing in food and restaurant inquiries.
                <Task>
                    Your goal is to answer questions about inquiries (FaQs, services offerings,...) based on search_results.
                    You can respond politely to general conversation but should direct the user to food and restaurant topics if the discussion diverges.
                </Task>
                <instructions>
                    1. The user will present a question. Answer the user's question using only information found in the search_results.
                    2. Understand the question thoroughly to deliver a relevant, complete answer.
                    3. If the search_results lack the details needed, state that no specific answer was found.
                    4. Do not assume the accuracy of any assertions from the user. Instead, cross-reference these assertions with the search results to verify their validity.
                    5. If the user continues with unrelated questions, gently remind them that you are here to help with inquiries specific to my database.
                </instructions>
                Here is the previous conversational history (if any), which may provide additional context for your response:
                <history>
                """ + str(history) + """
                </history>
                Here are the search results from my database:
                <search_results>
                """ + str(search_results) + """
                </search_results>
            This is the user's question:
            <question>
                """ + str(query) + """
            </question>
            <execution_instructions>
                1. Augment your responses with contextual details from the search results, ensuring clarity and relevance.
                2. Generate natural, coherent, and friendly responses, while politely handling general conversation.
                3. After having answered the question, review the user's question to check for any remaining unanswered aspects.
                4. Response the user's question by the language they used in question.
            </execution_instructions>
        """
        model= genai.GenerativeModel(
                'gemini-1.5-flash',
        )
        chat = model.start_chat(enable_automatic_function_calling=True,history=[])
        response = chat.send_message(prompt)
        open("response.txt","w",encoding="utf-8").write(response.text)
        return response.text
def remove_newlines(value):
    if isinstance(value, str):
        return value.replace("\n", "")
    elif isinstance(value, dict):
        return {k: remove_newlines(v) for k, v in value.items()}
    elif isinstance(value, list):
        return [remove_newlines(v) for v in value]
    return value

def change_json_format():
    with open("abc.json","r",encoding="utf-8") as file:
        jsonData = json.load(file)
        jsonData = remove_newlines(jsonData)
    with open("filed.json","r",encoding="utf-8") as file:
        myField = json.load(file)
        myField = remove_newlines(myField)
    with open('mydata.txt', 'w', encoding='utf-8') as file:
        for i in range(len(jsonData)):
            restaurant_name = f"{myField['restaurant_name']} là {jsonData[i]['restaurant_name']}"
            restaurant_address = f"{myField['restaurant_address']} là {jsonData[i]['restaurant_address']}"
            phone_number = f"{myField['phone_number']} là {jsonData[i]['phone_number']}"
            restaurant_description = f"{myField['restaurant_description']} là {jsonData[i]['restaurant_description']}"
            restaurant_rating_service = f"{myField['restaurant_rating_service']} là {jsonData[i]['restaurant_rating_service']}"
            restaurant_rating_price = f"{myField['restaurant_rating_price']} là {jsonData[i]['restaurant_rating_price']}"
            restaurant_rating_food = f"{myField['restaurant_rating_food']} là {jsonData[i]['restaurant_rating_food']}"
            restaurant_rating_decoration = f"{myField['restaurant_rating_decoration']} là {jsonData[i]['restaurant_rating_decoration']}"
            restaurant_tags = f"{myField['restaurant_tags']} là {jsonData[i]['restaurant_tags']}"
            food_name = f"{myField['food_name']} là {jsonData[i]['food_name']}"
            food_description = f"{myField['food_description']} là {jsonData[i]['food_description']}"
            food_price = f"{myField['food_price']} là {jsonData[i]['food_price']} nghìn VNĐ"
            food_rating_delicious = f"{myField['food_rating_delicious']} là {jsonData[i]['food_rating_delicious']}"
            food_rating_presentation = f"{myField['food_rating_presentation']} là {jsonData[i]['food_rating_presentation']}"
            food_rating_price = f"{myField['food_rating_price']} là {jsonData[i]['food_rating_price']}"
            food_rating_fresh = f"{myField['food_rating_fresh']} là {jsonData[i]['food_rating_fresh']}"
            food_tags = f"{myField['food_tags']} là {jsonData[i]['food_tags']}"
            combined = f"{restaurant_name} có {restaurant_address} và {phone_number} và {restaurant_description} và {restaurant_rating_service} và {restaurant_rating_price} và {restaurant_rating_food} và {restaurant_rating_decoration} và {restaurant_tags} và {food_name} có {food_description} và {food_price} và {food_rating_delicious} và {food_rating_presentation} và {food_rating_price} và {food_rating_fresh} và {food_tags}.\n\n"
            # Tạo danh sách các Document (kế thừa từ BaseNode)
            node = Document(text=combined)
            nodes.append(node)

def create_database(connection_string):
    conn= psycopg2.connect(connection_string)
    conn.autocommit = True
    with conn.cursor() as cur:
        cur.execute("CREATE DATABASE vector_db")
        cur.execute("CREATE DATABASE session_db")
        cur.execute("CREATE EXTENSION vector")
def drop_database(connection_string):
    conn= psycopg2.connect(connection_string)
    conn.autocommit = True
    with conn.cursor() as cur:
        cur.execute("DROP DATABASE IF EXISTS vector_db")
        cur.execute("DROP DATABASE IF EXISTS session_db")
        cur.execute("DROP EXTENSION IF EXISTS vector CASCADE")

PORT = os.getenv("PORT")
PASSWORD = os.getenv("PASSWORD")
connection_string = f"postgresql://postgres:{PASSWORD}@localhost:{PORT}"
drop_database(connection_string)
create_database(connection_string)
sessionDB = SessionDB(f"{connection_string}/session_db")
sessionDB.create_tables()
embeddingDB = EmbeddingDB(f"{connection_string}/vector_db")
change_json_format()
embeddingDB.embedding()

