import styled, {css} from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

interface SecretNameProps {
  visible: boolean;
}


export const Container = styled(LinearGradient)`
  width: 100%;
  height: 90px;
  padding: 0 24px;
  margin-bottom: 18px;

  border-radius: 5px;
  transition: all 100ms ease-in-out;

  flex-direction: row;
  align-items: center;

`;

export const ShowSecret = styled.TouchableOpacity`
  margin-right: 24px;
`;

export const SecretContent = styled.View`
  flex: 1;
`;

export const SecretName = styled.Text<SecretNameProps>`
  ${({theme, visible}) => css`
    font-size: 16px;
    font-family: ${!visible ? theme.fonts.medium : theme.fonts.regular};
    color: ${!visible ? theme.colors.text : theme.colors.text_light};
    
    margin-bottom: 4px;
  `}
`;

export const Email = styled.Text`
  font-family: ${({theme}) => theme.fonts.regular};
  color: ${({theme}) => theme.colors.text_light};
`;

export const Secret = styled.Text`
  font-size: 18px;
  font-family: ${({theme}) => theme.fonts.medium};
  color: ${({theme}) => theme.colors.primary};
`;