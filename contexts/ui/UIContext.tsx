import { createContext } from 'react';

interface UIContextProps {
  isMenuOpen: boolean;

  toogleSideMenu: () => void;
}

export const UIContext = createContext({} as UIContextProps);