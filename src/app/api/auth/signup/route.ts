import { verifyEmail } from '@/libs/nodemailer';
import prisma from '@/libs/prisma';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';

// export const runtime = 'edge';
// export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password, company, rank, funnel } = body;
    // user가 존재하는지 확인 (email)
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    // 존재하는 email이 아닐 경우
    if (user?.email) {
      return NextResponse.json(
        {
          message: '이미 가입한 메일입니다.',
        },
        {
          status: 409,
        }
      );
    }
    // 비밀번호를 생성 후 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 12);
    // 입력받은 user정보를 받아서 저장하고 userId는 랜덤으로 생성된 UUID를 저장하고, 비밀번호는 암호화한 상태로 저장
    const newUser = await prisma.user.create({
      data: {
        userId: randomUUID(),
        email,
        name,
        password: hashedPassword,
        company,
        rank,
        funnel,
      },
    });
    // 입력 받은 이메일로 인증메일 전송
    await verifyEmail({
      email: newUser.email,
      id: newUser.userId,
    });

    return NextResponse.json(
      {
        message: '회원가입이 완료되었습니다.',
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.error();
  }
}
