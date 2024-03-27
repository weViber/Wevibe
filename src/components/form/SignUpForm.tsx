'use client';

import { signUpSchema } from '@/libs/validations';
import axios from 'axios';
import { Form, Formik } from 'formik';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import Button from '../Button';
import InputFormik from '../InputFormik';

const SignUpForm = () => {
  const router = useRouter();
  return (
    <div
      id="dev"
      className=" top-0   mb-[-30px] mt-[-152px]  h-auto w-full  bg-[url('/img/h_bg.png')] bg-cover bg-center bg-no-repeat py-12 lg:px-6 2sm:px-2"
    >
      <div className="m-auto mb-[60px] h-auto w-[40%] rounded-3xl bg-white pb-8 shadow-lg  drop-shadow-sm   lg:w-[60%] 2sm:w-[97%]">
        <div className="mx-auto mt-[165px] flex w-full max-w-[330px] flex-col gap-8 lg:px-4 2sm:px-4 ">
          <div className="mx-auto flex w-full max-w-[330px] flex-col gap-8 ">
            <h1 className="mt-4 from-black pt-9 text-center text-3xl font-bold  ">
              회원가입
            </h1>
          
            <div>
              {/* <p className="mt-8  text-center text-xl text-[#919191]">
                이메일로 회원가입
              </p> */}
            </div>
            <Formik
              initialValues={{
                email: '',
                name: '',
                password: '',
                confirmPassword: '',
                company: '',
                rank: '',
                funnel: '',
              }}
              validationSchema={signUpSchema}
              onSubmit={async (data, { setSubmitting, resetForm }) => {
                setSubmitting(true);
                try {
                  const response = await axios.post('/api/auth/signup', {
                    email: data.email,
                    name: data.name,
                    password: data.password,
                    company: data.company,
                    rank: data.rank,
                    funnel: data.funnel,
                  });

                  if (response.status === 201) {
                    toast.success('회원가입 성공! 이메일 인증을 해주세요.');
                    resetForm();
                    router.push('/login');
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
                <Form className="flex flex-col gap-0 ">
                  <div className=" relative -mt-6 ">
                    <InputFormik
                      label="이메일"
                      name={'email'}
                      type={'email'}
                      touched={touched}
                      errors={errors}
                    />
                    <Image
                      className=" absolute left-[14px] top-[65px]"
                      src="/Icon/Icon-email.png"
                      alt="Next.js Logo"
                      width={16}
                      height={5}
                    />
                  </div>

                  <div className=" relative">
                    <InputFormik
                      label="사용자명(이름)"
                      name={'name'}
                      type={'text'}
                      touched={touched}
                      errors={errors}
                    />
                    <Image
                      className=" absolute left-[16px] top-[66px]"
                      src="/Icon/Icon-circle.png"
                      alt="Next.js Logo"
                      width={10}
                      height={5}
                    />
                  </div>

                  <div className=" relative">
                    <InputFormik
                      label="비밀번호"
                      name={'password'}
                      type={'password'}
                      touched={touched}
                      errors={errors}
                    />
                    <Image
                      className=" absolute left-[14px] top-[62px]"
                      src="/Icon/Icon-key.png"
                      alt="Next.js Logo"
                      width={16}
                      height={5}
                    />
                  </div>

                  <div className=" relative">
                    <InputFormik
                      label="비밀번호 확인"
                      name={'confirmPassword'}
                      type={'password'}
                      touched={touched}
                      errors={errors}
                    />
                    <Image
                      className=" absolute left-[14px] top-[62px]"
                      src="/Icon/Icon-key.png"
                      alt="Next.js Logo"
                      width={16}
                      height={5}
                    />
                  </div>

                  <div className=" relative">
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

                  <div className=" relative ">
                    <InputFormik
                      label="직급"
                      name={'rank'}
                      type={'text'}
                      touched={touched}
                      errors={errors}
                    />
                    <Image
                      className=" absolute left-[16px] top-[66px]"
                      src="/Icon/Icon-circle.png"
                      alt="Next.js Logo"
                      width={10}
                      height={5}
                    />
                  </div>

                  <div className=" relative  ">
                    <InputFormik
                      label="가입 경로"
                      name={'funnel'}
                      type={'text'}
                      touched={touched}
                      errors={errors}
                    />
                    <p className=" absolute left-[13px] top-[63px]">
                      <Image
                        src="/Icon/Icon-down-right.png"
                        alt="Next.js Logo"
                        width={16}
                        height={5}
                        style={{ height: 'auto' }}
                      />
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-7 mb-2 bg-[#5B74E1]"
                  >
                    가입하기
                  </Button>
                </Form>
              )}
            </Formik>
          </div>


          <hr className=' -mb-4' />
          <div className="mb-4">
              <p className="my-3 pb-2 text-center text-xl text-[#919191]">
                간편로그인
              </p>
              <button
                className="mt-5 flex w-full flex-row items-center justify-center gap-2 rounded-md bg-[#FEE500] px-5 py-3 font-medium text-slate-900"
                onClick={() =>
                  signIn('kakao', { redirect: true, callbackUrl: '/' })
                }
              >
                <RiKakaoTalkFill className="text-xl" />
                카카오로 시작하기
              </button>
              {/* <button
                className="mt-5 flex w-full flex-row items-center justify-center gap-2 rounded-md border-2 bg-[#fff] px-5 py-3 font-medium text-black"
                onClick={() =>
                  signIn('naver', { redirect: true, callbackUrl: '/' })
                }
              >
                <SiNaver className="text-xl" />
                네이버로 시작하기
              </button> */}
              <button
                className="mt-5 flex w-full flex-row items-center justify-center gap-2 rounded-md border-2 bg-[#fff] px-5 py-3 font-medium text-black"
                onClick={() =>
                  signIn('google', { redirect: true, callbackUrl: '/' })
                }
              >
                <FcGoogle className="text-xl" />
                구글로 시작하기
              </button>
            </div>
        </div>
        
      </div>
    </div>
  );
};

export default SignUpForm;
