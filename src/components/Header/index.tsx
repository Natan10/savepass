import { AntDesign } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import {
  Container,
  UserContainer,
  UserPhoto,
  UserInfo,
  Title,
  Bold,
  Subtitle,
  Button
} from './styles';

interface Props {
  addNewSavePass: () => void;
}

export const Header = ({addNewSavePass}: Props) => {
  const theme = useTheme();

  return(
    <Container>
      <UserContainer>
        <UserPhoto
          resizeMode='cover'
          source={{
            uri: 'https://doodleipsum.com/700/avatar?bg=FF3C3C&i=3cdf1e1375692dbe37689851492c2957'
          }} 
        />
        <UserInfo>
          <Title numberOfLines={1}>
            Olá, <Bold>Natanael</Bold>
          </Title>
          <Subtitle>Sinta-se seguro aqui</Subtitle>
        </UserInfo>
      </UserContainer>
      <Button activeOpacity={0.5} onPress={addNewSavePass}>
        <Subtitle>
          <AntDesign name="plus" size={16} color={theme.colors.white}/>
        </Subtitle>
      </Button>
    </Container>
  )
}