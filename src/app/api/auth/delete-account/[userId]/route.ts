import { prisma } from '@/libs/prisma';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const body = await request.json();
  const { reason } = body;
  const { userId } = params;

  // deletedYn가 false인 user 확인
  const user = await prisma.user.findUnique({
    where: { userId, deletedYn: false },
  });

  // user가 없을 경우
  if (!user) {
    return new NextResponse(JSON.stringify({ message: 'Not_found' }), {
      status: 404,
    });
  }

  // user가 이미 탈퇴한 경우
  if (user.deletedYn === true) {
    return new NextResponse(JSON.stringify({ message: 'Already_Deleted' }), {
      status: 200,
    });
  }

  // deletedYn이 false인 유저를 true로 변경
  const updateUser = prisma.user.update({
    where: {
      userId,
      deletedYn: false,
    },
    data: {
      deletedYn: true,
    },
  });

  // 탈퇴된 유저들이 담긴 테이블에 유저정보 생성
  const deleteUser = prisma.deleteAccount.create({
    data: {
      deleteUserId: userId,
      reason,
    },
  });
  try {
    // transaction의 경우, ([]) 안에 있는 쿼리들이 전부 통과하지 않으면, 쿼리가 실행되기 전으로 롤백됨. 따라서 updateUser를 진행하고 deleteUser에서 오류가 났을 경우, updateUser를 진행하기 전으로 롤백됨
    await prisma.$transaction([updateUser, deleteUser]);
    return NextResponse.json({ message: '회원탈퇴 성공' }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
