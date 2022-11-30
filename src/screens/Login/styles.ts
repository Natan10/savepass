import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;

  justify-content: center;
  align-items: center;
`;

export const Button = styled.TouchableOpacity`
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
  color: ${({theme}) => theme.colors.white};
`;
