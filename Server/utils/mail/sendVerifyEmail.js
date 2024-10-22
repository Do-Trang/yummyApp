const { sendEmail } = require('./mailConfig.js');

const sendVerificationEmail = async (to, otp) => {
  const subject = 'Xác thực tài khoản của bạn';
  const content = `
    <h1>Xác thực tài khoản</h1>
    <p>Xin chào,</p>
    <p>Cảm ơn bạn đã đăng ký tài khoản của chúng tôi. Để hoàn tất quá trình đăng ký và xác thực tài khoản, vui lòng sử dụng mã OTP dưới đây:</p>
    <h2 style="color: #ff6600;">${otp}</h2>
    <p>Mã OTP này sẽ hết hạn sau 5 phút. Nếu bạn không yêu cầu đăng ký tài khoản, vui lòng bỏ qua email này.</p>
    <p>Chúng tôi rất vui mừng chào đón bạn vào cộng đồng của chúng tôi. Nếu bạn có bất kỳ câu hỏi nào, đừng ngần ngại liên hệ với đội ngũ hỗ trợ của chúng tôi.</p>
    <p>Trân trọng,</p>
    <p>Đội ngũ hỗ trợ</p>
  `;

  try {
    const info = await sendEmail(to, subject, content);
    console.log('Gửi email xác thực thành công:', info.messageId);
  } catch (error) {
    console.error('Lỗi khi gửi email xác thực:', error);
    throw error;
  }
};

sendVerificationEmail('22026515@vnu.edu.vn', '123456');

module.exports = { sendVerificationEmail };
