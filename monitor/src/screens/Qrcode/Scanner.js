
import React, { useState } from 'react';
import { NavigationEvents } from 'react-navigation';
import { QRScannerView } from 'react-native-qrcode-scanner-view';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Icon } from '@ant-design/react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { ACTIVE_OPACITY, HEADER_HEIGHT, HOST } from '../../components/constants';
import { connect } from '../../utils/plodux';


function Scanner({ dispatch, navigation }) {

  const [ blur, setBlur ] = useState( false );
  const statusBarHeight = getStatusBarHeight();

  handleDidBlur = () => {
    setBlur( true );
  };

  const handleWillFocus = () => {
    setBlur( false );
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
    } else {
      Alert.alert(
        '',
        '您扫描的二维码不正确！',
        [
          {
            text: '知道了',
            style: 'cancel'
          },
        ]
      );
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
      <NavigationEvents onWillFocus={handleWillFocus} onDidBlur={handleDidBlur} />
      {/* <RNCamera
        style={styles.scaner}
        type={RNCamera.Constants.Type.back}
        // flashMode={RNCamera.Constants.FlashMode.on}
          // androidCameraPermissionOptions={{
          //   title: 'Permission to use camera',
          //   message: 'We need your permission to use your camera',
          //   buttonPositive: 'Ok',
          //   buttonNegative: 'Cancel',
          // }}
          // androidRecordAudioPermissionOptions={{
          //   title: 'Permission to use audio recording',
          //   message: 'We need your permission to use your audio',
          //   buttonPositive: 'Ok',
          //   buttonNegative: 'Cancel',
          // }}
        /> */}
      {!blur ? (
        <QRScannerView
          onScanResult={handleScan}
          rectStyle={styles.rectStyle}
          cornerStyle={styles.cornerStyle}
          scanBarStyle={styles.scanBarStyle}
          renderHeaderView={renderHeader}
          style={styles.scaner} />
      ) : null}
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
