import { createContext, ReactNode, useContext, useState } from 'react';
import { Alert } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import axios from 'axios';

interface AuthContextProps {
  signIn: () => Promise<void>;
  user: User;
  signInLoad: boolean;
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

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthContextWrapper = ({children}: AuthContextWrapperProps) => {
  const [user, setUser] = useState({} as User);
  const [signInLoad, setSignInLoad] = useState(false);

  const { GITHUB_URI_AUTH } = process.env; 
  const { GITHUB_CLIENT_ID } = process.env; 
  const { GITHUB_CLIENT_SECRET } = process.env; 
  const { REDIRECT_URI } = process.env; 

  const signIn = async () => {
    setSignInLoad(true);

    try {
      const authUrl = `${GITHUB_URI_AUTH}?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=read:user`; 
      const response = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse;

      if(response.type === 'success') {
        const getAccessTokenUrl = 
          `https://github.com/login/oauth/access_token?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&redirect_uri=${REDIRECT_URI}&code=${response.params.code}`;

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
    } finally {
      setSignInLoad(false);
    }
  }

  return(
    <AuthContext.Provider value={{
      user,
      signIn,
      signInLoad
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
}
