import React from 'react';
import { Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { 
  Container,
  Header,
  UserContainer,
  UserPhoto,
  UserInfo,
  Title,
  Bold,
  Subtitle,
  Button,
  SearchContainer,
  SearchInput,
  SearchButton,
  SearchIcon,
  Secrets,
  SecretHeader,
  SecretCardList
} from './styles';
import { SecretCard } from '../../components/SecretCard';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Home = () => {
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

      <SearchContainer>
        <SearchInput
          placeholderTextColor={theme.colors.text_light}
          placeholder='Qual senha você procura ?'
          autoCapitalize='sentences'
          autoCorrect={false}
        />
        <SearchButton>
          <SearchIcon name='search1' size={20} />
        </SearchButton>
      </SearchContainer>

      <Secrets>
        <SecretHeader>
          <Text
            style={{
              fontSize: 22,
              fontFamily: theme.fonts.medium,
              color: theme.colors.text
            }}
          >
            Suas senhas
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: theme.fonts.medium,
              color: theme.colors.text_light
            }}
          >
            01 ao Total
          </Text>
        </SecretHeader>
        
        <SecretCardList 
          data={Array.from(Array(10).keys())}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => String(item)}
          contentContainerStyle={{
            paddingBottom: getBottomSpace()
          }}
          renderItem={() => <SecretCard />}
        />

      </Secrets>
    </Container>
  );
}