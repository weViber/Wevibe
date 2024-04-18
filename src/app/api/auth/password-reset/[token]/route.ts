'use server';

import { prisma } from '@/libs/prisma';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { token: string } }
) {
  const body = await request.json();
  const { token } = params;
  const { password } = body;

  // 유효한 토큰인지 확인
  const passwordResetToken = await prisma.passwordResetToken.findUnique({
    where: {
      token,
      createdAt: { gt: new Date(Date.now() - 10 * 60 * 1000) }, //10분
      resetAt: null,
    },
  });
 // 토큰이 유효하지 않을 경우
  if (!passwordResetToken) {
    return NextResponse.json(
      {
        message: '비밀번호 변경 토큰이 만료되었습니다. 다시 시도해주세요.',
      },
      {
        status: 404,
      }
    );
  }
  // 비밀번호를 저장한 후 비밀번호 암호화
  const hashedPassword = await bcrypt.hash(password, 12);
  // 토큰정보에 있는 유저를 찾고 암호화된 비밀번호를 변경
  const updateUser = prisma.user.update({
    where: { id: passwordResetToken.tokenUserId },
    data: {
      password: hashedPassword,
    },
  });

  // 비밀번호를 변경한 날짜로 변경
  const updateToken = prisma.passwordResetToken.update({
    where: {
      id: passwordResetToken.id,
    },
    data: {
      resetAt: new Date(),
    },
  });

  try {
    await prisma.$transaction([updateUser, updateToken]);
    return NextResponse.json(
      { message: '비밀번호 변경 성공' },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
