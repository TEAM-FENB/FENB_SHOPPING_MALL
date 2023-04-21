import React from 'react';

import { useController } from 'react-hook-form';
import { TextInput, Container } from '@mantine/core';

// AddressInputContainer Component
const FormZoneCodeInputContainer = ({
  inputType,
  id,
  name,
  control,

  placeholder,
  withAsterisk = false,
  zoneCode,
}) => {
  const {
    field,
    fieldState: { isDirty, error },
  } = useController({
    name: id,
    control,
    defaultValue: '',
  });

  React.useEffect(() => {
    field.onChange(zoneCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoneCode]);

  return (
    <Container>
      <TextInput
        readOnly
        withAsterisk={withAsterisk}
        w="40rem"
        h="3.8rem"
        mb="3.5rem"
        type={inputType}
        label={name}
        placeholder={placeholder}
        value={field.value}
        autoComplete="off"
        error={error && isDirty ? error.message : null}
      />
    </Container>
  );
};

export default FormZoneCodeInputContainer;
