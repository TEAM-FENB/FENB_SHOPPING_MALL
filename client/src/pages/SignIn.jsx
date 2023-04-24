import React from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { Button, Image, Stack, Center, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQueryClient } from '@tanstack/react-query';
import { FormInput } from '../components';
import { userState } from '../recoil/atoms';

// Styled Link
const SignUpLink = styled(Link)`
  margin-left: 1rem;
  text-decoration: none;
  font-weight: 700;
  &:hover {
    color: blue;
  }
`;

// zod Validation
const validationSchema = z.object({
  email: z.string().email({ message: '이메일 주소를 정확히 입력해주세요.' }),
  password: z.string().regex(/^[A-Za-z0-9]{6,12}$/, { message: '영문 또는 숫자를 6~12자 입력하세요.' }),
});

// SignIn Component
const SignIn = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const { state } = useLocation();

  // { isValid, errors, isDirty }
  const { handleSubmit, register, formState } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = async data => {
    try {
      const response = await axios.post('/api/auth/signin', {
        email: data.email,
        password: data.password,
      });

      console.log('SignIn', response.data); // 서버 응답을 출력

      notifications.show({
        color: 'blue',
        autoClose: 2000,
        title: '알림',
        message: `${response.data.username}님 환영합니다.`,
        sx: { div: { fontSize: '1.5rem' } },
      });

      console.log(response.data); // 서버 응답을 출력
      queryClient.removeQueries({ queryKey: ['user'] });
      queryClient.removeQueries({ queryKey: ['user'] });

      if (state) {
        navigate(state);
      } else {
        navigate('/');
      }
    } catch (error) {
      notifications.show({
        color: 'red',
        autoClose: 2000,
        title: '알림',
        message: error.response.data.error ? error.response.data.error : error.message,
        sx: { div: { fontSize: '1.5rem' } },
      });
    }
  };

  return (
    <Stack
      align="center"
      h="75.5rem"
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
      <Title order={2}>
        <Image
          width="40rem"
          mb="2rem"
          maw="60rem"
          mx="auto"
          src="images/logo/loginPageLogo.svg"
          alt="loginPageLogoImage"
        />
      </Title>
      <form noValidate onSubmit={handleSubmit(handleLogin)}>
        <FormInput
          inputType="text"
          id="email"
          name="이메일 주소"
          placeholder="예) fenb@fenb.com"
          register={register}
          formState={formState}
        />
        <FormInput inputType="password" id="password" name="비밀번호" register={register} formState={formState} />
        <Button type="submit" w="40rem" h="5.2rem" p="0" color="dark" radius="md">
          로그인
        </Button>
        <Center mt="2rem">
          회원이 아니신가요?
          <SignUpLink to={'/signup'}>회원가입</SignUpLink>
        </Center>
      </form>
    </Stack>
  );
};
export default SignIn;
