
import React from 'react';
import { Button, Text, View } from 'react-native';
import { ThemeContext } from 'react-navigation';
import { connect } from '../../utils/plodux';


class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
        <Button
          title="Go to Settings"
          onPress={() => this.props.navigation.navigate('Settings')} />
        <Button
          title="Set Dark"
          onPress={() => this.props.dispatch({ type: 'theme.update', payload: { mode: 'dark' } })}
        />
        <Button
          title="Toggle StatusBar"
          onPress={() => this.props.dispatch({ type: 'statusBar.toggle' })}
        />
      </View>
    );
  }
}

export default connect()( HomeScreen );
