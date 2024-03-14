'use server';

import { forgotPassword } from '@/libs/nodemailer';
import prisma from '@/libs/prisma';
import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ message: 'Invalid email' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: '입력하신 이메일은 존재하지 않습니다.' },
        { status: 400 }
      );
    }

    const token = await prisma.passwordResetToken.create({
      data: {
        tokenUserId: user.id,
        token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
      },
    });

    forgotPassword({
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
