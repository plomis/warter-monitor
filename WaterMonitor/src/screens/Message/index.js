
import React, { useEffect } from 'react';
import { NavigationEvents } from 'react-navigation';
import { Text, View, StyleSheet, SectionList, TouchableOpacity } from 'react-native';
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack';
import { SegmentedControl, Icon, Toast } from '@ant-design/react-native';
import { ACTIVE_OPACITY } from '../../components/constants';
import EmptyList from '../../components/EmptyList';
import { connect } from '../../utils/plodux';


function renderItem({ warnTypeName, isClear, warnDateTime, warnContent }) {
  return (
    <View style={styles.item}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemTitle}>{warnTypeName}</Text>
        <Text style={styles.itemStatus}>{isClear ? '已消警' : '未消警'}</Text>
      </View>
      <Text style={styles.itemBody}>{warnContent}</Text>
      <View style={styles.itemFoot}>
        <Text style={styles.itemDatetime}>{warnDateTime}</Text>
      </View>
    </View>
  );
}


const Segment = connect(({ message }) => {
  return {
    pageSize: message.pageSize,
    isClear: message.isClear
  };
})(({ isClear, pageSize, dispatch }) => {
  return (
    <SegmentedControl
      style={styles.segment}
      selectedIndex={isClear === '' ? 2 : isClear}
      values={[ '未消警', '已消警', '全部' ]} // 0 , 1, ''
      tintColor="#047FFE"
      onChange={( e ) => {
        dispatch({
          type: 'message.refresh',
          payload: {
            filter: '',
            isClear: e.nativeEvent.selectedSegmentIndex === 2 ? '' : e.nativeEvent.selectedSegmentIndex,
            pageIndex: 1,
            pageSize
          }
        });
      }} />
  );
});


const ListFooter = connect(({ message }) => {
  return {
    loading: message.listLoading,
    pageSize: message.pageSize,
    pageLimit: message.pageLimit
  };
})(({ loading, pageSize, pageLimit }) => {
  return (
    <View style={styles.listFooter}>
      <Text style={{ color: 'rgba(0,0,0,0.4)' }}>
        {pageSize > pageLimit ? '没有更多数据' : loading ? '加载数据...' : ''}
      </Text>
    </View>
  );
})

function MessageHome({ dispatch, listLoading, list, pageIndex, pageSize, isClear }) {

  const handleWillFocus = () => {
    dispatch({
      type: 'statusBar.update',
      payload: {
        barStyle: 'dark-content'
      }
    });
  };

  const handleFetch = ( page = 1 ) => async () => {
    dispatch({
      type: page === 1 ? 'message.refresh' : 'message.getList',
      payload: {
        filter: '',
        isClear,
        pageIndex: page,
        pageSize
      }
    });
  };

  useEffect(() => {
    handleFetch()();
  }, [isClear]);

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={handleWillFocus} />
      <SectionList
        sections={list}
        refreshing={pageIndex === 1 && listLoading}
        onRefresh={handleFetch()}
        stickySectionHeadersEnabled={false}
        style={styles.scrollview}
        keyExtractor={( item ) => item.warnId}
        renderItem={({ item }) => renderItem( item )}
        onEndReached={handleFetch( pageIndex + 1 )}
        ListFooterComponent={ListFooter}
        ListEmptyComponent={!listLoading ? EmptyList : null}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{title}</Text>
          </View>
        )} />
    </View>
  );
}

MessageHome.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: <Segment />,
    headerLeft: <HeaderBackButton onPress={navigation.goBack} />,
    headerRight: (
      <TouchableOpacity activeOpacity={ACTIVE_OPACITY} onPress={() => {
        // navigation.navigate( 'search' );
        Toast.info( '敬请期待！' );
      }}>
        <Icon name="search" color="#047FFE" size={24} />
      </TouchableOpacity>
    ),
    headerRightContainerStyle: { paddingRight: 16 }
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollview: {
    flex: 1
  },
  item: {
    backgroundColor: '#F2F2F2',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 6
  },
  itemHeader: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  itemTitle: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.7)'
  },
  itemBody: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
    color: 'rgba(0,0,0,0.9)'
  },
  itemFoot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  itemDatetime: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.5)'
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 16,
    paddingBottom: 8
  },
  headerTitle: {
    fontSize: 12,
    height: 24,
    lineHeight: 24,
    color: '#5159F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(81, 89, 245, 0.2)'
  },
  segment: {
    width: 180
  },
  listFooter: {
    height: 64,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const Message = createStackNavigator({
  MessageHome: {
    screen: connect(({ message }) => {
      return {
        list: message.list,
        listLoading: message.listLoading,
        pageIndex: message.pageIndex,
        pageLimit: message.pageLimit,
        pageSize: message.pageSize,
        isClear: message.isClear
      };
    })( MessageHome )
  }
}, {
  initialRouteName: 'MessageHome'
});

export default Message;
