'use client';

import Button from '@/components/Button';
import { resignReasonSchema } from '@/libs/validations';
import axios from 'axios';
import { Form, Formik } from 'formik';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
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
            initialValues={{
              reason: '',
            }}
            validationSchema={resignReasonSchema}
            onSubmit={async (data, { setSubmitting, resetForm }) => {
              console.log(data);
              setSubmitting(true);
              try {
                const response = await axios.post(
                  `/api/auth/delete-account/${userId}`,
                  {
                    reason: data.reason,
                  }
                );
                console.log(response);

                if (response.status === 200) {
                  toast.success('회원탈퇴 성공!');
                  signOut();
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
              <Form className="flex flex-col gap-2 ">
                <p className="text-center ">
                  <Image
                    className="m-auto mb-[8px] mt-[10px] box-border block size-[170px] rounded-full border-2 border-gray-100 "
                    src={session?.user.image!}
                    width={200}
                    height={200}
                    alt={'user'}
                  />
                </p>
                <p className="text-center  text-xl font-semibold">
                  <span className="text-center text-[#5B74E1]">
                    {session?.user.name}
                  </span>{' '}
                  님{' '}
                </p>
                <p className="mb-10 text-center text-xl font-semibold">
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

