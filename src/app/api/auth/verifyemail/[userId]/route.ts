import prisma from '@/libs/prisma';
import { NextResponse } from 'next/server';

export async function PUT(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;

    const user = await prisma.user.findUnique({
      where: {
        userId,
      },
    });
    console.log('user : ', user);

    if (!user) {
      return new NextResponse(JSON.stringify({ message: 'Not_found' }), {
        status: 404,
      });
    }

    if (user.emailVerified) {
      return new NextResponse(JSON.stringify({ message: 'Already_verified' }), {
        status: 200,
      });
    }

    await prisma.user.update({
      where: {
        userId,
      },
      data: {
        emailVerified: new Date(),
      },
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
