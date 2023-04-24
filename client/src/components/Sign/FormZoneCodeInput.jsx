import React from 'react';
import { TextInput } from '@mantine/core';

// FormZoneCodeInput Component
const FormZoneCodeInput = ({ inputType, id, name, placeholder, withAsterisk = false, register, formState }) => (
  <TextInput
    {...register(id)}
    readOnly
    withAsterisk={withAsterisk}
    w="40rem"
    h="3.8rem"
    mb="3.5rem"
    type={inputType}
    label={name}
    placeholder={placeholder}
    autoComplete="off"
    error={formState?.errors[id]?.message}
  />
);
export default FormZoneCodeInput;
