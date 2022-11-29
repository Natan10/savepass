import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { AntDesign } from '@expo/vector-icons';


export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.bg};
`;



export const SearchContainer = styled.View`
  margin-top: -28px;
  padding: 0 24px;
  width: 100%;
  height: 55px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  border-radius: 5px;

`;

export const SearchInput = styled.TextInput`
  height: 100%;
  width: 100%;
  
  padding: 12px 24px;

  flex: 1;

  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;

  font-size: 16px;
  font-family: ${({theme}) => theme.fonts.regular};
  color: ${({theme}) => theme.colors.text};
  background-color: ${({theme}) => theme.colors.white};
`;

export const SearchButton = styled.Pressable`
  background-color: ${({theme}) => theme.colors.secondary};
  
  height: 100%;
  width: 55px;

  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;

  align-items: center;
  justify-content: center;
`;

export const SearchIcon = styled(AntDesign)`
  color: ${({theme}) => theme.colors.black};
`;

export const Secrets = styled.View`
  flex: 1;
  margin-top: 32px;
  
  padding: 0 24px;
`;

export const SecretHeader = styled.View`
  width: 100%;
  margin-bottom: 18px;
  
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;


export const SecretCardList = styled.FlatList`
  padding-bottom: 20px;
`;