import React, { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { getBottomSpace } from 'react-native-iphone-x-helper';


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
import { SecretCard, SecretCardData } from '../../components/SecretCard';


const storageKey = '@savePass:items';

export const Home = () => {
  const [savePassItems, setSavePassItems] = useState<SecretCardData[]>([]);
  const [filterSavePassItems, setFilterSavePassItems] = useState<SecretCardData[]>([]);

  const theme = useTheme();
  const navigation = useNavigation();

  const handleAddNewSavePass = () => {
    navigation.navigate('RegisterSavePass');
  }

  const loadSavePassItems = async () => {
    try {
      const data = await AsyncStorage.getItem(storageKey);
      const newData = data ? JSON.parse(data) : []; 
      
      setSavePassItems(newData);
      setFilterSavePassItems(newData);
    } catch (error) {
      console.log(error);
      Alert.alert('Erro ao carregar informações');
    }
  }

  const filterSavePassItem = (text: string) => {
    if(!text) {
      setFilterSavePassItems([...savePassItems]);
    }
    
    const filter = savePassItems.filter(pass => 
      pass.service.toUpperCase().includes(text.toUpperCase())
    );
    setFilterSavePassItems([...filter]);
  }

  useFocusEffect(
    useCallback(() => {
      loadSavePassItems();
    },[])
  );

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
        <Button activeOpacity={0.5} onPress={handleAddNewSavePass}>
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
          onChangeText={filterSavePassItem}
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
            {filterSavePassItems.length > 1 ? `${filterSavePassItems.length} items`: `${filterSavePassItems.length} item`}
          </Text>
        </SecretHeader>
        
        <SecretCardList 
          data={filterSavePassItems}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item: any) => item.id}
          contentContainerStyle={{
            paddingBottom: getBottomSpace()
          }}
          renderItem={({item}: any) => (
            <SecretCard 
              data={{
                id: item.id,
                user: item.user,
                service: item.service,
                password: item.password
              }}
            />
          )}
        />

      </Secrets>
    </Container>
  );
}

// filtro 
// placeholder no load
// github provider login
// delete ao scroll