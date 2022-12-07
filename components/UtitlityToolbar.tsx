import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const UtilityToolbar = () => {
  return (
    <View style={UtilityStyles.utilityContainer}>
      <TouchableHighlight onPress={() => {}}>
        <View style={UtilityStyles.utilityItem}>
          <Icon name="sort-variant" size={24} />
          <Text style={UtilityStyles.utilityItemText}>Sort</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight onPress={() => {}}>
        <View style={UtilityStyles.utilityItem}>
          <Icon name="tune" size={24} />
          <Text style={UtilityStyles.utilityItemText}>Filter</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight onPress={() => {}}>
        <View style={UtilityStyles.utilityItem}>
          <Icon name="map-outline" size={24} />
          <Text style={UtilityStyles.utilityItemText}>Map</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default UtilityToolbar;

const UtilityStyles = StyleSheet.create({
  utilityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    height: '20%',
  },
  utilityItem: {
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'center',
    height: 50,
  },
  utilityItemText: {
    marginLeft: 10,
  },
});
