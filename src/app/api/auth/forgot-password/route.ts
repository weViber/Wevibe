'use server';

import { forgotPassword } from '@/libs/nodemailer';
import prisma from '@/libs/prisma';
import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;
    // email이 잘못 입력된 경우
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ message: 'Invalid email' }, { status: 400 });
    }
    // 가입된 email이 있는지 확인
    const user = await prisma.user.findUnique({
      where: { email },
    });
    // 가입된 email이 아닐 경우
    if (!user) {
      return NextResponse.json(
        { message: '입력하신 이메일은 존재하지 않습니다.' },
        { status: 400 }
      );
    }
    // 토큰 생성
    const token = await prisma.passwordResetToken.create({
      data: {
        tokenUserId: user.id,
        token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
      },
    });
    // 생성된 토큰과 함께 입력된 email에 메일 발송
    await forgotPassword({
      email: user.email,
      name: user.name,
      token: token.token,
    });

    return NextResponse.json({ message: '메일 발송 성공' }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
