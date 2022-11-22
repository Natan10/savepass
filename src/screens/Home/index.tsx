import React from 'react';
import { AntDesign } from '@expo/vector-icons';

import { 
  Container,
  Header,
  UserContainer,
  UserPhoto,
  UserInfo,
  Title,
  Bold,
  Subtitle,
  Button
} from './styles';
import { useTheme } from 'styled-components';

const Home = () => {

  const theme = useTheme();

  return(
    <Container>
      <Header>
        <UserContainer>
          <UserPhoto
            resizeMode='cover'
            source={{
              uri: 'https://doodleipsum.com/700/avatar?bg=FF3C3C&i=3cdf1e1375692dbe37689851492c2957'
            }} 
          />
          <UserInfo>
            <Title numberOfLines={1}>
              Olá, <Bold>Rocketseat</Bold>
            </Title>
            <Subtitle>Sinta-se seguro aqui</Subtitle>
          </UserInfo>
        </UserContainer>
        <Button>
          <Subtitle>
            <AntDesign name="plus" size={16} color={theme.colors.white}/>
          </Subtitle>
        </Button>
      </Header>
    </Container>
  );
}

export default Home;