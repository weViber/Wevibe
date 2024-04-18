'use client';

import Button from '@/components/Button';
import ImageChangeModal from '@/components/ImageChangeModal';
import InputFormik from '@/components/InputFormik';
import { editUserSchema } from '@/libs/validations';
import axios from 'axios';
import { Form, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
interface editUserProps {
  params: {
    userId: string;
  };
}

const EditUserInfoForm = ({ params }: editUserProps) => {
  const router = useRouter();
  const { data: session, status, update: sessionUpdate } = useSession();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  console.log('Edit Sessoin', session);
  // 프로필 이미지 변경 모달 ON
  const openModal = () => {
    setModalIsOpen(true);
  };
  // 프로필 이미지 변경 모달 OFF
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // 세션이 로딩 될 때까지 로딩처리
  const [profile, setProfile] = useState<any>(null);

  const fetchUserProfile = async (): Promise<void> => {
    try {
      // 해당 경로에서 유저 정보를 가져옴
      const response = await axios.get(`/api/auth/userInfo`);

      // 유저 정보가 없을 경우, 에러 발생
      if (!response) {
        throw new Error('Failed to fetch data');
      }
      // 가져온 유저 정보를 fetchData에 넣고
      const fetchData = await response.data;
      // useState의 setProfile에 fetchData를 넣음
      setProfile(fetchData);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  // 세션이 작동할 때 마다, 위의 fetchUserProfile 함수가 작동함
  useEffect(() => {
    fetchUserProfile();
  }, [session]);

  // 위에 fetchData를 받은 setProfile을 통해 profile이 fetchData로 유저 정보를 전달받는데, 만약에 profile이 비어있다면 'loading' 메시지를 보여주고, 정보를 받아왔다면 받은 정보를 보여줌
  return profile === null ? (
    'loading'
  ) : (
    <div
      id="dev"
      className=" top-0   mb-[-30px] mt-[-152px]  h-auto w-full  bg-[url('/img/h_bg.png')] bg-cover bg-center bg-no-repeat py-12 lg:px-6 2sm:px-2"
    >
      <div className="m-auto mb-[60px] h-auto w-[40%] rounded-3xl bg-white pb-8 shadow-lg  drop-shadow-sm   lg:w-[60%] 2sm:w-[97%]">
        <div className="mx-auto mt-[165px] flex w-full max-w-[330px] flex-col gap-8 lg:px-4 2sm:px-4 ">
          <h1 className="pt-10 text-center text-3xl">회원정보 수정</h1>
          <div>
            <Image
              className="m-auto my-[10px]  box-border block size-[170px] rounded-full border-2 border-gray-100  "
              src={profile.image || '/images/noUser.png'}
              width={200}
              height={200}
              alt={'user'}
            />
            <button onClick={openModal} className="mx-auto my-0 block">
              <span className=" text-lg text-[#92a4ec]  underline underline-offset-4">
                사진변경
              </span>
            </button>
          </div>
          <ImageChangeModal
          // 프로필 이미지 변경 모달
            userId={params.userId}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
          />

          <Formik
          // 가장 최근에 변경한 값으로 초기값 설정
            initialValues={{
              name: profile.name,
              company: profile.company,
              rank: profile.rank,
            }}

            // 만들어진 유효성 검사 적용
            validationSchema={editUserSchema}
            onSubmit={async (data, { setSubmitting }) => {
              console.log(data);
              setSubmitting(true);
              // 유저 정보 변경 시작
              try {
                // 입력한 이름, 회사명, 직급을 해당경로로 저장 요청
                const response = await axios.post(`/api/auth/editUserInfo`, {
                  name: data.name,
                  company: data.company,
                  rank: data.rank,
                });
                console.log(response);

                // 요청이 정상적으로 처리됬을 경우
                if (response.status === 200) {
                  // 로그인 상태인 경우, 현재 로그인 세션값을 변경한 값으로 적용
                  sessionUpdate({
                    name: data.name,
                    company: data.company,
                    updateRank: data.rank,
                  });
                  // 변경 후 마이페이지로 이동
                  router.push(`/mypage`);
                  toast.success('회원정보 수정 성공!');
                }
              } catch (error: any) {
                toast.error(
                  error.response?.data?.message ||
                    'An unexpected error occurred'
                );
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="flex flex-col gap-2">
                <div className=" relative -my-3">
                  <InputFormik
                    label="사용자명(이름)"
                    name={'name'}
                    type={'text'}
                    touched={touched as { [key: string]: boolean }}
                    errors={errors as { [key: string]: string }}
                  />
                  <Image
                    className=" absolute left-[17px] top-[66px]"
                    src="/Icon/Icon-circle.png"
                    alt="Next.js Logo"
                    width={10}
                    height={5}
                  />
                </div>

                <div className=" relative -my-3">
                  <InputFormik
                    label="회사"
                    name={'company'}
                    type={'text'}
                    touched={touched as { [key: string]: boolean }}
                    errors={errors as { [key: string]: string }}
                  />
                  <Image
                    className=" absolute left-[14px] top-[61px]"
                    src="/Icon/Icon-building.png"
                    alt="Next.js Logo"
                    width={16}
                    height={5}
                  />
                </div>

                <div className=" relative -my-3">
                  <InputFormik
                    label="직급"
                    name={'rank'}
                    type={'text'}
                    touched={touched as { [key: string]: boolean }}
                    errors={errors as { [key: string]: string }}
                  />
                  <Image
                    className=" absolute left-[17px] top-[66px]"
                    src="/Icon/Icon-circle.png"
                    alt="Next.js Logo"
                    width={10}
                    height={5}
                  />
                </div>

                <Link
                  className="mt-6 font-semibold underline underline-offset-4 "
                  href="/forgot-password"
                >
                  비밀번호 변경
                </Link>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="my-5 flex justify-center bg-[#F2F4FF] text-center font-bold text-[#5B74E1]"
                >
                  저장
                </Button>

                  <Link
                    className="flex"
                    href={`/delete-account/${session?.user.userId}`}
                  >
                  <Button className="-my-4 mb-3 flex justify-center bg-[#F2F4FF] font-bold  text-[#8D8D8D]">
                    {/* <Image
                      className="mr-3 mt-[3.2px] "
                      src="/Icon/Icon-out.png"
                      alt="Next.js Logo"
                      width={17.5}
                      height={5}
                    /> */}
                    회원 탈퇴
                  </Button>
                </Link>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
export default EditUserInfoForm;
