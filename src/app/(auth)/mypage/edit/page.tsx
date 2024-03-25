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
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

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
            userId={params.userId}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
          />

          <Formik
            initialValues={{
              name: profile.name,
              company: profile.company,
              rank: profile.rank,
            }}
            validationSchema={editUserSchema}
            onSubmit={async (data, { setSubmitting }) => {
              console.log(data);
              setSubmitting(true);
              try {
                const response = await axios.post(`/api/auth/editUserInfo`, {
                  name: data.name,
                  company: data.company,
                  rank: data.rank,
                });
                console.log(response);

                if (response.status === 200) {
                  sessionUpdate({
                    name: data.name,
                    company: data.company,
                    updateRank: data.rank,
                  });
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
