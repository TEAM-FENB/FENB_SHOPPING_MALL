import React from 'react';
import { TextInput } from '@mantine/core';

// FormPhoneInput Component
const FormPhoneInput = ({ inputType, id, name, placeholder, withAsterisk = false, setValue, register, formState }) => {
  const addDash = str => {
    const phoneNumber = str;
    const phoneNumberWithHyphens = phoneNumber.replace(/\D/g, '').replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3');

    setValue('phone', phoneNumberWithHyphens);
  };

  return (
    <TextInput
      {...register(id)}
      withAsterisk={withAsterisk}
      w="40rem"
      h="3.8rem"
      mb="3.5rem"
      type={inputType}
      label={name}
      placeholder={placeholder}
      autoComplete="off"
      onBlur={e => addDash(e.target.value)}
      error={formState?.errors[id]?.message}
    />
  );
};
export default FormPhoneInput;
