import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.bg};
`;

export const Header = styled.View`
  background-color: ${({theme}) => theme.colors.white};
  padding: ${getStatusBarHeight(true) + 9}px 0 23px 0;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const HeaderGoButton = styled.Pressable`
  position: absolute;
  left: 13px;
  bottom: 23px;
`;

export const HeaderTitle = styled.Text`
  font-size: 18px;
  font-family: ${({theme}) => theme.fonts.medium};
  color: ${({theme}) => theme.colors.text};
`;

export const Form = styled.View`
  padding: 0 24px;
  margin-top: 32px;
`;

export const SaveButton = styled.TouchableOpacity`
  height: 55px;
  width: 100%;
  margin-bottom: 12px;

  align-items: center;
  justify-content: center;

  border-radius: 5px;
  background-color: ${({theme}) => theme.colors.secondary};

`;

export const Title = styled.Text`
  font-size: 16px;
  font-family: ${({theme}) => theme.fonts.medium};
  color: ${({theme}) => theme.colors.text};
`;
