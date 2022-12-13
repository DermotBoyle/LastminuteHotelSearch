import React, { Dispatch, SetStateAction } from 'react'
import { Text, View, StyleSheet, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

type UtilityToolbar = {
  setShowSortModal: Dispatch<SetStateAction<boolean>>,
  setShowFilterScreen: Dispatch<SetStateAction<boolean>>,
  hasSortApplied: boolean,
};

const UtilityToolbar: React.FC<UtilityToolbar> = props => {
  return (
    <View style={UtilityStyles.utilityContainer}>
      <Pressable style={UtilityStyles.utilityItem} onPress={() => props.setShowSortModal(true)}>
        <View style={UtilityStyles.utilityItemDetail}>
          {props.hasSortApplied && <View style={UtilityStyles.activeIcon} />}
          <Icon name="sort-variant" size={24} />
          <Text style={UtilityStyles.utilityItemText}>Sort</Text>
        </View>
      </Pressable>
      <Pressable style={[ UtilityStyles.utilityItem, UtilityStyles.middleUtilityItem ]} onPress={() => props.setShowFilterScreen(true)}>
        <View style={UtilityStyles.utilityItemDetail}>
          <Icon name="tune" size={24} />
          <Text style={UtilityStyles.utilityItemText}>Filter</Text>
        </View>
      </Pressable>
      <Pressable style={UtilityStyles.utilityItem}  onPress={() => {}}>
        <View style={UtilityStyles.utilityItemDetail}>
          <Icon name="map-outline" size={24} />
          <Text style={UtilityStyles.utilityItemText}>Map</Text>
        </View>
      </Pressable>
    </View>
  )
}

export default UtilityToolbar

const UtilityStyles = StyleSheet.create({
  utilityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: "#ffff",
    height: 50,
    alignItems: 'center',
  },
  utilityItem: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  utilityItemDetail: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  utilityItemText: {
    marginLeft: 10,
  },
  middleUtilityItem: {
    borderLeftWidth: 1,
    borderRightWidth:1,
    borderColor: '#EBEBED',
  },
  activeIcon: {
    position: 'absolute',
    top: -4,
    right: 12,
    height: 8,
    width: 8,
    backgroundColor: '#F0527E',
    borderRadius: 50,
  },
})
