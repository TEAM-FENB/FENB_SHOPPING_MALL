import React from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useController } from 'react-hook-form';
import { TextInput, Container } from '@mantine/core';

// AddressInputContainer Component
const FormAddressInputContainer = ({
  inputType,
  id,
  name,
  control,
  // trigger,
  placeholder,
  withAsterisk = false,
  setZoneCodeHandler,
}) => {
  const open = useDaumPostcodePopup();

  const handleComplete = data => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setZoneCodeHandler(data.zonecode);
    field.onChange(fullAddress);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  const {
    field,
    fieldState: { isDirty, error },
  } = useController({
    name: id,
    control,
    defaultValue: '',
  });

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
        onClick={handleClick}
        error={error && isDirty ? error.message : null}
      />
    </Container>
  );
};

export default FormAddressInputContainer;
