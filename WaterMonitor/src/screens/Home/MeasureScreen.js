
import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';


class Screen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>建设中...</Text>
      </View>
    );
  }
}


export default createStackNavigator({
  Home: Screen
}, {
  initialRouteName: 'Home'
});
