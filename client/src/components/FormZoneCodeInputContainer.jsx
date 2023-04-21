import React from 'react';
import { TextInput, Container } from '@mantine/core';

// FormZoneCodeInputContainer Component
const FormZoneCodeInputContainer = ({
  inputType,
  id,
  name,
  placeholder,
  withAsterisk = false,
  register,
  formState,
}) => (
  <Container>
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
  </Container>
);
export default FormZoneCodeInputContainer;
