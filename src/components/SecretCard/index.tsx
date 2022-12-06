import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import Animated, {Layout, SlideInRight} from 'react-native-reanimated';
import { useTheme } from 'styled-components';
import { 
  Placeholder,
  PlaceholderMedia,
  Fade
} from "rn-placeholder";

import { 
  Container,
  ShowSecret,
  SecretContent,
  SecretName,
  Email,
  Secret
} from './styles';

export interface SecretCardData {
  id: string;
  user: string;
  service: string;
  password: string;
}

export interface ViewSecretCardData extends SecretCardData {
  load?: boolean;
}

interface Props {
  data: ViewSecretCardData
  index: number;
}

export const SecretCard = ({data, index}: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  const theme = useTheme();

  return data.load ? (
    <Placeholder 
      Animation={Fade}
      style={{
        opacity: 0.2,
      }}
    >
      <PlaceholderMedia 
        color={theme.colors.black}
        style={{
          flex: 1,
          width: '100%',
          height: 90,
          borderRadius: 5,
          marginBottom: 18,
        }}
      />
    </Placeholder>
  ):(
    <Animated.View
      entering={SlideInRight.delay(index*100)}
      layout={Layout.springify()}
    >
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
    </Animated.View> 
  );
}

