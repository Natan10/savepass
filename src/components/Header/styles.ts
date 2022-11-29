import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  width: 100%;
  height: 180px;
  background-color: ${({theme}) => theme.colors.primary};

  padding-top: ${getStatusBarHeight()}px;
  padding: 0px 24px;
  
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;


export const UserContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const UserPhoto = styled.Image`
  width: 55px;
  height: 55px;
  border-radius: 5px;
`;

export const UserInfo = styled.View`
  max-width: 200px;

  margin-left: 12px;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.white};
  font-size: 16px;
  font-family: ${({theme}) => theme.fonts.light};
`;

export const Bold = styled.Text`
  font-family: ${({theme}) => theme.fonts.bold};
`;

export const Subtitle = styled.Text`
  color: ${({theme}) => theme.colors.white};
  font-family: ${({theme}) => theme.fonts.light};
`;

export const Button = styled.TouchableOpacity`
  padding: 12px;
  border: 1px solid white;
  border-radius: 5px;
`;

