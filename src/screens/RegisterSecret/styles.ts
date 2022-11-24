import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.bg};

  justify-content: center;

`;

export const Form = styled.View`
  padding: 0 24px;
`;

export const SaveButton = styled.TouchableOpacity`
  height: 55px;
  width: 100%;

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