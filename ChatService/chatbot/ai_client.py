import grpc
import ai_service_pb2
import ai_service_pb2_grpc

class AIClient:
    def __init__(self, host='localhost', port=50052):
        self.channel = grpc.insecure_channel(f'{host}:{port}')
        self.stub = ai_service_pb2_grpc.AIServiceStub(self.channel)

    def get_session_ids(self, user_id):
        """Get all session IDs for a user"""
        try:
            request = ai_service_pb2.SessionIDsRequest(user_id=user_id)
            response = self.stub.GetSessionIds(request)
            return response.session_ids
        except grpc.RpcError as e:
            print(f"RPC failed: {e.code()}, {e.details()}")
            return None

    def get_chat(self, user_id, session_id, question):
        """Get chat response for a question"""
        try:
            request = ai_service_pb2.GetChatRequest(
                user_id=user_id,
                session_id=session_id,
                question=question
            )
            response = self.stub.GetChat(request)
            return response.response
        except grpc.RpcError as e:
            print(f"RPC failed: {e.code()}, {e.details()}")
            return None

    def get_history(self, user_id, session_id):
        """Get chat history for a session"""
        try:
            request = ai_service_pb2.GetHistoryRequest(
                user_id=user_id,
                session_id=session_id
            )
            response = self.stub.GetHistory(request)
            return response.history
        except grpc.RpcError as e:
            print(f"RPC failed: {e.code()}, {e.details()}")
            return None

def main():
    # Example usage
    client = AIClient()
    
    # Example user ID and session ID
    user_id = "user123"
    
    # Get all session IDs for the user
    session_ids = client.get_session_ids(user_id)
    print(f"Session IDs: {session_ids}")
    
    if session_ids:
        # Use the first session ID for example
        session_id = "session125"
        
        # Get chat history
        history = client.get_history(user_id, session_id)
        print(f"Chat history: {history}")
        
        # Send a question and get response
        question = "What is your name?"
        response = client.get_chat(user_id, session_id, question)
        print(f"Response: {response}")

if __name__ == "__main__":
    main()