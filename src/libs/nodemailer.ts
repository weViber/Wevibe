import nodemailer from 'nodemailer';

type VerifyEmailProps = {
  email: string;
  id: string;
};

type ForgotPasswordProps = {
  email: string;
  name: string;
  token: string;
};

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

let transporter = nodemailer.createTransport({
  service: process.env.SYSTEM_EMAIL_SERVICE,
  host: process.env.SYSTEM_EMAIL_HOST,
  port: 465,
  // port: parseInt(process.env.SYSTEM_EMAIL_PORT, 10),
  secure: false,
  auth: {
    user: process.env.SYSTEM_EMAIL_SENDER,
    pass: process.env.SYSTEM_EMAIL_APPPASS,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log('Mail Server Error : ', error);
  } else {
    console.log('Server is ready to take our messages');
  }
});

export async function verifyEmail({ email, id }: VerifyEmailProps) {
  try {
    const mailData = {
      to: email,
      subject: `Wevibe - 이메일 인증`,
      from: process.env.SYSTEM_EMAIL_SENDER,
      html: `
    <div style="width: 100%; min-height: 1300px">
      <div
        style="
          text-align: center;
          width: 800px;
          margin: 30px auto;
          padding: 40px 80px;
          border: 1px solid #ededed;
          background: #fff;
          box-sizing: border-box;
        "
      >
        <a href="https://www.wevibe.kr" target="Wevibe">
          <img
            style="width: 150px"
            src="https://lhbgoxzhnhiklwcgcdjh.supabase.co/storage/v1/object/public/profile-images/Logoimg3.png?t=2024-03-18T02%3A49%3A18.383Z"
            alt="Wevibe"
          />
        </a>
        <p
          style="
            padding-top: 20px;
            font-weight: 700;
            font-size: 20px;
            line-height: 1.5;
            color: #222;
          "
        >
          이메일 주소를 인증해주세요.
        </p>
        <p
          style="
            font-size: 16px;
            font-weight: 400;
            line-height: 1.5;
            margin-bottom: 40px;
          "
        >
          하단 버튼을 누르시면 이메일 인증이 완료됩니다.
        </p>
        <a href="https://www.wevibe.kr/verifyemail/${id}" style="background: #404040;text-decoration: none;padding: 10px 24px;font-size: 18px;color: #fff;font-weight: 400;border-radius: 4px;">이메일 인증하러 가기</a>
      </div>
    </div>
    `,
    };
    await new Promise((resolve, reject) => {
      transporter.sendMail(mailData, (error, success) => {
        if (error) {
          console.error('인증 이메일 전송 실패', error);
          reject(error);
        } else {
          console.log('인증 이메일 전송 성공');
          resolve(success);
        }
      });
    });
  } catch (error) {
    console.error(error);
  }
}

export async function forgotPassword({
  token,
  email,
  name,
}: ForgotPasswordProps) {
  try {
    const mailData = {
      to: email,
      subject: `비밀번호 변경`,
      from: process.env.SYSTEM_EMAIL_SENDER,
      html: `
      <div style="width: 100%; min-height: 1300px">
        <div
          style="
            text-align: center;
            width: 800px;
            margin: 30px auto;
            padding: 40px 80px;
            border: 1px solid #ededed;
            background: #fff;
            box-sizing: border-box;
          "
        >
          <a href="https://www.wevibe.kr" target="Wevibe">
            <img
              style="width: 150px"
              src="https://lhbgoxzhnhiklwcgcdjh.supabase.co/storage/v1/object/public/profile-images/Logoimg3.png?t=2024-03-18T02%3A49%3A18.383Z"
              alt="Wevibe"
            />
          </a>
          <p
            style="
              padding-top: 20px;
              font-weight: 700;
              font-size: 20px;
              line-height: 1.5;
              color: #222;
            "
          >
            ${name}님, 비밀번호 변경을 완료해주세요.
          </p>
          <p
            style="
              font-size: 16px;
              font-weight: 400;
              line-height: 1.5;
              margin-bottom: 40px;
            "
          >
            하단 버튼을 누르시면 비밀번호 변경을 완료할 수 있습니다.
          </p>
          <a
            href="https://www.wevibe.kr/password-reset/${token}"
            style="
              background: #404040;
              text-decoration: none;
              padding: 10px 24px;
              font-size: 18px;
              color: #fff;
              font-weight: 400;
              border-radius: 4px;
            "
            >비밀번호 변경하러 가기</a
          >
        </div>
      </div>
      `,
    };
    await new Promise((resolve, reject) => {
      transporter.sendMail(mailData, (error, success) => {
        if (error) {
          console.error('비밀번호 변경 이메일 전송 실패', error);
          reject(error);
        } else {
          console.log('비밀번호 변경 이메일 전송 성공');
          resolve(success);
        }
      });
    });
  } catch (error) {
    console.error(error);
  }
}
