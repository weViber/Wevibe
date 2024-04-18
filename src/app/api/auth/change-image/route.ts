import { authOptions } from '@/libs/next-auth';
import prisma from '@/libs/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await request.json();
    const { image } = body;

    // user가 존재하는지 확인
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

    // 로그인을 하지 않았을 경우
    if (!session?.user.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const updateImage = await prisma.user.update({
      where: {
        userId: session?.user.userId,
      },
      data: {
        image,
      },
    });
    return NextResponse.json(updateImage);
  } catch (error) {
    return new NextResponse('Error', { status: 500 });
  }
}
