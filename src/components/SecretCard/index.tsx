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

export interface SecretCardData {
  id: string;
  user: string;
  service: string;
  password: string;
}

interface Props {
  data: SecretCardData
}


export const SecretCard = ({data}: Props) => {
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
          color={isVisible ? theme.colors.primary : theme.colors.text_light} 
          size={20} 
        /> 
      </ShowSecret>

      <SecretContent>
        <SecretName visible={isVisible}>{data.service}</SecretName>
        {!isVisible ? 
          <Email>{data.user}</Email> :
          <Secret>{data.password}</Secret>
        }
      </SecretContent>
    </Container>
  );
}

