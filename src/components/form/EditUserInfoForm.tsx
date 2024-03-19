'use client';

import noUser from '@/../nouserpublic/images/noUser.png';
import { editUserSchema } from '@/libs/validations';
import axios from 'axios';
import { Form, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Button from '../Button';
import InputFormik from '../InputFormik';

const EditUserInfoForm = ({ params }: { params: { userId: string } }) => {
  const router = useRouter();
  const userId = params.userId;
  const { data: session } = useSession();

  return (
    <div
      id="dev"
      className=" top-0   mb-[-30px] mt-[-152px]  h-auto w-full  bg-[url('/img/h_bg.png')] bg-cover bg-center bg-no-repeat py-12 lg:px-6"
    >
      <div className="m-auto mb-[60px] h-auto w-[60%] rounded-3xl bg-white  pb-8   shadow-lg drop-shadow-sm">
        <div className="mx-auto mt-[165px] flex w-full max-w-[330px] flex-col gap-8 py-6 lg:px-4 ">
          <h1 className="mt-4 pt-5 text-center text-3xl">마이페이지</h1>
          <p>
            <Image
              className="m-auto mb-[8px]  mt-[10px] block size-[110px] rounded-full w-[100%] "
              src={noUser}
              width={300}
              height={25}
              alt={'user'}
            />
            <span className="block text-[#95a5ed]">사진변경</span>
          </p>

          <Link href="/myproject">
            <Button
              type="submit"
              className="mt-1 flex justify-center text-center font-bold text-[#eee] "
            >
              {/* <Image className=' mt-[3px] mr-3 ] '
                src="/Icon/Icon-bluekey.png"
                alt="Next.js Logo"
                width={18}
                height={5}
              /> */}
              내 프로젝트 목록
            </Button>
          </Link>

          <Formik
            initialValues={{
              email: session?.user.email,
              name: session?.user.name,
              company: session?.user.company,
              rank: session?.user.rank,
            }}
            validationSchema={editUserSchema}
            onSubmit={async (data, { setSubmitting, resetForm }) => {
              console.log(data);
              setSubmitting(true);
              try {
                const response = await axios.post(
                  `/api/auth/editUserInfo/${userId}`,
                  {
                    email: data.email,
                    name: data.name,
                    company: data.company,
                    rank: data.rank,
                  }
                );
                console.log(response);

                if (response.status === 200) {
                  toast.success('회원정보 수정 성공!');
                  resetForm();
                  router.push('/');
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
                    label="이메일"
                    name={'email'}
                    type={'email'}
                    touched={touched}
                    errors={errors}
                  />
                  <Image
                    className=" absolute left-[14.5px] top-[64px]"
                    src="/Icon/Icon-email.png"
                    alt="Next.js Logo"
                    width={16}
                    height={5}
                  />
                </div>

                <div className=" relative -mb-3">
                  <InputFormik
                    label="사용자명(이름)"
                    name={'name'}
                    type={'text'}
                    touched={touched}
                    errors={errors}
                  />
                  <Image
                    className=" absolute left-[17px] top-[66px]"
                    src="/Icon/Icon-circle.png"
                    alt="Next.js Logo"
                    width={10}
                    height={5}
                  />
                </div>

                <div className=" relative -mb-3">
                  <InputFormik
                    label="회사"
                    name={'company'}
                    type={'text'}
                    touched={touched}
                    errors={errors}
                  />
                  <Image
                    className=" absolute left-[14px] top-[61px]"
                    src="/Icon/Icon-building.png"
                    alt="Next.js Logo"
                    width={16}
                    height={5}
                  />
                </div>

                <div className=" relative  ">
                  <InputFormik
                    label="직급"
                    name={'rank'}
                    type={'text'}
                    touched={touched}
                    errors={errors}
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
                  className="mt-2 font-semibold underline "
                  href="/forgot-password"
                >
                  비밀번호 변경
                </Link>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="my-5 flex justify-center bg-[#F2F4FF] text-center font-bold text-[#5B74E1]"
                >
                  {/* <Image className=' mt-[3px] mr-3 ] '
                src="/Icon/Icon-bluekey.png"
                alt="Next.js Logo"
                width={18}
                height={5}
              /> */}
                  정보수정
                </Button>

                <Button className="-my-4 mb-3 flex justify-center bg-[#F2F4FF] font-bold  text-[#8D8D8D]">
                  <Link
                    className="flex"
                    href={`/delete-account/${session?.user.userId}`}
                  >
                    <Image
                      className="mr-3 mt-[3.2px] "
                      src="/Icon/Icon-out.png"
                      alt="Next.js Logo"
                      width={17.5}
                      height={5}
                    />
                    회원 탈퇴
                  </Link>
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default EditUserInfoForm;
