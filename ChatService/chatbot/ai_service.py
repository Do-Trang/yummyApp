# ai_server.py
import genAI
import uuid
import dotenv
dotenv.load_dotenv()
import os

class AIServicer():
    def __init__(self):
        PORT = os.getenv("PORT")
        PASSWORD = os.getenv("PASSWORD")
        connection_string = f"postgresql://postgres:{PASSWORD}@localhost:{PORT}"
        # self.session_db = genAI.SessionDB(f"{connection_string}/session_db")
        embedding_db = genAI.EmbeddingDB(f"{connection_string}/vector_db")
        self.idx =  embedding_db.load_index()
        self.chatbot = genAI.ChatBot(self.idx)
    def GetSessionIds(self, request, context): # ProcessText -- có thể thay bằng title của nó :)))
        try:
            user_id = request.user_id
            # get all session_ids from database from user_id
            session_ids = self.session_db.get_all_sessions(user_id)
            session_ids = str(session_ids)
            print(f"Session IDs for user: {user_id} are: {session_ids}")
            return session_ids
        except Exception as e:
            print(f"Error: {e}")
            raise e

    def GetHistory(self, request, context):
        try:
            user_id = request.user_id
            session_id = request.session_id
            # get all history from database from user_id and session_id
            history = self.session_db.get_history(user_id, session_id)
            print(f"Getting history for user: {user_id} and session: {session_id}")
            # return history
            try: 
                history_map=[
                    {
                        'role': msg['role'],
                        'text': msg['parts'][0]['text']
                    } for msg in history['contents']
                ]
            except Exception as e:
                history_map = {'role': 'model', 'text': 'Hello! How can I help you?'}
                print(f"Warning: {e}")
            return history_map
        except Exception as e:
            print(f"Error: {e}")
            raise e

#trnag
    def first_chat(self, user_id, question):
        try:
            # Just use a random session_id (not saving it to DB)
            random_session_id = str(uuid.uuid4())  # Random session ID for the chat
            print(f"Generated session ID: {random_session_id}")  # Debugging print
            # Get response from the chatbot without saving the session
            response = self.chatbot.get_response(question=question, history=[])
            # Return the response directly without saving to DB
            return response
        except Exception as e:
            print(f"Error: {e}")
            raise e
    def get_chat(self, user_id, session_id, question):
        try:
            # Get response from the chatbot without using history or saving to DB
            response = self.chatbot.get_response(question=question, history=[])
            # Return the response directly without saving to DB
            return response
        except Exception as e:
            print(f"Error: {e}")
            raise e


    