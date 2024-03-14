import { authOptions } from '@/libs/next-auth';
import prisma from '@/libs/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const body = await request.json();
    const { userId } = params;
    const { image } = body;

    const user = await prisma.user.findUnique({
      where: {
        userId,
      },
    });

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

    if (!session?.user.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const updateImage = await prisma.user.update({
      where: {
        userId,
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
