import nodemailer from 'nodemailer';

if (
  !process.env.SYSTEM_EMAIL_SERVICE ||
  !process.env.SYSTEM_EMAIL_PORT ||
  !process.env.SYSTEM_EMAIL_HOST ||
  !process.env.SYSTEM_EMAIL_SENDER ||
  !process.env.SYSTEM_EMAIL_APPPASS
) {
  console.error('환경 변수가 설정되지 않았습니다.');
  process.exit(1);
}

interface VerifyEmailProps {
  email: string;
  id: string;
}
interface ForgotPasswordProps {
  email: string;
  name: string;
  token: string;
}

let transporter = nodemailer.createTransport({
  service: process.env.SYSTEM_EMAIL_SERVICE,
  host: process.env.SYSTEM_EMAIL_HOST,
  port: parseInt(process.env.SYSTEM_EMAIL_PORT, 10),
  secure: true,
  auth: {
    user: process.env.SYSTEM_EMAIL_SENDER,
    pass: process.env.SYSTEM_EMAIL_APPPASS,
  },
});

export async function verifyEmail({ email, id }: VerifyEmailProps) {
  const mailData = {
    to: email,
    subject: `이메일 인증`,
    from: process.env.SYSTEM_EMAIL_SENDER,
    html: `
    <table style="margin:40px auto 20px;text-align:left;border-collapse:collapse;border:0;width:600px;padding:64px 16px;box-sizing:border-box">
      <tbody>
        <tr>
          <td style="display:flex;flex-direction: column;justify-items: center;align-items: center;border: 1px solid #b1b1b1;padding: 80px 0;border-radius: 20px;">
            <a href="http://localhost:3000" target="_blank">
              <img style="width: 300px;" src="https://rgvzlonuavmjvodmalpd.supabase.co/storage/v1/object/public/images/public/Logo.png" alt="fastcampus" class="CToWUd" data-bit="iit">
            </a>
            <p style="padding-top:20px;font-weight:700;font-size:20px;line-height:1.5;color:#222">
              이메일 주소를 인증해주세요.
            </p>
            <p style="font-size:16px;font-weight:400;line-height:1.5;margin-bottom: 40px;">
              하단 버튼을 누르시면 이메일 인증이 완료됩니다.
            </p>
            <a href="http://localhost:3000/verifyemail/${id}" style="background:#404040;text-decoration:none;padding:10px 24px;font-size:18px;color:#fff;font-weight:400;border-radius:4px;" >이메일 인증하러 가기</a>
          </td>
        </tr>
      </tbody>
    </table>
    `,
  };

  return transporter.sendMail(mailData);
}

export async function forgotPassword({
  token,
  email,
  name,
}: ForgotPasswordProps) {
  const mailData = {
    to: email,
    subject: `비밀번호 변경`,
    from: process.env.SYSTEM_EMAIL_SENDER,
    html: `
    <table style="margin:40px auto 20px;text-align:left;border-collapse:collapse;border:0;width:600px;padding:64px 16px;box-sizing:border-box">
      <tbody>
        <tr>
          <td style="display:flex;flex-direction: column;justify-items: center;align-items: center;border: 1px solid #b1b1b1;padding: 80px 0;border-radius: 20px;">
            <a href="http://localhost:3000" target="_blank">
              <img style="width: 300px;" src="https://rgvzlonuavmjvodmalpd.supabase.co/storage/v1/object/public/images/public/Logo.png" alt="fastcampus" class="CToWUd" data-bit="iit">
            </a>
            <p style="padding-top:20px;font-weight:700;font-size:20px;line-height:1.5;color:#222">
              ${name}님, 비밀번호 변경을 완료해주세요.
            </p>
            <p style="font-size:16px;font-weight:400;line-height:1.5;margin-bottom: 40px;">
              하단 버튼을 누르시면 비밀번호 변경을 완료할 수 있습니다.
            </p>
            <a href="http://localhost:3000/password-reset/${token}" style="background:#404040;text-decoration:none;padding:10px 24px;font-size:18px;color:#fff;font-weight:400;border-radius:4px;" >비밀번호 변경하러 가기</a>
          </td>
        </tr>
      </tbody>
    </table>
    `,
  };

  return transporter.sendMail(mailData);
}
