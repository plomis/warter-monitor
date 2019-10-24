
import React, { useEffect } from 'react';
import { View, StyleSheet, Alert, Platform } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { check, request, RESULTS, PERMISSIONS } from 'react-native-permissions';
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

function Screen({ dispatch, navigation, loading, data }) {


  const statusBarHeight = getStatusBarHeight();
  const title = '总览';

  const handleFetch = () => {
    dispatch({ type: 'home.getData' });
  };

  const handleWillFocus = () => {
    dispatch({
      type: 'statusBar.update',
      payload: {
        barStyle: 'light-content'
      }
    });
    handleFetch();
  };

  const handleMessage = () => {
    navigation.navigate( 'Message' );
  };

  const handleCamera = () => {
    navigation.navigate( 'Scanner' );
  };

  const handleQrcode = async () => {
    if ( Platform.OS === 'ios' ) {
      const result = await check( PERMISSIONS.IOS.CAMERA );
      if ( result === RESULTS.DENIED ) {
        const rs = await request( PERMISSIONS.IOS.CAMERA );
        if ( rs === RESULTS.GRANTED ) {
          handleCamera();
        }
      } else if ( result === RESULTS.GRANTED ) {
        handleCamera();
      }
    }
    if ( Platform.OS === 'android' ) {
      handleCamera();
    }
  };

  useEffect( handleFetch, []);

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={handleWillFocus} />
      <View style={[ styles.statusBarBackground, { height: statusBarHeight }]} />
      <AnimatedScrollView
        title={title}
        refreshing={data !== null && loading}
        onRefresh={handleFetch}
        statusBarHeight={0}
        headerLeft={<IconSvg name={scan} color="#fff" size={28} />}
        headerRight={<IconWithBadge dot component={IconSvg} name={message} color="#fff" size={28} badgeCount={data && data.warn ? data.warn.count : 0} />}
        onLeftPress={handleQrcode}
        onRightPress={handleMessage}
        style={styles.scrollView}
        headerHeight={BANNER_HEIGHT}>
        <Banner data={data ? data.useGeneral : {}} bannerHeight={BANNER_HEIGHT} />
        <IndexBlock data={data ? data.useGeneral : {}} />
        <ChartBlock data={data || {}} />
        <MapBlock navigation={navigation} data={data ? data.balance : null} />
        <RuleBlock data={data ? data.rule.map(({ ruleId, ruleTitle, publishDate }) => {
          return {
            key: ruleId,
            title: ruleTitle,
            date: publishDate
          };
        }) : null} />
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
  },
  statusBarBackground: {
    backgroundColor: '#6582FF'
  }
});


export default connect(({ home }) => {
  return {
    loading: home.loading,
    data: home.data
  };
})( Screen );
