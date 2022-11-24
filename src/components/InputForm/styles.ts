import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;

  margin-bottom: 22px;
`;

export const Input = styled.TextInput`
  width: 100%;
  height: 55px;
  
  padding: 12px 24px;

  border-radius: 5px;

  font-size: 16px;
  font-family: ${({theme}) => theme.fonts.regular};
  color: ${({theme}) => theme.colors.text};
  background-color: ${({theme}) => theme.colors.white};

`;


export const Label = styled.Text`
  margin-bottom: 12px;

  font-size: 18px;
  font-family: ${({theme}) => theme.fonts.regular};
  color: ${({theme}) => theme.colors.text_light};
`;

export const Error = styled.Text`
  color: ${({theme}) => theme.colors.attention};
  font-size: 14px;
  font-family: ${({theme}) => theme.fonts.light};

  margin: 7px 0px;
`;