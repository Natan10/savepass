import React, { useEffect } from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';
import { useAssets } from 'expo-asset';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../hooks/auth';

import { 
  Container,
  Logo,
  Button,
  Title 
} from './styles';

export const Login = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const {signInLoad, signIn, user} = useAuth();

  const [assets] = useAssets([require('../../assets/splash.png')]);
  const logo = assets ? assets![0].localUri : '';


  const handleLogin = async () => {
    await signIn();
  }

  useEffect(() => {
    if(user.id) {
      navigation.navigate('Home');
    }
  }, [user]);

  return(
    <Container>
      <Logo
        resizeMode='cover'
        source={{
          uri: logo || ''
        }}
      />

      <Button onPress={handleLogin} >
        {signInLoad ? 
          <ActivityIndicator size={20} color={theme.colors.white} /> :
          <>
            <AntDesign 
              name="github" 
              size={24} 
              color={theme.colors.white}
            />
            <Title>
              Login with github
            </Title>
          </>
        }       
      </Button>

      <Modal
        animationType='fade'
        visible={signInLoad}
        statusBarTranslucent
        transparent
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(14,14,16,0.6)'
          }} 
        />
      </Modal>
    </Container>
  );
}
