import React from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { Button, Stack, Title, Checkbox, Center } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormInput, FormAddressInput, FormZoneCodeInput, FormEmailInput, FormPhoneInput } from '../components';

// Styled Link
const SignInLink = styled(Link)`
  margin-left: 1rem;
  text-decoration: none;
  font-weight: 700;
  &:hover {
    color: blue;
  }
`;

// zod Validation
const validationSchema = z
  .object({
    email: z.string().email({ message: '이메일 주소를 정확히 입력해주세요.' }),
    name: z.string().min(1, { message: '이름을 입력해 주세요.' }),
    phone: z.string().regex(/^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$/, { message: '휴대전화 번호를 정확히 입력해주세요.' }),
    password: z.string().regex(/^[A-Za-z0-9]{6,12}$/, { message: '영문 또는 숫자를 6~12자 입력하세요.' }),
    confirmPassword: z.string().min(1, '패스워드를 확인해 주세요'),
    // confirmPassword: z.string().regex(/^[A-Za-z0-9]{6,12}$/, { message: '패스워드가 일치하지 않습니다.' }),
    mainAddress: z.string(),
    detailAddress: z.string(),
    postcode: z.string(),
    terms: z.literal(true, {
      errorMap: () => ({ message: '이용 약관에 동의해 주세요' }),
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: '패스워드가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

// SignUp Component
const SignUp = () => {
  const navigate = useNavigate();
  // const { state } = useLocation();

  const { handleSubmit, register, formState, setValue } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      email: '',
      name: '',
      phone: '',
      password: '',
      confirmPassword: '',
      mainAddress: '',
      detailAddress: '',
      postcode: '',
    },
  });

  // 삽질 결과: 서버에서 뭘 안주면 나는 보내는 거 성공하고
  // 서버도 등록은 완료... 하지만 resoponse 받은게 없어서 나는 응답에 갇힘...
  // 뭐라도 줘야할듯.. 그리고 준다면 나는 뭘 처리하지?? 흠..
  const handleSignUp = async data => {
    try {
      console.log(data);
      const response = await axios.post('/api/auth/signup', {
        email: data.email,
        name: data.name,
        phone: data.phone,
        password: data.password,
        mainAddress: data.mainAddress,
        detailAddress: data.detailAddress,
        postcode: data.postcode,
      });

      console.log(response.data); // 임시

      notifications.show({
        color: 'blue',
        autoClose: 2000,
        title: '알림',
        message: '회원가입이 완료되었습니다.',
        sx: { div: { fontSize: '1.5rem' } },
      });

      navigate('/SignIn');
    } catch (error) {
      notifications.show({
        color: 'red',
        autoClose: 2000,
        title: '알림',
        message: error.message,
        sx: { div: { fontSize: '1.5rem' } },
      });
    }
  };

  return (
    <Stack
      align="center"
      h="90rem"
      p="0"
      m="0"
      sx={{
        input: {
          padding: '0',
          fontSize: '1.6rem',
          border: 'none',
          borderBottomStyle: 'solid',
          borderBottomWidth: '0.07rem',
          borderBottomColor: '#ced4da',
        },
        label: {
          fontSize: '1.6rem',
        },
        div: {
          padding: '0',
          fontSize: '1.6rem',
        },
      }}>
      <Title order={2} mt="6rem" mb="3rem" fz="3.2rem">
        회원 가입
      </Title>
      <form noValidate onSubmit={handleSubmit(handleSignUp)}>
        <FormEmailInput
          inputType="text"
          withAsterisk
          id="email"
          name="이메일 주소"
          placeholder="예) fenb@fenb.com"
          register={register}
          formState={formState}
        />
        <FormInput
          inputType="text"
          withAsterisk
          id="name"
          name="이름"
          placeholder="예) 김펜비"
          register={register}
          formState={formState}
        />
        <FormPhoneInput
          inputType="tel"
          withAsterisk
          id="phone"
          name="휴대전화번호"
          placeholder="예) 01012345678"
          setValue={setValue}
          register={register}
          formState={formState}
        />
        <FormInput
          inputType="password"
          withAsterisk
          id="password"
          name="비밀번호"
          placeholder="영문 또는 숫자를 6~12자 입력하세요."
          register={register}
          formState={formState}
        />
        <FormInput
          inputType="password"
          withAsterisk
          id="confirmPassword"
          name="비밀번호 확인"
          placeholder="영문 또는 숫자를 6~12자 입력하세요."
          register={register}
          formState={formState}
        />
        <FormAddressInput
          inputType="text"
          id="mainAddress"
          name="주소"
          placeholder="이곳을 클릭하세요."
          setValue={setValue}
          register={register}
          formState={formState}
        />
        <FormInput
          inputType="text"
          id="detailAddress"
          name="상세주소"
          placeholder="상세 주소를 입력하세요."
          register={register}
          formState={formState}
        />
        <FormZoneCodeInput inputType="text" id="postcode" name="우편번호" register={register} formState={formState} />
        <Checkbox
          label="이용 약관에 동의 합니다."
          size="xl"
          color="dark"
          mb="3.5rem"
          sx={{ input: { border: '0.0625rem solid #ced4da' } }}
          {...register('terms')}
          error={formState.errors?.terms?.message}
        />
        <Button type="submit" w="40rem" h="5.2rem" p="0" color="dark" radius="md">
          가입하기
        </Button>
        <Center mt="2rem">
          회원이신가요?
          <SignInLink to={'/signin'}>로그인</SignInLink>
        </Center>
      </form>
    </Stack>
  );
};
export default SignUp;
