
import React from 'react';
import { NavigationEvents } from 'react-navigation';
import { Text, View, SafeAreaView, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack';
import { connect } from '../../utils/plodux';


function Info({ dispatch, navigation }) {

  // const { state } = navigation;
  // const { params } = state;

  const handleWillFocus = () => {
    dispatch({
      type: 'statusBar.update',
      payload: {
        barStyle: 'dark-content'
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  );
}

Info.navigationOptions = ({ navigation }) => {
  const title = navigation.getParam( 'title' );
  return {
    title: title,
    headerLeft: <HeaderBackButton onPress={navigation.goBack} />
  };
};

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

const Measure = createStackNavigator({
  Info: {
    screen: connect()( Info )
  }
});

export default Measure;
