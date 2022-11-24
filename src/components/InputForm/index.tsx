import React from 'react';
import { TextInputProps } from 'react-native';
import { Control, Controller} from 'react-hook-form';

import { 
  Container,
  Input,
  Label,
  Error
} from './styles';


interface Props extends TextInputProps {
  labelName: string;
  name?: string;
  error: string | undefined;
  control?: Control;
}

export const InputForm = ({labelName,name, error, control, ...rest}: Props) => {
  return(
    <Container>
      <Label>{labelName}</Label>
      <Controller
        name={name}
        control={control}
        render={({field: {onChange, value}}) => (
          <Input 
            value={value}
            onChangeText={onChange}
            {...rest} 
          />
        )}
      />
      {error && <Error>{error}</Error>}
    </Container>
  )
}