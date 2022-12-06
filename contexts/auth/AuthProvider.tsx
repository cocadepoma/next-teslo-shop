import { FC, ReactNode, useEffect, useReducer } from 'react';

import Cookies from 'js-cookie';

import { tesloApi } from '../../api';

import { AuthContext, authReducer } from '.';
import { IUser } from '../../interfaces';
import axios from 'axios';

interface Props {
  children: ReactNode;
}

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  useEffect(() => {
    checkToken();
  }, [])

  const checkToken = async () => {
    const token = Cookies.get('token');

    if (!token) return;

    try {
      const { data } = await tesloApi.get('/user/validate-token');
      const { token, user } = data;

      Cookies.set('token', token);
      dispatch({ type: '[Auth] - Login', payload: user });
    } catch (error) {
      Cookies.remove('token');
    }
  };

  const loginUser = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data } = await tesloApi.post('/user/login', { email, password });
      const { token, user } = data;

      Cookies.set('token', token);
      dispatch({ type: '[Auth] - Login', payload: user });
      return true;
    } catch (error) {
      return false;
    }
  };

  const registerUser = async (email: string, password: string, name: string): Promise<{ hasError: boolean; message?: string; }> => {
    try {
      const { data } = await tesloApi.post('/user/register', { email, password, name });
      const { token, user } = data;

      Cookies.set('token', token);
      dispatch({ type: '[Auth] - Login', payload: user });
      return {
        hasError: false,
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data
        }
      }

      return {
        hasError: true,
        message: 'An error occured while registering'
      }
    }
  };

  return (
    <AuthContext.Provider value={{
      ...state,

      loginUser,
      registerUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}