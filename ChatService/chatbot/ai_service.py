# ai_server.py
import grpc
from concurrent import futures
import ai_service_pb2_grpc
import ai_service_pb2
import genAI
import uuid
class AIServicer(ai_service_pb2_grpc.AIServiceServicer):
    def __init__(self):
        connection_string = "postgresql://postgres:1@localhost:5432"
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
            return ai_service_pb2.SessionIDsResponse(session_ids=session_ids)
        except Exception as e:
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details(str(e))
            raise
    def GetChat(self, request, context):
        try:
            user_id = request.user_id
            session_id = request.session_id
            question = request.question

            # Get response from the chatbot without using history or saving to DB
            response = self.chatbot.get_response(question=question, history=[])

            # Return the response directly without saving to DB
            return ai_service_pb2.GetChatResponse(response=response)
        except Exception as e:
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details(str(e))
            raise
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
            return ai_service_pb2.GetHistoryResponse(history=history_map)
        except Exception as e:
            context.set_code(grpc.StatusCode.ABORTED)
            context.set_details(str(e))
            raise

#trnag
    def FirstChat(self, request, context):
        try:
            user_id = request.user_id
            question = request.question

            # Just use a random session_id (not saving it to DB)
            random_session_id = str(uuid.uuid4())  # Random session ID for the chat
            print(f"Generated session ID: {random_session_id}")  # Debugging print

            # Get response from the chatbot without saving the session
            response = self.chatbot.get_response(question=question, history=[])

            # Return the response directly without saving to DB
            return ai_service_pb2.FirstChatResponse(response=response)
        except Exception as e:
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details(str(e))
            raise

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    ai_service_pb2_grpc.add_AIServiceServicer_to_server(AIServicer(), server)
    server.add_insecure_port('[::]:50052')
    server.start()
    print("AI Service running on port 50052")
    server.wait_for_termination()

if __name__ == '__main__':
    serve()

    