import React from 'react';
import { useController } from 'react-hook-form';
import { TextInput, Container } from '@mantine/core';
import { debounce } from 'lodash';

// InputContainer Component
const FormInputContainer = ({ inputType, id, name, control, trigger, placeholder, withAsterisk = false }) => {
  const {
    field,
    fieldState: { isDirty, error },
  } = useController({
    name: id,
    control,
    defaultValue: '',
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkValidation = React.useCallback(
    debounce(() => {
      trigger(id);

      if (id === 'password' && isDirty) trigger('confirmPassword');
    }, 300),
    [isDirty]
  );

  const handleChange = e => {
    if (inputType === 'tel') {
      const phoneNumber = e.target.value;
      const phoneNumberWithHyphens = phoneNumber.replace(/\D/g, '').replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3');

      field.onChange(phoneNumberWithHyphens);
    } else if (inputType !== 'tel') {
      field.onChange(e);
    }
    console.log('InputContainer');

    checkValidation();
  };

  return (
    <Container>
      <TextInput
        withAsterisk={withAsterisk}
        w="40rem"
        h="3.8rem"
        // size="xl"
        mb="3.5rem"
        type={inputType}
        label={name}
        placeholder={placeholder}
        value={field.value}
        autoComplete="off"
        onChange={handleChange}
        error={error && isDirty ? error.message : null}
      />
    </Container>
  );
};

export default FormInputContainer;
