
import React from 'react';
import { NavigationEvents } from 'react-navigation';
import { Text, View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack';
import AnimatedScrollView from '../../components/AnimatedScrollViewSample';
import { connect } from '../../utils/plodux';
import Charts from './Charts';
import HistoryBlcok from './History';
import Online from './History/Online';
import History from './History/History';
import BaseInfo from './History/BaseInfo';


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
    <View style={styles.container}>
      <NavigationEvents onWillFocus={handleWillFocus} />
      <AnimatedScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.meter}>
            <View style={styles.online}>
              <View style={styles.dot} />
              <Text style={styles.onlinetext}>在线</Text>
            </View>
            <Text style={styles.name}>
              阿四大四大
            </Text>
            <LinearGradient style={styles.led} colors={[ '#0074dd', '#1890ff' ]}>
              <Text style={styles.number}>123123</Text>
              <Text style={styles.unit}>吨</Text>
            </LinearGradient>
            <Text style={styles.datetime}>
              2019-09-12 12:23:43
            </Text>
            <Text style={styles.updatetime}>
              刚刚
            </Text>
          </View>
        </View>
        <HistoryBlcok navigation={navigation} />
        <Charts />
      </AnimatedScrollView>
    </View>
  );
}

Info.navigationOptions = ({ navigation }) => {
  const title = navigation.getParam( 'title' );
  return {
    title: title,
    headerTransparent: true,
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
  header: {
    height: 320,
    alignItems: 'center',
    justifyContent: 'center'
  },
  meter: {
    backgroundColor: '#f2f2f2',
    borderWidth: 6,
    borderColor: '#99c7f1',
    borderRadius: 100,
    width: 200,
    height: 200
  },
  online: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dot: {
    flex: 0,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00cc00',
    marginRight: 8
  },
  onlinetext: {
    color: '#00cc00',
    fontSize: 12
  },
  name: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.6)',
    marginTop: 14,
    textAlign: 'center'
  },
  led: {
    height: 40,
    marginTop: 12,
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 4,
    paddingLeft: 8,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  number: {
    color: '#fff',
    fontSize: 16,
    marginRight: 4,
    fontWeight: 'bold'
  },
  unit: {
    color: '#fff',
    fontSize: 12
  },
  datetime: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.6)',
    marginTop: 12,
    textAlign: 'center'
  },
  updatetime: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.6)',
    marginTop: 12,
    textAlign: 'center'
  }
});

const Measure = createStackNavigator({
  Info: {
    screen: connect()( Info )
  },
  Online: {
    screen: Online
  },
  History: {
    screen: History
  },
  BaseInfo: {
    screen: BaseInfo
  }
}, {
  defaultNavigationOptions: {
    headerBackTitle: null
  }
});

export default Measure;
