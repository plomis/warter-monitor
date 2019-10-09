
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
  const handleWillFocus = () => {
    dispatch({
      type: 'statusBar.update',
      payload: {
        barStyle: 'light-content'
      }
    });
  };

  const handleMessage = () => {
    navigation.navigate( 'Message' );
  };

  const handleCamera = () => {
    Alert.alert( '敬请期待！' );
  };

  const handleQrcode = async () => {
    if ( Platform.OS === 'ios' ) {
      const result = await check( PERMISSIONS.IOS.CAMERA );
      if ( result === RESULTS.DENIED ) {
        const rs = await request( PERMISSIONS.IOS.CAMERA );
        if ( rs === RESULTS.GRANTED ) {
          handleCamera();
        }
      }
    }
    if ( Platform.OS === 'android' ) {
      handleCamera();
    }
  };

  const handleFetch = () => {
    dispatch({ type: 'home.getData' });
  };

  useEffect( handleFetch, []);

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={handleWillFocus} />
      <AnimatedScrollView
        title={title}
        refreshing={data !== null && loading}
        onRefresh={handleFetch}
        headerLeft={<IconSvg name={scan} color="#fff" size={28} />}
        headerRight={<IconWithBadge component={IconSvg} name={message} color="#fff" size={28} />}
        onLeftPress={handleQrcode}
        onRightPress={handleMessage}
        style={styles.scrollView}
        headerHeight={BANNER_HEIGHT}>
        <Banner data={data ? data.useGeneral : {}} statusBarHeight={statusBarHeight} bannerHeight={BANNER_HEIGHT} />
        <IndexBlock data={data ? data.useGeneral : {}} />
        <ChartBlock data={data || {}} />
        <MapBlock />
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
  }
});


export default connect(({ home }) => {
  return {
    loading: home.loading,
    data: home.data
  };
})( Screen );
