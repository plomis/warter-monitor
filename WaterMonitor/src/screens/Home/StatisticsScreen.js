
import React from 'react';
import { NavigationEvents } from 'react-navigation';
import { SafeAreaView, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { connect } from '../../utils/plodux';


function Screen({ dispatch }) {

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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollview: {
    flex: 1
  }
});

export default connect()( Screen );
