import React from 'react';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import uuid from 'react-native-uuid';
import { useForm, FieldValues, Control } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from 'yup';

import { InputForm } from '../../components/InputForm';
import { 
  Container,
  Form,
  SaveButton,
  Title,
  Header,
  HeaderGoButton,
  HeaderTitle
} from './styles';

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


const storageKey = '@savePass:items';

export const RegisterSecret = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const { 
    control,  
    handleSubmit, 
    formState: { errors } 
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const formControl = control as unknown as Control<FieldValues,any>;

  const handleCreateSavePass = async (form: FormData) => {
    try {
      const newSavePass = {
        id: String(uuid.v4()),
        user: form.userKey,
        service: form.serviceKey,
        password: form.passwordKey
      };

    

      const data = await AsyncStorage.getItem(storageKey);
      const newData = data ? JSON.parse(data) : [];

      await AsyncStorage.setItem(storageKey, JSON.stringify([...newData, newSavePass]));
      
      navigation.goBack();
    } catch (error) {
      console.log(error);``
      Alert.alert('Erro ao salvar novo SavePass, Tente novamente!');
    }
  }

  const handleGoBack = () => {
    navigation.goBack();
  }

  return(
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled
      style={{flex: 1}}
    >
      <Header>
        <HeaderGoButton onPress={handleGoBack}>
          <FontAwesome 
            name="chevron-left" 
            size={20} 
            color={theme.colors.primary}
          />
        </HeaderGoButton>
        <HeaderTitle>Cadastro de senha</HeaderTitle>
      </Header>
      <Container>
        <Form>
          <InputForm 
            labelName='Nome do serviço' 
            name="serviceKey"
            autoCorrect={false}
            autoCapitalize="none"
            control={formControl}
            maxLength={40}
            error={errors && errors.serviceKey?.message}
          />
          <InputForm 
            labelName='E-mail ou usuário' 
            name="userKey"
            autoCapitalize='none'
            autoCorrect={false}
            control={formControl}
            maxLength={40}
            error={errors && errors.userKey?.message}
          />
          <InputForm 
            labelName='Senha' 
            name="passwordKey"
            control={formControl}
            secureTextEntry
            keyboardType='visible-password'
            autoCorrect={false}
            maxLength={40}
            error={errors && errors.passwordKey?.message}
          />

          <SaveButton onPress={handleSubmit(handleCreateSavePass)}>
            <Title>Salvar</Title>
          </SaveButton>
        </Form>
      </Container>
    </KeyboardAvoidingView>
  );
}


