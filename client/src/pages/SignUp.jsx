import React from 'react';
import axios from 'axios';
import { Button, Stack, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormInputContainer, FormAddressInputContainer, FormZoneCodeInputContainer } from '../components';

// zod Validation
const validationSchema = z
  .object({
    email: z.string().email({ message: '이메일 주소를 정확히 입력해주세요.' }),
    name: z.string().min(1, { message: '이름을 입력해 주세요.' }),
    phone: z.string().regex(/^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$/, { message: '휴대전화 번호를 정확히 입력해주세요.' }),
    password: z.string().regex(/^[A-Za-z0-9]{6,12}$/, { message: '영문 또는 숫자를 6~12자 입력하세요.' }),
    confirmPassword: z.string().regex(/^[A-Za-z0-9]{6,12}$/, { message: '패스워드가 일치하지 않습니다.' }),
    mainAddress: z.string(),
    detailAddress: z.string(),
    postcode: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: '패스워드가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

// SignUp Component
const SignUp = () => {
  const [zoneCode, setZoneCode] = React.useState('');
  console.log(zoneCode);
  const navigate = useNavigate();
  // const { state } = useLocation();
  const {
    handleSubmit,
    control,
    trigger,
    formState: { isValid },
  } = useForm({
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

  const setZoneCodeHandler = zoneCode => setZoneCode(zoneCode);

  const handleSignUp = async data => {
    try {
      console.log(data);
      const response = await axios.post('/api/auth/signin', {
        email: data.email,
        password: data.password,
      });

      console.log(response.data); // 서버 응답을 출력

      navigate('/signin');
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
      <Title order={2} mt="6rem" mb="3rem" fz="3.2rem">
        회원 가입
      </Title>
      <form noValidate>
        <FormInputContainer
          inputType="text"
          withAsterisk
          id="email"
          name="이메일 주소"
          placeholder="예) fenb@fenb.com"
          control={control}
          trigger={trigger}
        />
        <FormInputContainer
          inputType="text"
          withAsterisk
          id="name"
          name="이름"
          placeholder="예) 김펜비"
          control={control}
          trigger={trigger}
        />
        <FormInputContainer
          inputType="tel"
          withAsterisk
          id="phone"
          name="휴대전화번호"
          placeholder="예) 01012345678"
          control={control}
          trigger={trigger}
        />
        <FormInputContainer
          inputType="password"
          withAsterisk
          id="password"
          name="비밀번호"
          placeholder="영문 또는 숫자를 6~12자 입력하세요."
          control={control}
          trigger={trigger}
        />
        <FormInputContainer
          inputType="password"
          withAsterisk
          id="confirmPassword"
          name="비밀번호 확인"
          placeholder="영문 또는 숫자를 6~12자 입력하세요."
          control={control}
          trigger={trigger}
        />
        <FormAddressInputContainer
          inputType="text"
          id="mainAddress"
          name="주소"
          placeholder="이곳을 클릭해주세요!!"
          control={control}
          trigger={trigger}
          setZoneCodeHandler={setZoneCodeHandler}
        />
        <FormZoneCodeInputContainer
          inputType="text"
          id="postcode"
          name="우편번호"
          control={control}
          zoneCode={zoneCode}
        />
        <Button
          w="40rem"
          h="5.2rem"
          p="0"
          color={!isValid ? 'gray' : 'dark'}
          radius="md"
          disabled={!isValid}
          onClick={handleSubmit(handleSignUp)}>
          가입하기
        </Button>
      </form>
    </Stack>
  );
};
export default SignUp;
