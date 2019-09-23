
import React from 'react';
import { createAppContainer, ThemeContext } from 'react-navigation';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import MeasureScreen from './MeasureScreen';
import StatisticsScreen from './StatisticsScreen';
import ProfileScreen from './ProfileScreen';
import NewsScreen from './NewsScreen';
import HomeScreen from './HomeScreen';
import { Home, News, Statistics, Measure, Profile } from './navigationOptions';
import { ThemeConstants } from '../../components/constants';


class ThemedBottomTabBar extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {( theme ) => (
          <BottomTabBar
            {...this.props}
            activeTintColor={ThemeConstants[theme].activeTintColor}
            inactiveTintColor={ThemeConstants[theme].inactiveTintColor}
            style={{
              alignItems: 'center',
              backgroundColor: ThemeConstants[theme].backgroundColor,
              borderTopColor: ThemeConstants[theme].borderTopColor,
              borderTopWidth: 1
            }}
            tabStyle={{
              paddingTop: 5,
              paddingBottom: 4
            }}
            labelStyle={{
              fontSize: 10,
              paddingTop: 2
            }}
          />
        )}
      </ThemeContext.Consumer>
    );
  }
}


HomeScreen.navigationOptions = Home;
MeasureScreen.navigationOptions = Measure;
StatisticsScreen.navigationOptions = Statistics;
ProfileScreen.navigationOptions = Profile;
NewsScreen.navigationOptions = News;


const TabBar = createBottomTabNavigator({
  Home: HomeScreen,
  Measure: MeasureScreen,
  News: NewsScreen,
  Statistics: StatisticsScreen,
  Profile: ProfileScreen
}, {
  tabBarComponent: ThemedBottomTabBar
});


export default TabBar;
