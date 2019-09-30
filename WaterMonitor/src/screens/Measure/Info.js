
import is from 'whatitis';
import moment from 'moment';
import React, { useEffect } from 'react';
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


function MeasureInfo({ dispatch, navigation, loading, info }) {

  const infoData = navigation.getParam( 'data' );
  const { title, dosage, unit, onLine, isDebug, lastDataTime } = info || infoData;

  const handleWillFocus = () => {
    dispatch({
      type: 'statusBar.update',
      payload: {
        barStyle: 'dark-content'
      }
    });
  };

  const handleFetch = () => {
    dispatch({
      type: 'measure.getInfo',
      payload: {
        meterId: infoData.originalData.meterId
      }
    });
  };

  useEffect( handleFetch, []);

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={handleWillFocus} />
      <AnimatedScrollView
        refreshing={info && loading}
        onRefresh={handleFetch}
        style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.meter}>
            <View style={styles.online}>
              <View style={[ styles.dot, { backgroundColor: isDebug ? '#fadb14' : onLine ? '#00cc00' : '#f5222d' }]} />
              <Text style={[ styles.onlinetext, { color: isDebug ? '#fadb14' : onLine ? '#00cc00' : '#f5222d' }]}>
                {isDebug ? '调试' : onLine ? '在线' : '离线'}
              </Text>
            </View>
            <Text style={styles.name}>
              {title}
            </Text>
            <LinearGradient style={styles.led} colors={[ '#0074dd', '#1890ff' ]}>
              <Text style={styles.number}>{is.Defined( dosage ) ? dosage : '--'}</Text>
              <Text style={styles.unit}>{unit}</Text>
            </LinearGradient>
            <Text style={styles.datetime}>
              {lastDataTime || '从未上线'}
            </Text>
            <Text style={styles.updatetime}>
              {lastDataTime ? moment( lastDataTime ).fromNow() : ''}
            </Text>
          </View>
        </View>
        <HistoryBlcok navigation={navigation} />
        <Charts />
      </AnimatedScrollView>
    </View>
  );
}

MeasureInfo.navigationOptions = ({ navigation }) => {
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

const Info = createStackNavigator({
  MeasureInfoHome: {
    screen: connect(({ measure }) => {
      return {
        loading: measure.infoLoading,
        info: measure.info
      };
    })( MeasureInfo )
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
  initialRouteName: 'MeasureInfoHome',
  defaultNavigationOptions: {
    headerBackTitle: null
  }
});

export default Info;
