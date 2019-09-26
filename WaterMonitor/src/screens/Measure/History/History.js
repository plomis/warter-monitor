
import moment from 'moment';
import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Animated, Button,
  Easing, TouchableWithoutFeedback } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Icon } from '@ant-design/react-native';
import { ThemeContext } from 'react-navigation';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ACTIVE_OPACITY, HEADER_LARGE_HEIGHT, ThemeConstants } from '../../../components/constants';
import { connect } from '../../../utils/plodux';


const pickerHeight = 230;

function Block() {

  const theme = useContext( ThemeContext );
  const statusBarHeight = getStatusBarHeight();
  const [ selected, setSelected ] = useState( moment());
  const [ show, setShow ] = useState( false );
  const [ state ] = useState({ y: new Animated.Value( 0 ) });

  const pickerRange = state.y.interpolate({
    inputRange: [ 0, pickerHeight ],
    outputRange: [ 0, 1 ],
    extrapolate: 'clamp'
  });

  const triggerRange = pickerRange.interpolate({
    inputRange: [ 0, 1 ],
    outputRange: [ 0, -44 ]
  });

  const triggerOpacityRange = pickerRange.interpolate({
    inputRange: [ 0, 0.6 ],
    outputRange: [ 1, 0 ]
  });

  const pickerOpacityRange = pickerRange.interpolate({
    inputRange: [ 0.2, 1 ],
    outputRange: [ 0, 1 ]
  });

  const maskRange = pickerRange.interpolate({
    inputRange: [ 0.5, 1 ],
    outputRange: [ 0, 1 ]
  });

  const handleChange = ( _event, date ) => {
    setSelected( moment( date ));
  };

  const handleOpen = () => {
    if ( !show ) {
      setShow( true );
      Animated.timing(
        state.y,
        {
          duration: 400,
          toValue: pickerHeight,
          easing: Easing.inOut( Easing.quad ),
          useNativeDriver: true
        }
      ).start();
    }
  };

  const handleClose = () => {
    Animated.timing(
      state.y,
      {
        toValue: 0,
        duration: 300,
        easing: Easing.inOut( Easing.quad ),
        useNativeDriver: true
      }
    ).start(() => {
      setShow( false );
    });
  };

  const renderItem = () => {
    return (
      <View>
        <Text>asdasd</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[
        styles.pickerContainer,
        {
          top: -pickerHeight,
          height: statusBarHeight + HEADER_LARGE_HEIGHT + pickerHeight,
          backgroundColor: ThemeConstants[theme].backgroundColor,
          borderBottomColor: ThemeConstants[theme].borderTopColor,
          borderBottomWidth: 1,
          transform: [{
            translateY: state.y
          }]
        }
      ]}>
        {show ? (
          <Animated.View style={{ flex: 1, justifyContent: 'flex-end', opacity: pickerOpacityRange }}>
            <DateTimePicker
              mode="date"
              locale="zh-cn"
              display="default"
              value={new Date( selected.format( moment.HTML5_FMT.DATE ))}
              onChange={handleChange} />
            <View style={styles.pickerController}>
              <Button
                onPress={handleClose}
                title="取消" />
              <Button
                onPress={handleClose}
                title="确定" />
            </View>
          </Animated.View>
        ) : null}
      </Animated.View>
      <View style={[
        styles.pickerTrigger,
        {
          height: statusBarHeight + HEADER_LARGE_HEIGHT
        }
      ]}>
        <TouchableOpacity activeOpacity={ACTIVE_OPACITY} onPress={handleOpen}>
          <Animated.View style={[
            styles.triggerContent,
            {
              opacity: triggerOpacityRange,
              transform: [{
                translateY: triggerRange
              }]
            }
          ]}>
            <Button
              onPress={handleClose}
              title="前一天" />
            <View style={styles.triggerContentText}>
              <Icon name="calendar" color="#047FFE" size={20}/>
              <Text style={styles.pickerDate}>{selected.format( 'YYYY-MM-DD' )}</Text>
            </View>
            <Button
              onPress={handleClose}
              title="后一天" />
          </Animated.View>
        </TouchableOpacity>
      </View>
      <ScrollView style={[
        styles.scrollview,
        { marginTop: statusBarHeight + HEADER_LARGE_HEIGHT }
      ]}>
        {/* <ListView
          refreshable={false}
          onFetch={handleFetch}
          style={styles.listview}
          keyExtractor={item => item.month}
          renderItem={renderItem} /> */}
      </ScrollView>
      {show ? (
        <TouchableWithoutFeedback onPress={handleClose}>
          <Animated.View style={[ styles.mask, { opacity: maskRange }]} />
        </TouchableWithoutFeedback>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  pickerContainer: {
    flex: 0,
    justifyContent: 'flex-end',
    top: 0,
    left: 0,
    width: '100%',
    position: 'absolute',
    zIndex: 2
  },
  pickerTrigger: {
    top: 0,
    left: 0,
    flex: 0,
    width: '100%',
    position: 'absolute',
    zIndex: 3,
    justifyContent: 'flex-end'
  },
  triggerContent: {
    flex: 0,
    height: 44,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16
  },
  triggerContentText: {
    flexDirection: 'row'
  },
  pickerController: {
    height: 44,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  pickerDate: {
    marginLeft: 4,
    color: '#047FFE',
    fontSize: 16
  },
  scrollview: {
    flex: 1,
    backgroundColor: '#F1F3FD'
  },
  mask: {
    top: 0,
    left: 0,
    flex: 0,
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 1,
    opacity: 0
  },
  listview: {
    flex: 1
  }
});

Block.navigationOptions = () => {
  return {
    title: '历史数据',
    headerTransparent: true
  };
};

export default connect(({ measure }) => {
  return {
  }
})( Block );
