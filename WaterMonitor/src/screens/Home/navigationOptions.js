
import React from 'react';
import { IconFill, IconOutline } from '@ant-design/icons-react-native';
import IconWithBadge from '../../components/IconWithBadge';


export const Home = {
  tabBarLabel: '总览',
  tabBarIcon({ focused, tintColor }) {
    return (
      <IconWithBadge
        size={25}
        name="home"
        color={tintColor}
        badgeCount={3}
        component={focused ? IconFill : IconOutline} />
    );
  }
};

export const Measure = {
  tabBarLabel: '计量',
  tabBarIcon({ focused, tintColor }) {
    return (
      <IconWithBadge
        size={25}
        name="calculator"
        color={tintColor}
        component={focused ? IconFill : IconOutline} />
    );
  }
};

export const News = {
  tabBarLabel: '文化',
  tabBarIcon({ focused, tintColor }) {
    return (
      <IconWithBadge
        size={25}
        name="read"
        color={tintColor}
        component={focused ? IconFill : IconOutline} />
    );
  }
};

export const Statistics = {
  tabBarLabel: '统计',
  tabBarIcon({ tintColor }) {
    return (
      <IconWithBadge
        size={25}
        name="read"
        color={tintColor}
        component={focused ? IconFill : IconOutline} />
    );
  }
};

export const Profile = {
  tabBarLabel: '我的',
  tabBarIcon({ tintColor }) {
    return (
      <IconWithBadge
        size={25}
        name="read"
        color={tintColor}
        component={focused ? IconFill : IconOutline} />
    );
  }
};
