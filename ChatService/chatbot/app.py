from flask import Flask, request, jsonify
from flask_cors import CORS
from ai_service import AIServicer
from audio.audio_handler import AudioTranscriptRequest, AudioHandler
from audio.whisper import whisper
app = Flask(__name__)
CORS(app)
import tempfile
from pathlib import Path
from envyaml import EnvYAML
import os
import openai
import dotenv
_current_dir = os.path.dirname(__file__)
dotenv.load_dotenv(os.path.join(_current_dir, ".env"))
CONFIG = EnvYAML(os.path.join(_current_dir, "config.yaml"))
client = openai.OpenAI(api_key=CONFIG["openai"]["api_key"])
audio = AudioHandler()
# Initialize gRPC client
ai_service = AIServicer()

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
        response = ai_service.first_chat(user_id, question)

        if response is None:
            return jsonify({"error": "Failed to initialize chat session with the AI service"}), 500

        return jsonify({"response": response})
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

    response = ai_service.get_chat(user_id, session_id, question)

    if response is None:
        return jsonify({"error": "Failed to get response from chatbot"}), 500

    return jsonify({"response": response})


from flask import request

@app.route('/transcribe', methods=['POST'])
async def generate_transcription():
    data = request.get_json()
    # data["audio"] chứa chuỗi base64 (theo ví dụ phía trước)
    audio_base64 = data.get("audio", None)
    if not audio_base64:
        return {"error": "No audio data provided"}, 400
    
    audio_handler = audio
    # Extracts the audio segment of the file
    audio_segment, _ = audio_handler.extract_audio_segment(audio_base64)

    # Send it as a tempfile path to openai - because that's the acceptable way to do it
    with tempfile.NamedTemporaryFile(suffix=".mp3", delete=True) as tmp_file:
        audio_segment.export(tmp_file.name, format="mp3")
        speech_filepath = Path(tmp_file.name)
        transcripted_response = await whisper(audio_file=open(speech_filepath, "rb"), CONFIG=CONFIG, client=client)

    return {"response": transcripted_response}


if __name__ == "__main__":

    app.run(host='0.0.0.0', port=5000)
