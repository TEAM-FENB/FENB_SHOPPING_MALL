import React from 'react';
import axios from 'axios';

import { TextInput, Container } from '@mantine/core';

// InputContainer Component
const FormEmailInputContainer = ({ inputType, id, name, placeholder, withAsterisk = false, register, formState }) => {
  const [duplicateEmailError, setDuplicateEmailError] = React.useState('');

  const checkEmailDuplicate = async stremail => {
    try {
      const response = await axios.post('/api/auth/signup/check', {
        email: stremail,
      });

      if (response.data.isDuplicate) {
        setDuplicateEmailError('이미 사용중인 이메일 입니다.');
      } else {
        setDuplicateEmailError('');
      }
    } catch (error) {
      console.error(error);
    }
  };
  // const {
  //   field,
  //   fieldState: { isDirty, error },
  // } = useController({
  //   name: id,
  //   defaultValue: '',
  // });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const checkValidation = React.useCallback(
  //   debounce(() => {
  //     trigger(id);

  //     if (id === 'password' && isDirty) trigger('confirmPassword');
  //   }, 300),
  //   [isDirty]
  // );

  // const handleChange = e => {
  //   if (inputType === 'tel') {
  //     const phoneNumber = e.target.value;
  //     const phoneNumberWithHyphens = phoneNumber.replace(/\D/g, '').replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3');

  //     field.onChange(phoneNumberWithHyphens);
  //   } else if (inputType !== 'tel') {
  //     field.onChange(e);
  //   }
  //   console.log('InputContainer');

  //   // checkValidation();
  // };

  return (
    <Container>
      <TextInput
        {...register(id)}
        withAsterisk={withAsterisk}
        w="40rem"
        h="3.8rem"
        // size="xl"
        mb="3.5rem"
        type={inputType}
        label={name}
        placeholder={placeholder}
        autoComplete="off"
        onBlur={e => checkEmailDuplicate(e.target.value)}
        // error={formState?.errors[id]?.message}
        error={formState?.errors[id]?.message || duplicateEmailError}
      />
    </Container>
  );
};
export default FormEmailInputContainer;
