
import { Platform } from 'react-native';
import { ThemeColors } from 'react-navigation';

export const HEADER_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
export const HEADER_LARGE_HEIGHT = 88;
export const ACTIVE_OPACITY = 0.5;
export const HOST = 'https://slcjw.oicp.vip'; // 'https://water.thingspower.com.cn'; // 'https://slcjw.oicp.vip';
export const UPDATE_URL = `${HOST}/water/monitor/app/apk/version.json`;


export const ThemeConstants = {
  light: {
    backgroundColor: '#fff', // 'rgb(245, 245, 245)',
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
