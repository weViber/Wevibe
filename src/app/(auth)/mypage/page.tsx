'use client';

import Button from '@/components/Button';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const UserInfoForm = () => {
  const router = useRouter();

  const { data: session, status } = useSession();
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

  return profile === null ? (
    'loading'
  ) : (
    <div
      id="dev"
      className=" top-0   mb-[-30px] mt-[-152px]  h-auto w-full  bg-[url('/img/h_bg.png')] bg-cover bg-center bg-no-repeat py-12 lg:px-6 2sm:px-2"
    >
      <div className="m-auto mb-[60px] h-auto w-[40%] rounded-3xl bg-white pb-8 shadow-lg  drop-shadow-sm   lg:w-[60%] 2sm:w-[97%]">
        <div className="mx-auto mt-[165px] flex w-full max-w-[330px] flex-col gap-8 lg:px-4 2sm:px-4 ">
          <h1 className="pt-10 text-center text-3xl">회원정보</h1>
          <>
            <Image
              className="m-auto my-[10px]  box-border block size-[170px] rounded-full border-2 border-gray-100  "
              src={profile.image!}
              width={200}
              height={200}
              alt={'user'}
            />
          </>

          <Link href="/myproject">
            <Button
              type="submit"
              className=" flex justify-center text-center font-bold text-[#eee] "
            >
              내 프로젝트 목록
            </Button>
          </Link>
          <div className=" relative -my-3">
            <div className="mt-3 flex flex-col gap-1">
              <div className="  text-base font-bold text-black">
                사용자명(닉네임)
              </div>
              <div className="block w-full rounded-lg h-[46px] border border-[#EAEAEA] bg-white px-5 py-3 indent-[20px] text-sm text-gray-900 focus:border-black focus:ring-black">
                {profile.name}
              </div>
            </div>
            <Image
              className=" absolute left-[17px] top-[58px]"
              src="/Icon/Icon-circle.png"
              alt="Next.js Logo"
              width={10}
              height={5}
            />
          </div>

          <div className=" relative -my-3">
            <div className="flex flex-col gap-1">
              <div className="  text-base font-bold text-black">이메일</div>
              <div className="block w-full h-[46px] rounded-lg border border-[#EAEAEA] bg-white px-5 py-3 indent-[20px] text-sm text-gray-900 focus:border-black focus:ring-black">
                {profile.email}
              </div>
            </div>
            <Image
              className=" absolute left-[14.5px] top-[44px]"
              src="/Icon/Icon-email.png"
              alt="Next.js Logo"
              width={16}
              height={5}
            />
          </div>

          <div className=" relative -my-3">
            <div className="flex flex-col gap-1">
              <div className="  text-base font-bold text-black">회사</div>
              <div className="block w-full h-[46px] rounded-lg border border-[#EAEAEA] bg-white px-5 py-3 indent-[20px] text-sm text-gray-900 focus:border-black focus:ring-black">
                {profile.company}
              </div>
            </div>
            <Image
              className=" absolute left-[14px] top-[42px]"
              src="/Icon/Icon-building.png"
              alt="Next.js Logo"
              width={16}
              height={5}
            />
          </div>

          <div className=" relative -my-3">
            <div className="flex flex-col gap-1">
              <div className="  text-base font-bold text-black">직급</div>
              <div className="block w-full h-[46px] rounded-lg border border-[#EAEAEA] bg-white px-5 py-3 indent-[20px] text-sm text-gray-900 focus:border-black focus:ring-black">
                {profile.rank}
              </div>
            </div>
            <Image
              className=" absolute left-[17px] top-[46px]"
              src="/Icon/Icon-circle.png"
              alt="Next.js Logo"
              width={10}
              height={5}
            />
          </div>

          <Link href={`/mypage/edit`}>
            <Button className="my-5 flex justify-center bg-[#F2F4FF] text-center font-bold text-[#5B74E1]">
              회원 정보 수정하기 <span className='relative ml-2' > 		&#10145;	 </span>
            </Button>
          </Link>

          

            <Link className="flex" href={`/`}>
          <Button className="-my-10 mb-0 flex justify-center bg-[#F2F4FF] font-bold  text-[#8D8D8D]">
               {/* <Image
                className="mr-3 mt-[3.2px] "
                src="/Icon/Icon-out.png"
                alt="Next.js Logo"
                width={17.5}
                height={5}
              /> */}
              홈으로
          </Button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default UserInfoForm;
