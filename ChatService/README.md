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

<<<<<<< HEAD
pip install flask flask-cors grpcio grpcio-tools
pip install --upgrade protobuf
pip install flask[async]
=======

pip install flask flask-cors

[//]: # (pip install --upgrade protobuf)
pip install 'flask[async]'
>>>>>>> 3a051b0763a9ea5d72d9986ab3995f50eba47bae

# Bước 2:
Chỉnh file .env.example --> .env
# Bước 3:
Gõ lệnh: python genAI.py
Gõ lệnh : python ai_service.py




