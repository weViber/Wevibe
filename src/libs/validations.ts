import * as yup from 'yup';

export const signUpSchema = yup
  .object({
    email: yup
      .string()
      .matches(
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
        '이메일을 정확히 입력해 주세요.'
      )
      .required('이메일을 입력해 주세요.'),
    name: yup
      .string()
      .min(2, '최소 2자 이상 작성해야 합니다.')
      .max(12, '최대 12자까지 작성 가능합니다.')
      .matches(
        /^[A-Za-z0-9가-힣]{2,12}$/,
        '닉네임은 영어, 한글, 숫자만 가능합니다.'
      )
      .required('사용자명(이름)을 입력해 주세요.'),

    password: yup
      .string()
      // .min(8, '최소 8자 이상 작성해야 합니다.')
      // .max(16, '최대 16자까지 작성 가능합니다.')
      // .matches(
      //   /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{8,16}$/,
      //   '비밀번호는 영어, 숫자, 특수문자만 가능합니다.'
      // )
      .required('비밀번호를 입력해 주세요!'),

    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], '비밀번호가 다릅니다.')
      .required('비밀번호를 한번 더 입력해 주세요'),

    company: yup.string(),
    rank: yup.string(),
    funnel: yup.string(),
  })
  .required();

export const emailSchema = yup
  .object({
    email: yup
      .string()
      .matches(
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
        '이메일을 정확히 입력해 주세요.'
      )
      .required('이메일을 입력해 주세요.'),
  })
  .required();

export const editUserSchema = yup
  .object({
    email: yup
      .string()
      .matches(
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
        '이메일을 정확히 입력해 주세요.'
      )
      .required('이메일을 입력해 주세요.'),
    name: yup
      .string()
      .min(2, '최소 2자 이상 작성해야 합니다.')
      .max(12, '최대 12자까지 작성 가능합니다.')
      .matches(
        /^[A-Za-z0-9가-힣]{2,12}$/,
        '닉네임은 영어, 한글, 숫자만 가능합니다.'
      )
      .required('사용자명(이름)을 입력해 주세요.'),

    // password: yup
    //   .string()
    // .required('비밀번호를 입력해 주세요!'),

    // confirmPassword: yup
    //   .string()
    //   .oneOf([yup.ref('password')], '비밀번호가 다릅니다.')
    //   .required('비밀번호를 한번 더 입력해 주세요'),

    company: yup.string(),
    rank: yup.string(),
    // funnel: yup.string(),
  })
  .required();

export const changePasswordSchema = yup
  .object({
    password: yup.string().required('새로운 비밀번호를 입력해 주세요!'),

    confirm: yup
      .string()
      .oneOf([yup.ref('password')], '비밀번호가 다릅니다.')
      .required('비밀번호를 한번 더 입력해 주세요'),
  })
  .required();

export const resignReasonSchema = yup
  .object({
    reason: yup.string(),
  })
  .required();
