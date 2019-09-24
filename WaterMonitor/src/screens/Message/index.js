
import React from 'react';
import { NavigationEvents } from 'react-navigation';
import { Text, View, SafeAreaView, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack';
import { connect } from '../../utils/plodux';


function MessageHome({ dispatch }) {

  const handleWillFocus = () => {
    dispatch({
      type: 'statusBar.update',
      payload: {
        barStyle: 'dark-content'
      }
    });
  };

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={handleWillFocus} />
      <ScrollView
        style={styles.scrollview}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={() => {}} />
        }>
        <Text style={styles.text}>1231313</Text>
        <Text style={styles.text}>1231313</Text>
        <Text style={styles.text}>1231313</Text>
        <Text style={styles.text}>1231313</Text>
        <Text style={styles.text}>1231313</Text>
        <Text style={styles.text}>1231313</Text>
        <Text style={styles.text}>1231313</Text>
        <Text style={styles.text}>1231313</Text>
        <Text style={styles.text}>1231313</Text>
        <Text style={styles.text}>1231313</Text>
        <Text style={styles.text}>1231313</Text>
        <Text style={styles.text}>1231313</Text>
        <Text style={styles.text}>1231313</Text>
        <Text style={styles.text}>1231313</Text>
        <Text style={styles.text}>1231313</Text>
        <Text style={styles.text}>1231313</Text>
        <Text style={styles.text}>1231313</Text>
        <Text style={styles.text}>1231313</Text>
        <Text style={styles.text}>1231313</Text>
        <Text style={styles.text}>1231313</Text>
      </ScrollView>
    </View>
  );
}

MessageHome.navigationOptions = ({ navigation }) => ({
  title: '消息告警',
  headerLeft: <HeaderBackButton onPress={navigation.goBack} />
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollview: {
    flex: 1
  },
  text: {
    fontSize: 50
  }
});

const Message = createStackNavigator({
  MessageHome: {
    screen: connect()( MessageHome )
  }
});

export default Message;
