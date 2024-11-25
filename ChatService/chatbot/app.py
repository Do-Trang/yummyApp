from flask import Flask, request, jsonify
from flask_cors import CORS
import grpc
import ai_service_pb2
import ai_service_pb2_grpc

app = Flask(__name__)
CORS(app)

# gRPC Client
class AIClient:
    def __init__(self, host='localhost', port=50052):
        self.channel = grpc.insecure_channel(f'{host}:{port}')
        try:
            # Try to initiate the connection
            grpc.channel_ready_future(self.channel).result(timeout=10)
            print(f"Connected to AI service at {host}:{port}")
        except grpc.FutureTimeoutError:
            print(f"Failed to connect to AI service at {host}:{port}")
            raise Exception(f"Failed to connect to AI service at {host}:{port}")
        self.stub = ai_service_pb2_grpc.AIServiceStub(self.channel)

    def first_chat(self, user_id, question):
        try:
            request = ai_service_pb2.FirstChatRequest(user_id=user_id, question=question)
            response = self.stub.FirstChat(request)
            return response.response
        except grpc.RpcError as e:
            print(f"RPC failed: {e.code()}, {e.details()}")
            return None

    def get_chat(self, user_id, session_id, question):
        try:
            request = ai_service_pb2.GetChatRequest(user_id=user_id, session_id=session_id, question=question)
            response = self.stub.GetChat(request)
            return response.response
        except grpc.RpcError as e:
            print(f"RPC failed: {e.code()}, {e.details()}")
            return None

# Initialize gRPC client
grpc_client = AIClient()

@app.route('/first-chat', methods=['POST'])
# def first_chat():
#     data = request.json
#     user_id = data.get('user_id')
#     question = data.get('question')

#     if not user_id or not question:
#         return jsonify({"error": "user_id and question are required"}), 400

#     response = grpc_client.first_chat(user_id, question)

#     if response is None:
#         return jsonify({"error": "Failed to initialize chat session"}), 500

#     return jsonify({"response": response})

# @app.route('/first-chat', methods=['POST'])
@app.route('/first-chat', methods=['POST'])
def first_chat():
    data = request.json
    if not data:
        return jsonify({"error": "Request body must be JSON"}), 400
    
    user_id = data.get('user_id')
    question = data.get('question')

    if not user_id or not question:
        return jsonify({"error": "user_id and question are required"}), 400

    # Attempt to call the gRPC service
    try:
        response = grpc_client.first_chat(user_id, question)

        if response is None:
            return jsonify({"error": "Failed to initialize chat session with the AI service"}), 500
        
        return jsonify({"response": response})

    except grpc.RpcError as e:
        print(f"RPC failed: {e.code()} - {e.details()}")
        return jsonify({"error": f"gRPC error occurred: {e.details()}"}), 500

    except Exception as e:
        print(f"An unexpected error occurred: {str(e)}")
        return jsonify({"error": "An unexpected error occurred. Please try again later."}), 500




@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_id = data.get('user_id')
    session_id = data.get('session_id')
    question = data.get('question')

    if not user_id or not session_id or not question:
        return jsonify({"error": "user_id, session_id, and question are required"}), 400

    response = grpc_client.get_chat(user_id, session_id, question)

    if response is None:
        return jsonify({"error": "Failed to get response from chatbot"}), 500

    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
