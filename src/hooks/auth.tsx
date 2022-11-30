import { createContext, ReactNode, useContext, useState } from 'react';
import { Alert } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import axios from 'axios';

interface AuthContextProps {
  signIn: () => Promise<void>;
  user: User;
}

interface AuthContextWrapperProps {
  children: ReactNode;
}

interface AuthorizationResponse {
  params: {
    code: string;
  },
  type: string;
}

interface TokenInfoResponse {
  access_token: string;
  scope: string;
  token_type: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

const url = 'https://github.com/login/oauth/authorize';
const client_id = '7352dd672ffbb8de0a7c';
const client_secret = 'c7ccbbb14c1fccdbdcae287db03325b503157d20';
const redirect_uri = 'https://auth.expo.io/@natanmoreira/savepass';

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthContextWrapper = ({children}: AuthContextWrapperProps) => {
  const [user, setUser] = useState({} as User);

  const signIn = async () => {
    try {
      const authUrl = `${url}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=read:user`; 
      const response = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse;

      if(response.type === 'success') {
        const getAccessTokenUrl = 
          `https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}&code=${response.params.code}`;

        const { data } = await axios.post<TokenInfoResponse>(getAccessTokenUrl, {}, {
          headers: {
            Accept: 'application/json'
          }
        });
        
        const { data: userInfo } = await axios.get('https://api.github.com/user', {
          headers: {
            authorization: `Bearer ${data.access_token}`
          }
        });

        setUser({
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.name,
          avatar: userInfo.avatar_url 
        });
      }
    
    } catch (error) {
      console.error(error);
      Alert.alert('Erro ao realizar login com o Github');
    }
  }

  return(
    <AuthContext.Provider value={{
      user,
      signIn
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
}
// client-id -> 7352dd672ffbb8de0a7c
// secret -> c7ccbbb14c1fccdbdcae287db03325b503157d20