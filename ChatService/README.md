# Bước 1:
Chuyển file .env.example --> .env
Lấy key từ google theo đường link trong file.
- Tạo môi trường venv:
  ** python -m venv venv **
- Nếu dùng Ubuntu: source ./venv/bin/activate
- Nếu dùng windows: .\venv\Scripts\activate
- gõ lệnh:
  pip install -r requirements.txt
- sau đó gõ thêm lệnh :< mặc kệ cảnh báo đỏ nhé>
  pip install google-generativeai==0.8.3


pip install flask flask-cors

[//]: # (pip install --upgrade protobuf)
pip install 'flask[async]'

# Bước 2:
Chỉnh file .env.example --> .env
# Bước 3:
Gõ lệnh: python genAI.py
Gõ lệnh : python ai_service.py




