import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

  background-color: ${({theme}) => theme.colors.bg};
`;

export const Logo = styled.Image`
  width: 100%;
  height: 200px;
  
`;

export const Button = styled.TouchableOpacity`
  margin-top: 32px;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  background-color: ${({theme}) => theme.colors.text};

  width: 70%;
  padding: 20px 10px;

  border-radius: 5px;
`;

export const Title = styled.Text`
  margin-left: 12px;
  
  font-size: 16px;
  font-family: ${({theme}) => theme.fonts.medium};
  color: ${({theme}) => theme.colors.white};
`;
