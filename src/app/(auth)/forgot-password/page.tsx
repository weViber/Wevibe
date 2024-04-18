'use client';

import Button from '@/components/Button';
import InputFormik from '@/components/InputFormik';
import { emailSchema } from '@/libs/validations';
import axios from 'axios';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function ForgotPassword() {
  const router = useRouter();

  return (
    <div
      id="dev"
      className=" top-0   mb-[-30px] mt-[-152px]  h-auto w-full  bg-[url('/img/h_bg.png')] bg-cover bg-center bg-no-repeat py-12 lg:px-6 2sm:px-2"
    >
      <div className="m-auto mb-[60px] h-auto w-[40%] rounded-3xl bg-white pb-8 shadow-lg  drop-shadow-sm   lg:w-[60%] 2sm:w-[97%]">
        <div className="mx-auto mt-[165px] flex w-full max-w-[330px] flex-col gap-8 lg:px-4 2sm:px-4 ">
          <h1 className=" pt-9 text-center text-3xl">비밀번호 변경</h1>
          
          <Formik
          // 초기값 빈칸으로 설정 아래, InputFormik의 name과 일치 해야 함
            initialValues={{
              email: '',
            }}
            // 만들어진 유효성 검사 적용
            validationSchema={emailSchema}

            onSubmit={async (data, { setSubmitting, resetForm }) => {
              console.log(data);
              setSubmitting(true);
              // 비밀번호 찾기 시작
              try {
                // 해당 경로로 axios를 통하여 이메일에 메일 발송
                const response = await axios.post('/api/auth/forgot-password', {
                  email: data.email,
                });
                console.log(response);
                // 메일 발송이 성공했을 경우 즉 상태코드가 200일 경우, 메일 발송 성공 메시지가 나타나고, 메인페이지로 이동된다.
                if (response.status === 200) {
                  toast.success('메일 발송 성공!');
                  resetForm();
                  router.push('/');
                }
              } catch (error: any) {
                // 에러가 발생했을 경우, An unexpected error occurred 에러 메시지가 나타남
                toast.error(
                  error.response?.data?.message ||
                    'An unexpected error occurred'
                );
                console.log(error);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="flex flex-col gap-2">
                <InputFormik
                  label="이메일"
                  name={'email'}
                  type={'email'}
                  touched={touched}
                  errors={errors}
                />
                <Button type="submit" disabled={isSubmitting} className="my-5">
                  메일 발송
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
