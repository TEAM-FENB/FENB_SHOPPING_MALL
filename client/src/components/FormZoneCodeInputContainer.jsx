import React from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useController } from 'react-hook-form';
import { TextInput, Container } from '@mantine/core';
import { debounce } from 'lodash';

// AddressInputContainer Component
const FormZoneCodeInputContainer = ({
  inputType,
  id,
  name,
  control,
  trigger,
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
  }, [zoneCode]);

  // const handleChange = e => {
  // if (inputType === 'tel') {
  //   const phoneNumber = e.target.value;
  //   const phoneNumberWithHyphens = phoneNumber.replace(/\D/g, '').replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3');

  //   field.onChange(phoneNumberWithHyphens);
  // } else if (inputType !== 'tel') {
  //   field.onChange(e);
  // }
  // field.onChange(zoneCode);

  // trigger(id);
  // checkValidation();
  // };

  // const handleAddress = data => {
  //   let fullAddress = data.address; // 최종 주소 변수
  //   let extraAddress = ''; // 조합형 주소 변수

  //   // 기본 주소가 도로명 타입일때 조합한다.
  //   if (data.addressType === 'R') {
  //     // 법정동명이 있을 경우 추가한다.
  //     if (data.bname !== '') {
  //       extraAddress += data.bname;
  //     }
  //     // 건물명이 있을 경우 추가한다.
  //     if (data.buildingName !== '') {
  //       extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
  //     }
  //     // 조합형 주소를 만든다.
  //     fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
  //   }

  //   field.onChange(fullAddress);
  //   // checkValidation();
  // };

  return (
    <Container>
      <TextInput
        readOnly
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
        // onChange={handleChange}
        error={error && isDirty ? error.message : null}
      />
    </Container>
  );
};

export default FormZoneCodeInputContainer;
