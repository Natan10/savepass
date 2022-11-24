import React from 'react';
import { useForm, FieldValues, Control } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { InputForm } from '../../components/InputForm';
import { Container, Form, SaveButton, Title } from './styles';

interface FormData {
  serviceKey: string;
  userKey: string;
  passwordKey: string;
}

const schema = yup.object().shape({
  serviceKey: yup.string().required('Deve possuir um nome para o serviço'),
  userKey: yup.string().min(3, 'Deve ter no mínimo 3 caracteres').required('Deve possuir um email ou nome de usuário'),
  passwordKey: yup.string().min(6, 'Deve ter no mínimo 6 caracteres').required('Deve possuir um password')
}).required();

export const RegisterSecret = () => {
  const { 
    control, 
    reset, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const formControl = control as unknown as Control<FieldValues,any>;

  const handleCreateSavePass = (form: FormData) => {
    console.log(form)
    reset();
  }

  return(
    <Container>
      <Form>
        <InputForm 
          labelName='Nome do serviço' 
          name="serviceKey"
          autoCorrect={false}
          autoCapitalize="sentences"
          control={formControl}
          error={errors && errors.serviceKey?.message}
        />
        <InputForm 
          labelName='E-mail ou usuário' 
          name="userKey"
          autoCapitalize='none'
          autoCorrect={false}
          control={formControl}
          error={errors && errors.userKey?.message}
        />
        <InputForm 
          labelName='Senha' 
          name="passwordKey"
          control={formControl}
          secureTextEntry
          keyboardType='visible-password'
          autoCorrect={false}
          error={errors && errors.passwordKey?.message}
        />

        <SaveButton onPress={handleSubmit(handleCreateSavePass)}>
          <Title>Salvar</Title>
        </SaveButton>
      </Form>
    </Container>
  );
}


