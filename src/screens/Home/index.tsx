import React, { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, Alert } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { getBottomSpace } from 'react-native-iphone-x-helper';

import { Header } from '../../components/Header';
import { SecretCard, SecretCardData } from '../../components/SecretCard';
import { 
  Container,
  SearchContainer,
  SearchInput,
  SearchButton,
  SearchIcon,
  Secrets,
  SecretHeader,
  SecretCardList
} from './styles';

const storageKey = '@savePass:items';

export const Home = () => {
  const [load, setLoad] = useState(true);
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
    } finally {
      setLoad(false);
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
      <Header addNewSavePass={handleAddNewSavePass} />

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
          data={load ? 
            [{id: '1'} as SecretCardData,{id: '2'} as SecretCardData,{id: '3'} as SecretCardData] :
            filterSavePassItems
          }
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
                password: item.password,
                load
              }}
            />
          )}
        />
      </Secrets>
    </Container>
  );
}

// filtro - done
// placeholder no load - done
// github provider login
// delete ao scroll