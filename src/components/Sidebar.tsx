'use client';
import { cn } from '@/utils/style';
import axios from 'axios';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useRef, useState } from 'react';
import { useSidebar } from './providers';

const Sidebar: FC = () => {
  const { data: session } = useSession();
  const { isOpen, setIsOpen } = useSidebar();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    6;
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  const headerMenuHandler = (menu: string) => {
    router.push(`/${menu}`);
    setIsOpen(false);
  };

  const fetchUserProfile = async (): Promise<void> => {
    try {
      const response = await axios.get(`/api/auth/userInfo`);
      if (!response) {
        throw new Error('Failed to fetch data');
      }
      const fetchData = await response.data;
      setProfile(fetchData);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <div
      ref={sidebarRef}
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
              <a
                className="hover:bg-slate-100"
                onClick={() => headerMenuHandler('/#Team_dev')}
              >
                Team DEV
              </a>
            </li>

            <li className="cursor-pointer p-2 hover:bg-slate-100">
              <a onClick={() => headerMenuHandler('/#viber_X')}>viber X</a>
            </li>

            <li className="cursor-pointer p-2 hover:bg-slate-100">
              <a onClick={() => headerMenuHandler('/#Ai_lawline')}>
                문서작성 AI 로라인
              </a>
            </li>

            <li className="cursor-pointer p-2 hover:bg-slate-100">
              <a onClick={() => headerMenuHandler('/#WORKS')}>Works</a>
            </li>

            <li className="cursor-pointer  p-2 hover:bg-slate-100">
              <Link  href={'/project'}>
                <input
                  className='cursor-pointer  hover:bg-slate-100'
                  type="button"
                  value="프로젝트 의뢰하기"
                  name="프로젝트 의뢰하기"
                />
              </Link>
            </li>
          </ul>
          <hr className="border-2 border-[#000]"></hr>

          <ol
                  className={cn(
                    "block cursor-pointer p-2 pb-5 mx-auto text-center "
                  )}
                >
                  {!session ? (
                    <>
                      <button className="block w-full text-center mx-auto cursor-pointer p-2 mb-1 hover:bg-slate-100" onClick={() => signIn()}>
                        로그인
                      </button>
                      
                      <Link className="block cursor-pointer p-2 hover:bg-slate-100" href="/signup">회원가입</Link>
                    </>
                  ) : profile === null ? (
                    <>
                      <Link href={`/mypage`}onClick={() => headerMenuHandler('')}>
                        <li  className="cursor-pointer p-2 hover:bg-slate-100">회원정보</li>
                        {/* <li className="cursor-pointer p-2 hover:bg-slate-100">{session.user.name} 님</li> */}
                      </Link>
                  
                      <button
                               className="cursor-pointer p-2 hover:bg-slate-100"
                        onClick={() => {
                          signOut({
                            callbackUrl: `/login`,
                          });
                        }}
                      >
                        로그아웃
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href={`/mypage`}>
                        <li className="cursor-pointer p-2 hover:bg-slate-100">{profile.name} 님</li>
                      </Link>
                      <button
                        className="cursor-pointer p-2 hover:bg-slate-100"
                        onClick={() => {
                          signOut({
                            callbackUrl: `/login`,
                          });
                        }}
                      >
                        로그아웃
                      </button>
                    </>
                  )}
                </ol>
        </nav>
      </header>
      {}
    </div>
  );
};

export default Sidebar;
