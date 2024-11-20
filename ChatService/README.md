# Bước 1:
Chuyển file .env.example --> .env
Lấy key từ google theo đường link trong file.
- Tạo môi trường venv: 
** python -m venv my_venv **
- Nếu dùng Ubuntu: source ./my_venv/bin/activate
- Nếu dùng windows: .\my_venv\Scripts\activate
- gõ lệnh:
pip install -r requirements.txt
- sau đó gõ thêm lệnh :< mặc kệ cảnh báo đỏ nhé>
pip install google-generativeai==0.8.3
pip install grpcio-tools==1.68.0
# Bước 2:
Chuyển đường dẫn command line đến file ai_service.proto
Gõ lệnh : 
** python -m grpc_tools.protoc -I. --python_out=./chatbot --grpc_python_out=./chatbot ai_service.proto  **
Nếu xuất hiện 2 file được tạo ra tức là đẫ thành công
# Bước 3:
Di chuyển vào file: genAI.py. Sau đó tìm "connection_string = "postgresql://postgres:password@localhost:5432" --> chuyển về port "5432" và "password" tương ứng của ông.
Hỏi GPT cách chuyển là OK.
# Bước 4:
Gõ lệnh: python genAI.py
Gõ lệnh : python ai_service.py


10.10.10.
