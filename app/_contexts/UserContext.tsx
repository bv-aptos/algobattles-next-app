"use client"
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import router from 'next/router'
import { checkAuthStatus, retrieveUserInfo } from '../_helpers/authHelpers';

interface User {
  email: string;
  username: string;
  preferredLanguage: string;
  avatar: string;
  UID: string;
}

interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

interface UserProviderProps {
  children: ReactNode;
}

const defaultUserContext: UserContextType = {
  user: {
    email: '',
    username: '',
    preferredLanguage: '',
    avatar: '',
    UID: '',
  },
  setUser: () => {},
};

export const UserContext = createContext<UserContextType>(defaultUserContext);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(defaultUserContext.user);

  useEffect(() => {
    const getUserInfo = async () => {
      if (!user.UID) {
        const loggedIn = await checkAuthStatus(user, setUser);
        if (!loggedIn) {
          router.push('/')
          return
        }
      }
      else if (user.UID && !user.username) {
        await retrieveUserInfo(user, setUser);
      }
    };
    getUserInfo();
  }, [user])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};