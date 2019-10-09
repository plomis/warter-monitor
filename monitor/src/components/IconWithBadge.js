
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


function IconWithBadge({ component, name, badgeCount, color, size, style }) {
  const IconComponent = component || Ionicons;
  return (
    <View style={style ? [ style, styles.wrap ] : styles.wrap}>
      <IconComponent name={name} size={size} color={color} />
      {badgeCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 25,
    width: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  badge: {
    position: 'absolute',
    left: 18,
    top: -1,
    backgroundColor: 'red',
    borderRadius: 8,
    width: 17,
    height: 17,
    justifyContent: 'center',
    alignItems: 'center'
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold'
  }
});

export default IconWithBadge;
