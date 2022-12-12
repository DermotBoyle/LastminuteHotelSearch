import React, {Dispatch, SetStateAction} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type UtilityToolbar = {
  setShowSortModal: Dispatch<SetStateAction<boolean>>;
  hasSortApplied: boolean;
};

const UtilityToolbar: React.FC<UtilityToolbar> = props => {
  return (
    <View style={UtilityStyles.utilityContainer}>
      <TouchableHighlight onPress={() => props.setShowSortModal(true)}>
        <View style={UtilityStyles.utilityItem}>
          {props.hasSortApplied && <View style={UtilityStyles.activeIcon} />}
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
  },
  utilityItem: {
    position: 'relative',
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'center',
    height: 50,
  },
  utilityItemText: {
    marginLeft: 10,
  },
  activeIcon: {
    position: 'absolute',
    top: 8,
    right: 12,
    height: 8,
    width: 8,
    backgroundColor: '#F0527E',
    borderRadius: 50,
  },
});
