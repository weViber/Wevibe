import { prisma } from '@/libs/prisma';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const body = await request.json();
  const { reason } = body;
  const { userId } = params;

  const user = await prisma.user.findUnique({
    where: { userId, deletedYn: false },
  });

  if (!user) {
    return new NextResponse(JSON.stringify({ message: 'Not_found' }), {
      status: 404,
    });
  }

  if (user.deletedYn === true) {
    return new NextResponse(JSON.stringify({ message: 'Already_Deleted' }), {
      status: 200,
    });
  }

  const updateUser = prisma.user.update({
    where: {
      userId,
      deletedYn: false,
    },
    data: {
      deletedYn: true,
    },
  });

  const deleteUser = prisma.deleteAccount.create({
    data: {
      deleteUserId: userId,
      reason,
    },
  });
  try {
    await prisma.$transaction([updateUser, deleteUser]);
    return NextResponse.json({ message: '회원탈퇴 성공' }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
