import { verifyEmail } from '@/libs/nodemailer';
import prisma from '@/libs/prisma';
import { NextResponse } from 'next/server';

export async function PUT(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    // user가 존재하는지 확인
    const user = await prisma.user.findUnique({
      where: {
        userId,
      },
    });
    console.log('user : ', user);
    // user가 없을 경우
    if (!user) {
      return new NextResponse(JSON.stringify({ message: 'Not_found' }), {
        status: 404,
      });
    }
    // 메일인증을 이미 했을 경우
    if (user.emailVerified) {
      return new NextResponse(JSON.stringify({ message: 'Already_verified' }), {
        status: 200,
      });
    }
    // 메일인증을 하면 emailVerifild에 인증한 날짜가 저장된
    await prisma.user.update({
      where: {
        userId,
      },
      data: {
        emailVerified: new Date(),
      },
    });
    // 인증메일 전송
    verifyEmail({
      email: user.email,
      id: user.userId,
    });
    
    return new NextResponse(JSON.stringify({ message: 'Verified' }), {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500 }
    );
  }
}
