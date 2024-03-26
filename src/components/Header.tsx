'use client';
import { cn } from '@/utils/style';
import axios from 'axios';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { useSidebar } from './providers';

const Header: FC = () => {
  const { isOpen, setIsOpen } = useSidebar();
  const { data: session } = useSession();

  // 세션이 로딩 될 때까지 로딩처리
  const [profile, setProfile] = useState<any>(null);
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

  useEffect(() => {
    fetchUserProfile();
  }, [session]);

  return (
    <div className="w-full sm:m-auto   sm:w-[97%] 2sm:w-[95%] ">
      <div className=" m-auto flex h-32 flex-col justify-between justify-items-center py-6 md:justify-between  ">
        <header className="z-[10] h-32">
          <nav className="m-auto flex max-w-[1200px] justify-around justify-items-center 2sm:justify-between">
            <p className="w-[10%] cursor-pointer lg:w-[20%] 2sm:ml-4 2sm:w-[30%] ">
              <Link href="/">
                <Image
                  src={!isOpen ? '/img/Logoimg.png' : '/img/Logoimg2.png'}
                  alt="Next.js Logo"
                  width={90}
                  height={17}
                  priority
                />
              </Link>
            </p>

            <div className="flex rounded-full bg-[url('/img/nav_bg2.png')] bg-cover bg-center bg-no-repeat px-4 pt-0.5 opacity-80 drop-shadow-md backdrop-blur-xl  backdrop-brightness-150 backdrop-saturate-200  lg:bg-none lg:pt-0 lg:backdrop-blur-none lg:backdrop-filter-none">
              <div className="flex w-full ">
                <ul className=" mt-[1px]  flex  justify-around  py-5 lg:hidden   ">
                  <li className="cursor-pointer px-3">
                    <a href="/#Team_dev">Team DEV</a>
                  </li>
                  <li className="px-3"></li>
                  <li className="px-3">
                    <a href="/#viber_X">viber X</a>
                  </li>
                  <li className="px-3"></li>
                  <li className="px-3">
                    <a href="/#Ai_lawline">문서작성 AI 로라인</a>
                  </li>
                  <li className="px-3"></li>
                  <li className="px-3">
                    <a href="/#WORKS">Works</a>
                  </li>
                  <li className="px-3"></li>
                  <Link href={'/project'}>
                    <li className="px-3">프로젝트 의뢰하기</li>
                  </Link>
                </ul>

                <ol
                  className={cn(
                    'mt-3 flex h-[43px] justify-between rounded-full border-[#222]  bg-black px-4 leading-[40px] text-white sm:inline-flex sm:w-[400px]    lg:mr-4 lg:w-auto lg:border-2 lg:bg-white lg:leading-[37px] lg:text-black   2sm:hidden ',
                    isOpen && 'invisible'
                  )}
                >
                  {!session ? (
                    <>
                      <button className="mb-2" onClick={() => signIn()}>
                        로그인
                      </button>
                      <li>/</li>
                      <Link href="/signup">회원가입</Link>
                    </>
                  ) : profile === null ? (
                    <>
                      <Link href={`/mypage`}>
                        <li>회원정보</li>
                        {/* <li>...님</li> */}
                      </Link>
                      <p className="mx-2">/</p>
                      <button
                        className="mb-2"
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
                      <Image
                        className="mr-[10px] mt-[8px] block size-[25px] rounded-full bg-white"
                        src={profile.image!}
                        width={25}
                        height={25}
                        alt={'user'}
                      />

                      <Link href={`/mypage`}>
                        <li>회원정보</li>
                        {/* <li>{profile.name} 님</li> */}
                      </Link>
                      <p className="mx-2">/</p>
                      <button
                        className="mb-2"
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
                <button className="z-10 hidden opacity-80 lg:block 2sm:opacity-100 ">
                  <Image
                    id="Sidibar_boutton"
                    className="top-[32px]  mb-2 box-border  hidden  h-12 w-[50px]  cursor-pointer rounded-md border-2 border-black bg-white p-2  lg:mr-0 lg:block   "
                    src={
                      !isOpen ? '/img/hamburger_.png' : '/img/sidebarClose.png'
                    }
                    alt="Next.js Logo"
                    onClick={() => setIsOpen((open) => !open)}
                    width={45}
                    height={45}
                  />
                </button>
              </div>
            </div>
          </nav>
        </header>
      </div>
    </div>
  );
};

export default Header;
