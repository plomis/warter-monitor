
import React from 'react';
import { NavigationEvents } from 'react-navigation';
import { QRScannerView } from 'react-native-qrcode-scanner-view';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '@ant-design/react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { ACTIVE_OPACITY, HEADER_HEIGHT, HOST } from '../../components/constants';
import { connect } from '../../utils/plodux';


function Scanner({ dispatch, navigation }) {

  const statusBarHeight = getStatusBarHeight();

  const handleWillFocus = () => {
    dispatch({
      type: 'statusBar.update',
      payload: {
        barStyle: 'light-content'
      }
    });
  };

  const handleBack = () => {
    navigation.navigate( 'Home' );
  };

  const handleScan = ( event ) => {
    if ( event.data.indexOf( `${HOST}` ) !== -1 ) {
      navigation.navigate( 'QrcodePage', {
        url: event.data
      });
    }
  };

  const renderHeader = () => {
    return (
      <View style={[ styles.header, {
        paddingTop: statusBarHeight,
        height: statusBarHeight + HEADER_HEIGHT,
        paddingTop: statusBarHeight
      }]}>
        <TouchableOpacity activeOpacity={ACTIVE_OPACITY} onPress={handleBack}>
          <Icon name="left" size={20} color="rgba(255,255,255,0.85)" style={{ marginLeft: 16 }} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={ACTIVE_OPACITY} onPress={handleBack}>
          {/* <Icon name="ellipsis" size={32} color="rgba(255,255,255,0.85)" style={{ marginRight: 16 }} /> */}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={handleWillFocus} />
      <QRScannerView
        onScanResult={handleScan}
        rectStyle={styles.rectStyle}
        cornerStyle={styles.cornerStyle}
        scanBarStyle={styles.scanBarStyle}
        renderHeaderView={renderHeader}
        style={styles.scaner} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scaner: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  scanBarStyle: {
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.85)'
  },
  cornerStyle: {
    height: 16,
    width: 16,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.85)'
  },
  rectStyle: {
    height: 280,
    width: 280,
    borderWidth: 0,
    borderColor: '#000000',
    marginBottom: 0
  }
});


export default connect()( Scanner );
