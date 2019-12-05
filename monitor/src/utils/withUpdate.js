
import React, { Fragment } from 'react';
import DeviceInfo from 'react-native-device-info';
import { Platform, Linking, Alert } from 'react-native';
import { getAppstoreAppMetadata } from 'react-native-appstore-version-checker';
import { ActivityIndicator } from '@ant-design/react-native';
import { UPDATE_URL } from '../components/constants';
import compare from './compareVersion';


function withUpdate( Component ) {

  class Wrapped extends React.Component {

    state = {
      loading: false
    };

    handleUpdate = () => {
      if ( Platform.OS === 'ios' ) {
        const appId = '1485211538';
        this.setState({ loading: true });
        getAppstoreAppMetadata( appId ).then( async ( data ) => {
          const latest = data.version;
          const version = await DeviceInfo.getVersion();
          if ( compare( latest, version, 3 ) > 0 ) {
            Alert.alert( '', '应用有新的更新', [{
              text: 'OK', style: 'cancel', onPress: () => {
                Linking
                  .openURL( `itms-apps://itunes.apple.com/cn/app/id${appId}` )
                  .catch( err => {
                    Alert.alert(
                      '错误',
                      err.toString(),
                      [{ text: 'OK', style: 'cancel' }]
                    );
                  });
              }
            }]);
          } else {
            Alert.alert(
              '',
              '当前为最新版本',
              [
                { text: '知道了', style: 'cancel' }
              ]
            );
          }
        }).catch(( err ) => {
          Alert.alert(
            '',
            err.toString() || '网络请求失败！',
            [{ text: '知道了', style: 'cancel' }]
          );
        }).finally(() => {
          this.setState({ loading: false });
        });
      } else if ( Platform.OS === 'android' ) {
        this.setState({ loading: true });
        fetch( `${UPDATE_URL}?v=${+ new Date()}` ).then( res => res.json()).then( async ({ androidLatest, android }) => {
          const version = await DeviceInfo.getVersion();
          if ( compare( androidLatest, version, 3 ) > 0 ) {
            Alert.alert(
              '',
              '发现新版本，是否立即更新？',
              [
                { text: '取消', style: 'cancel' },
                {
                  text: '立即下载',
                  onPress() {
                    NativeModules.DownloadApk.downloading(
                      android,
                      '长江委节水',
                      `water-monitor-${androidLatest}.apk`
                    );
                  }
                }
              ]
            );
          } else {
            Alert.alert(
              '',
              '当前为最新版本',
              [
                { text: '知道了', style: 'cancel' }
              ]
            );
          }
        }).catch(() => {
          Alert.alert(
            '',
            '网络请求失败！',
            [{ text: '知道了', style: 'cancel' }]
          );
        }).finally(() => {
          this.setState({ loading: false });
        });
      }
    };

    render() {

      const { loading } = this.state;

      return (
        <Fragment>
          <Component {...this.props} checkUpdate={this.handleUpdate} />
          {loading ? <ActivityIndicator toast text="正在加载" /> : null}
        </Fragment>
      );
    }
  }

  return Wrapped;
}

export default withUpdate;
