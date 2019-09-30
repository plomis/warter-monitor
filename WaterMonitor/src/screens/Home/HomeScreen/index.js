
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Toast } from '@ant-design/react-native';
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
        onLeftPress={() => { Toast.info( '敬请期待！' ) }}
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
