'use client';

import noUser from '@/../public/images/noUser.png';
import { editUserSchema } from '@/libs/validations';
import axios from 'axios';
import { Form, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Button from '../Button';

const EditUserInfoForm = () => {
  const router = useRouter();
  const { status, data: session } = useSession();
  console.log(session, status);

  return (
    <div id="dev"  className=" top-0   mb-[-30px] mt-[-152px]  h-auto w-full  bg-[url('/img/h_bg.png')] bg-cover bg-center bg-no-repeat py-12 lg:px-6 2sm:px-2">
    <div className="m-auto mb-[60px] h-auto w-[40%] rounded-3xl bg-white pb-8 shadow-lg  drop-shadow-sm   lg:w-[60%] 2sm:w-[97%]">
      <div className="mx-auto mt-[165px] flex w-full max-w-[330px] flex-col gap-8 lg:px-4 2sm:px-2 ">
          <h1 className="mt-4 pt-5 text-center text-3xl">회원탈퇴</h1>
          <p>
            <Image
              className="m-auto mb-[8px]  mt-[10px] block size-[110px] rounded-full "
              src={noUser}
              // src={session.user.image || noUser}
              width={300}
              height={25}
              alt={'user'}
            />
          </p>

          <Formik
            initialValues={{
              email: '',
              name: '',
              company: '',
              rank: '',
            }}
            validationSchema={editUserSchema}
            onSubmit={async (data, { setSubmitting, resetForm }) => {
              console.log(data);
              setSubmitting(true);
              try {
                const response = await axios.post('/api/auth/editUserInfo', {
                  email: data.email,
                  name: data.name,
                  company: data.company,
                  rank: data.rank,
                });
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
                <h3 className="text-center text-xl font-semibold">
                  {/* <span className='text-[#5B74E1]'>{session.user.name}</span> 님*/}{' '}
                  정말 탈퇴하시겠습니까?
                </h3>
                <p className=" text-center text-[#919191]">탈퇴사유(선택)</p>
                <textarea className="my-4 block min-h-80 w-full resize-none  rounded-xl border-2  border-[#EAEAEA] bg-none   "></textarea>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className=" mb-3 flex justify-center bg-[#DB7777] font-bold  text-[#ffffff]"
                >
                  <Image
                    className="mr-3 mt-[3.2px] "
                    src="/Icon/Icon_w_log-out.png"
                    alt="Next.js Logo"
                    width={17.5}
                    height={5}
                  />
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

export default EditUserInfoForm;
