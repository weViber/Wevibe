'use client';

import Button from '@/components/Button';
import InputFormik from '@/components/InputFormik';
import { changePasswordSchema } from '@/libs/validations';
import axios from 'axios';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const ChangePasswordForm = ({ params }: { params: { token: string } }) => {
  const router = useRouter();
  const token = params.token;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto flex w-full max-w-[330px] flex-col gap-8 ">
        <h1 className="pt-5 text-center text-3xl">비밀번호 변경</h1>
        <Formik
          initialValues={{
            password: '',
            confirm: '',
          }}
          validationSchema={changePasswordSchema}
          onSubmit={async (data, { setSubmitting, resetForm }) => {
            console.log(data);
            setSubmitting(true);
            try {
              const response = await axios.post(
                `/api/auth/password-reset/${token}`,
                {
                  password: data.password,
                }
              );
              console.log(response);
              if (response.status === 200) {
                toast.success('비밀번호 변경 성공!');
                resetForm();
                router.push('/');
              }
            } catch (error: any) {
              toast.error(
                error.response?.data?.message || 'An unexpected error occurred'
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
                label="새로운 비밀번호"
                name={'password'}
                type={'password'}
                touched={touched}
                errors={errors}
              />
              <InputFormik
                label="새로운 비밀번호 확인"
                name={'confirm'}
                type={'password'}
                touched={touched}
                errors={errors}
              />
              <Button type="submit" disabled={isSubmitting} className="my-5">
                변경완료
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default ChangePasswordForm;
