import { authOptions } from '@/libs/next-auth';
import prisma from '@/libs/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    // user가 존재하는지 확인하고, user의 정보를 가져옴
    const user = await prisma.user.findUnique({
      where: {
        userId: session?.user.userId,
      },
    });
    // user가 없을 경우
    if (!user) {
      return NextResponse.json(
        {
          message: '가입된 유저가 아닙니다.',
        },
        {
          status: 404,
        }
      );
    }
    // 잘못된 email인 경우
    if (!session?.user.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return new NextResponse('Error', { status: 500 });
  }
}
