
# Typing hints
from typing import Optional
from pydantic import BaseModel

# Utils
import json
import base64
from pydub import AudioSegment
from io import BytesIO


# Utils
from pathlib import Path

class AudioTranscriptRequest(BaseModel):
    audio: str


## Creating handler
class AudioHandler():
    def __init__(
        self,
    ):
        pass

    def extract_audio_segment(self, audio_file):
        """Extracts the audio segment from the audio file"""

        # Extracting the audio segment
        audio_data = base64.b64decode(audio_file)
        audio_segment = AudioSegment.from_file(BytesIO(audio_data))
        return audio_segment, audio_data
