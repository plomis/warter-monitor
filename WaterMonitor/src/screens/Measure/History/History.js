
import React from 'react';
import { StyleSheet, View, Text, SectionList } from 'react-native';
import { connect } from '../../../utils/plodux';


const DATA = [
  {
    title: '9月',
    data: [],
  },
  {
    title: '8月',
    data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
  },
  {
    title: '7月',
    data: ['Water', 'Coke', 'Beer'],
  }
];

function makeSection( data ) {
  const section = data.reduce(( section, item ) => {

    return section;
  }, {});
  return section;
}

function Item({ title }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

function Block() {
  return (
    <SectionList
      sections={DATA}
      style={styles.container}
      stickySectionHeadersEnabled
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => <Item title={item} />}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

Block.navigationOptions = () => {
  return {
    title: '历史数据'
  };
};

export default connect(({ measure }) => {
  return {
    data: measure.online
  }
})( Block );
