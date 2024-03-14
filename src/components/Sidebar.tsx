'use client';
import { cn } from '@/utils/style';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { useSidebar } from './providers';


const Sidebar: FC = () => {
  const { data: session } = useSession();
  const { isOpen, setIsOpen } = useSidebar();
  return (
    <div
      className={cn(
        'relative z-[10] m-auto w-full bg-[#eeeeee] lg:absolute',
        isOpen ? 'flex' : 'hidden'
      )}
    >
      <div className="flex justify-end lg:hidden">
        <Link className="cursor-pointer" href={'/'}>
          <button>
            <Image
              id="Sidibar_boutton"
              className="z-30 flex justify-end lg:hidden"
              src="/img/sidebarClose.png"
              alt="Next.js Logo"
              width={50}
              height={5}
            />
          </button>
        </Link>
      </div>
      <header className="z-30 m-auto">
        <nav className="m-auto w-full">
          <p className=" m-auto size-[90] pt-24"></p>
          {/* <p className="m-auto cursor-pointer">
            <Image
              className="m-auto pt-6"
              src="/img/Logoimg2.png"
              alt="Next.js Logo"
              width={90}
              height={17}
              priority
            />
          </p> */}
          <ul className="z-[30] m-auto block  w-full py-5  text-center">
            <li className=" relative cursor-pointer p-2 hover:bg-slate-100">
              <a className="hover:bg-slate-100" href="/#Team_dev">
                Team DEV
              </a>
            </li>

            <li className="cursor-pointer p-2 hover:bg-slate-100">
              <a href="/#viber_X">viber X</a>
            </li>

            <li className="cursor-pointer p-2 hover:bg-slate-100">
              <a href="/#Ai_lawline">문서작성 AI 로라인</a>
            </li>

            <li className="cursor-pointer p-2 hover:bg-slate-100">
              <a href="/#WORKS">Works</a>
            </li>

            <li className="cursor-pointer p-2 hover:bg-slate-100">
              <Link className="cursor-pointer" href={'/project'}>
                <input
                  type="button"
                  value="프로젝트 의뢰하기"
                  name="프로젝트 의뢰하기"
                />
              </Link>
            </li>
          </ul>
          <hr className="border-2 border-[#000]"></hr>

          <ol className="m-auto py-5 text-center">
            {!session ? (
              <>
                <li
                  className="block cursor-pointer p-2 hover:bg-slate-100"
                  onClick={() => signIn()}
                >
                  로그인
                </li>
                <li className="cursor-pointer p-2 hover:bg-slate-100">
                  <Link href="/signup">회원가입</Link>
                </li>
              </>
            ) : (
              <>
                <Link href={`/mypage/${session?.user.userId}`}>
                  <li className="cursor-pointer p-2 hover:bg-slate-100">
                    {session.user.name} 님
                  </li>
                </Link>
                <li
                  className="cursor-pointer p-2 hover:bg-slate-100"
                  onClick={() => signOut()}
                >
                  로그아웃
                </li>
              </>
            )}
          </ol>
        </nav>
      </header>
    </div>
  );
};

export default Sidebar;
