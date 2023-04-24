import React from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { TextInput } from '@mantine/core';

// FormAddressInput Component
const FormAddressInput = ({
  inputType,
  id,
  name,
  placeholder,
  withAsterisk = false,
  setValue,
  register,
  formState,
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

    setValue('mainAddress', fullAddress);
    setValue('postcode', data.zonecode);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
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
      onClick={handleClick}
      error={formState?.errors[id]?.message}
    />
  );
};

export default FormAddressInput;
