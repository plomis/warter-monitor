
import React from 'react';
import { StyleSheet, View, ScrollView, FlatList } from 'react-native';
import { Table, Row, TableWrapper } from 'react-native-table-component';
import EmptyList from '../../../components/EmptyList';


function pick( row, colName ) {
  return [{ varCode: 'realDateTime' }].concat( colName ).map(({ varCode, varUnit }) => {
    return `${row[varCode]}${varUnit ? ` ${varUnit}` : ''}`;
  });
}

function renderItem( item, widthArr, headerData ) {
  return (
    <View style={styles.rowWrap}>
      <TableWrapper borderStyle={{ borderWidth: 1, borderColor: '#e8e8e8' }}>
        <Row
          data={pick( item, headerData )}
          widthArr={widthArr}
          style={styles.row}
          textStyle={styles.text} />
      </TableWrapper>
    </View>
  );
}


function TableComponent({ style, refreshing, onRefresh, onEndReached, data, headerData }) {

  const tableHead = headerData && ['时间'].concat( headerData.map(({ varName }) => varName ));
  const widthArr = headerData && [200].concat( Array( headerData.length ).fill( 100 ));

  return (
    <View style={[ styles.container, style ]}>
      {data && tableHead ? (
        <ScrollView horizontal={true}>
          <View style={{ flex: 1 }}>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#e8e8e8', zIndex: 1 }}>
              <Row data={tableHead} widthArr={widthArr} style={styles.header} textStyle={styles.text}/>
            </Table>
            <FlatList
              data={data}
              // refreshing={false}
              // onRefresh={onRefresh}
              style={styles.dataWrapper}
              keyExtractor={( item ) => item.realDateTime}
              renderItem={({ item }) => renderItem( item, widthArr, headerData )}
              onEndReached={onEndReached} />
          </View>
        </ScrollView>
      ) : <EmptyList />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    height: 44,
    backgroundColor: '#fafafa'
  },
  text: {
    marginHorizontal: 16
  },
  dataWrapper: {
    marginTop: -1
  },
  rowWrap: {
    height: 44
  },
  row: {
    height: 44,
    backgroundColor: '#fff'
  }
});

export default TableComponent;
