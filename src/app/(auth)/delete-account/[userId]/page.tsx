'use client';

import Button from '@/components/Button';
import { resignReasonSchema } from '@/libs/validations';
import axios from 'axios';
import { Form, Formik } from 'formik';
import { signOut, useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import InputFormik from '../../../../components/InputFormik';

const DeleteAccountForm = ({ params }: { params: { userId: string } }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const userId = params.userId;

  if (!session?.user.id) return redirect('/');
  return (
    <div
      id="dev"
      className=" top-0   mb-[-30px] mt-[-152px]  h-auto w-full  bg-[url('/img/h_bg.png')] bg-cover bg-center bg-no-repeat py-12 lg:px-6 2sm:px-2"
    >
      <div className="m-auto mb-[60px] h-auto w-[40%] rounded-3xl bg-white pb-8 shadow-lg  drop-shadow-sm   lg:w-[60%] 2sm:w-[97%]">
        <div className="mx-auto mt-[165px] flex w-full max-w-[330px] flex-col gap-8 lg:px-4 2sm:px-4 ">
          <h1 className="mb-3 mt-7 pt-5 text-center text-3xl">회원탈퇴</h1>
          
          <Formik
          // 초기값 빈칸으로 설정, InputFormik의 name과 일치 해야 함
            initialValues={{
              reason: '',
            }}

            // 만들어진 유효성 검사 적용
            validationSchema={resignReasonSchema}

            onSubmit={async (data, { setSubmitting, resetForm }) => {
              console.log(data);
              setSubmitting(true);
              //회원탈퇴 시작
              try {
                // 해당 경로로 axios를 통하여 입력된 탈퇴사유와 함께 전송
                const response = await axios.post(
                  `/api/auth/delete-account/${userId}`,
                  {
                    reason: data.reason,
                  }
                );
                console.log(response);
                
                // 회원탈퇴가 성공했을 경우 즉 상태코드가 200일 경우, 회원탈퇴 성공 메시지가 나타나고, 로그아웃이 되며, 메인페이지로 이동된다.
                if (response.status === 200) {
                  toast.success('회원탈퇴 성공!');
                  signOut(); // 로그아웃
                  resetForm(); // 모든 필드값이 리셋
                  router.push('/'); // 메인페이지로 이동
                }
              } catch (error: any) {
                // 에러가 발생했을 경우, An unexpected error occurred 에러 메시지가 나타남
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
              <Form className="flex flex-col gap-2 ">
                <p className="text-center ">
                  {/* <Image
                    className="m-auto mb-[8px] mt-[10px] box-border block size-[170px] rounded-full border-2 border-gray-100 "
                    src={session?.user.image!}
                    width={200}
                    height={200}
                    alt={'user'}
                  /> */}
                </p>
                {/* <p className="text-center  text-xl font-semibold">
                  <span className="text-center text-[#5B74E1]">
                    {session?.user.name}
                  </span>{' '}
                  님{' '}
                </p> */}
                <p className="mt-2 mb-3 text-center text-xl font-semibold">
                  정말 탈퇴하시겠습니까?
                </p>

                {/* <p>{session?.user.email}</p> */}

                <span className="">
                  <InputFormik
                    label="탈퇴사유"
                    name={'reason'}
                    type={'text'}
                    touched={touched}
                    errors={errors}
                  />
                </span>
                {/* <p className='absolute -mt-[35px] ml-2'> (선택)</p> */}

                {/* <Link href="/forgot-password">비밀번호 변경</Link>
              <Link href="/delete-account">회원 탈퇴</Link> */}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="mb-12 mt-2 flex justify-center bg-[#DB7777] font-bold  text-[#ffffff] "
                >
                  회원탈퇴
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountForm;

