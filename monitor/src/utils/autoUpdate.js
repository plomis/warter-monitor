
import React from 'react';
import codePush from 'react-native-code-push';
import DeviceInfo from 'react-native-device-info';
import { Platform, Linking, Alert, NativeModules } from 'react-native';
import { getAppstoreAppVersion } from 'react-native-appstore-version-checker';
import { UPDATE_URL } from '../components/constants';
import compare from './compareVersion';


function withUpdate( Component ) {

  class Wrapped extends React.Component {

    componentDidMount() {
      this.handleUpdate();
      this.syncImmediate();
    }

    handleUpdate = () => {
      if ( Platform.OS === 'ios' ) {
        const appId = '1481037525';
        getAppstoreAppVersion( appId ).then( async ( latest ) => {
          const version = await DeviceInfo.getVersion();
          if ( compare( latest, version, 2 ) > 0 ) {
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
          }
        }).catch(() => {
          // do nothings
        });
      } else if ( Platform.OS === 'android' ) {
        fetch( `${UPDATE_URL}?v=${+ new Date()}` ).then( res => res.json()).then( async ({ latest, downloadUrl }) => {
          const version = await DeviceInfo.getVersion();
          if ( compare( latest, version, 3 ) > 0 ) {
            Alert.alert(
              '',
              '发现新版本，是否立即更新？',
              [
                { text: '取消', style: 'cancel' },
                {
                  text: '立即下载',
                  onPress() {
                    NativeModules.DownloadApk.downloading(
                      downloadUrl,
                      '长江委节水',
                      `water-monitor-${latest}.apk`
                    );
                  }
                }
              ]
            );
          }
        }).catch(() => {
          // do nothings
        });
      }
    };

    syncImmediate() {
      codePush.disallowRestart();
      codePush.sync({ installMode: codePush.InstallMode.ON_NEXT_RESUME }, this.codePushStatusDidChange );
    }

    codePushStatusDidChange = ( syncStatus ) => {
      switch( syncStatus ) {
        case codePush.SyncStatus.UPDATE_INSTALLED:
        case codePush.SyncStatus.UP_TO_DATE:
        case codePush.SyncStatus.UPDATE_IGNORED:
        case codePush.SyncStatus.UNKNOWN_ERROR:
          codePush.allowRestart();
          break;
      }
    };

    render() {
      return (
        <Component {...this.props} />
      );
    }
  }

  return codePush({ checkFrequency: codePush.CheckFrequency.ON_APP_RESUME })( Wrapped );
}

export default withUpdate;
