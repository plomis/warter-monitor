
import React from 'react';
import { HEADER_HEIGHT, HEADER_LARGE_HEIGHT } from '../constants';


export const contextValue = {
  HEADER_HEIGHT,
  HEADER_LARGE_HEIGHT
};

export const Context = React.createContext( contextValue );
