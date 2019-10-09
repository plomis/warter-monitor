
import React from 'react';
import IconSvg from '../../components/IconSvg';
import TabIcon1 from '../../assets/svg/tab_1.svg';
import TabIcon2 from '../../assets/svg/tab_2.svg';
import TabIcon3 from '../../assets/svg/tab_3.svg';
import TabIcon4 from '../../assets/svg/tab_4.svg';
import TabIcon5 from '../../assets/svg/tab_5.svg';
import TabIconFill1 from '../../assets/svg/tab_1_fill.svg';
import TabIconFill2 from '../../assets/svg/tab_2_fill.svg';
import TabIconFill3 from '../../assets/svg/tab_3_fill.svg';
import TabIconFill4 from '../../assets/svg/tab_4_fill.svg';
import TabIconFill5 from '../../assets/svg/tab_5_fill.svg';


export const Home = {
  tabBarLabel: '总览',
  tabBarIcon({ focused, tintColor }) {
    return (
      <IconSvg
        size={25}
        name={focused ? TabIconFill1 : TabIcon1}
        color={tintColor} />
    );
  }
};

export const Measure = {
  tabBarLabel: '计量',
  tabBarIcon({ focused, tintColor }) {
    return (
      <IconSvg
        size={25}
        name={focused ? TabIconFill2 : TabIcon2}
        color={tintColor} />
    );
  }
};

export const News = {
  tabBarLabel: '文化',
  tabBarIcon({ focused, tintColor }) {
    return (
      <IconSvg
        size={25}
        name={focused ? TabIconFill3 : TabIcon3}
        color={tintColor} />
    );
  }
};

export const Statistics = {
  tabBarLabel: '统计',
  tabBarIcon({ focused, tintColor }) {
    return (
      <IconSvg
        size={25}
        name={focused ? TabIconFill4 : TabIcon4}
        color={tintColor} />
    );
  }
};

export const Profile = {
  tabBarLabel: '我的',
  tabBarIcon({ focused, tintColor }) {
    return (
      <IconSvg
        size={25}
        name={focused ? TabIconFill5 : TabIcon5}
        color={tintColor} />
    );
  }
};
