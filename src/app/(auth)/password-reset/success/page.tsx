'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SuccessPage() {
  const router = useRouter();
  const sec = 5000;

  useEffect(() => {
    setTimeout(() => {
      router.push('/login'); // Redirect to login page
    }, sec);
  });

  return (
    <main className="mx-auto flex h-screen max-w-xl flex-col justify-center px-4">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-light">
            비밀번호가 성공적으로 변경되었습니다.
          </h1>
          <p>{`${sec}초 후 로그인 화면으로 되돌아갑니다.`}</p>
          <button type="submit">
            <Link href="/login">Return to Login</Link>
          </button>
        </div>
      </div>
    </main>
  );
}
