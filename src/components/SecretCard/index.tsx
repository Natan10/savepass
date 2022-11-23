import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';

import { 
  Container,
  ShowSecret,
  SecretContent,
  SecretName,
  Email,
  Secret
} from './styles';
import { useTheme } from 'styled-components';


export const SecretCard = () => {
  const [isVisible, setIsVisible] = useState(false);

  const theme = useTheme();

  return(
    <Container
      end={{x:1,y:0}}     
      colors={[ isVisible ? '#EBF2FF' : '#ffffff', '#ffffff']}
    >
      <ShowSecret onPress={() => setIsVisible(old => !old)}>
        <FontAwesome
          name={`${ isVisible ? 'eye-slash' : 'eye'}`} 
          size={20} 
          color={isVisible ? theme.colors.primary : theme.colors.text_light} 
        /> 
      </ShowSecret>

      <SecretContent>
        <SecretName visible={isVisible}>Plataforma Rocketseat</SecretName>
        {!isVisible ? 
          <Email>seuemail@gmail.com</Email> :
          <Secret>seuemail@gmail.com</Secret>
        }
      </SecretContent>
    </Container>
  );
}

