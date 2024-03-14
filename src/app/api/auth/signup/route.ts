import { verifyEmail } from '@/libs/nodemailer';
import prisma from '@/libs/prisma';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password, company, rank, funnel } = body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

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

    const hashedPassword = await bcrypt.hash(password, 12);

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

    verifyEmail({
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
