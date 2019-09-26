
import { ThemeColors } from 'react-navigation';

export const HEADER_HEIGHT = 44;
export const HEADER_LARGE_HEIGHT = 88;
export const ACTIVE_OPACITY = 0.5
;

export const ThemeConstants = {
  light: {
    backgroundColor: '#fff',// 'rgb(245, 245, 245)',
    activeTintColor: 'rgb(51, 163, 244)',
    inactiveTintColor: 'rgb(148, 148, 148)',
    borderTopColor: 'rgb(221, 221, 221)'
  },
  dark: {
    backgroundColor: ThemeColors.dark.header,
    activeTintColor: '#fff',
    inactiveTintColor: '#7f7f7f',
    borderTopColor: ThemeColors.dark.headerBorder
  },
};
