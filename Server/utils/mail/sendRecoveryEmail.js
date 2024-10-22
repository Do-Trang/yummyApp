const { sendEmail } = require('./mailConfig.js');

const sendRecoveryEmail = async (to, otp) => {
  const subject = 'Khôi phục tài khoản của bạn';
  const content = `
    <h1>Khôi phục tài khoản</h1>
    <p>Xin chào,</p>
    <p>Chúng tôi đã nhận được yêu cầu khôi phục tài khoản của bạn. Để tiếp tục, vui lòng sử dụng mã OTP dưới đây:</p>
    <h2 style="color: #ff6600;">${otp}</h2>
    <p>Mã OTP này sẽ hết hạn sau 5 phút. Nếu bạn không yêu cầu khôi phục tài khoản, vui lòng bỏ qua email này.</p>
    <p>Nếu bạn gặp bất kỳ vấn đề nào, đừng ngần ngại liên hệ với đội ngũ hỗ trợ của chúng tôi.</p>
    <p>Trân trọng,</p>
    <p>Đội ngũ hỗ trợ</p>
  `;

  try {
    const info = await sendEmail(to, subject, content);
    console.log('Gửi email khôi phục thành công:', info.messageId);
  } catch (error) {
    console.error('Lỗi khi gửi email khôi phục:', error);
    throw error;
  }
};

module.exports = { sendRecoveryEmail };
