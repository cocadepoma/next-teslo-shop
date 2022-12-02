import { FC, ReactNode, useReducer } from 'react';
import { UIContext, uiReducer } from '.';

export interface Props {
  children: ReactNode;
}

export interface UIState {
  isMenuOpen: boolean;
}

const UI_INITIAL_STATE: UIState = {
  isMenuOpen: false
}

export const UIProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const toogleSideMenu = () => {
    dispatch({ type: '[UI] Toggle-Menu' });
  }

  return (
    <UIContext.Provider value={{
      ...state,
      toogleSideMenu
    }}>
      {children}
    </UIContext.Provider>
  )
}