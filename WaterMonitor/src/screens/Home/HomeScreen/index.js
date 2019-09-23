
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import AnimatedScrollView from '../../../components/AnimatedScrollView';
import IconSvg from '../../../components/IconSvg';
import IconWithBadge from '../../../components/IconWithBadge';
import scan from '../../../assets/svg/scan.svg';
import message from '../../../assets/svg/message.svg';
import { connect } from '../../../utils/plodux';
import Banner from './Banner';
import IndexBlock from './IndexBlock';
import ChartBlock from './ChartBlock';
import MapBlock from './MapBlock';
import RuleBlock from './RuleBlock';


const BANNER_HEIGHT = 400;

function Screen({ dispatch }) {

  const statusBarHeight = getStatusBarHeight();
  const title = '总览';
  const handleDidFocus = () => {
    dispatch({
      type: 'statusBar.update',
      payload: {
        barStyle: 'light-content'
      }
    });
  };

  return (
    <View style={styles.container}>
      <NavigationEvents onDidFocus={handleDidFocus} />
      <AnimatedScrollView
        title={title}
        headerLeft={<IconSvg name={scan} color="#fff" size={28} />}
        headerRight={<IconWithBadge component={IconSvg} name={message} color="#fff" size={28} />}
        onLeftPress={() => {console.log('left')}}
        onRightPress={() => {console.log('right')}}
        style={styles.scrollView}
        headerHeight={BANNER_HEIGHT}>
        <Banner statusBarHeight={statusBarHeight} bannerHeight={BANNER_HEIGHT} />
        <IndexBlock data={{ 'a': 29.90, 'b': 29.90, 'c': 29.90, 'd': 29.90, 'e': 29.90, 'f': 29.90 }} />
        <ChartBlock />
        <MapBlock />
        <RuleBlock data={[{
          title: '用水设备巡回检查制度',
          date: '2019-02-01'
        }, {
          title: '用水计量制度',
          date: '2019-02-01'
        }, {
          title: '节水管理岗位责任规划',
          date: '2019-02-01'
        }, {
          title: '节水管理岗位责任规划',
          date: '2019-02-01'
        }]} />
      </AnimatedScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    flex: 1
  }
});


export default connect()( Screen );
