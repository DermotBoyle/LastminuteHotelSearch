import React, { Dispatch, SetStateAction } from 'react'
import { Text, View, StyleSheet, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { height, theme } from '../variables'

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
          <Icon name="sort-variant" size={theme.fontSize.standardText} />
          <Text style={UtilityStyles.utilityItemText}>Sort</Text>
        </View>
      </Pressable>
      <Pressable style={[ UtilityStyles.utilityItem, UtilityStyles.middleUtilityItem ]} onPress={() => props.setShowFilterScreen(true)}>
        <View style={UtilityStyles.utilityItemDetail}>
          <Icon name="tune" size={theme.fontSize.standardText} />
          <Text style={UtilityStyles.utilityItemText}>Filter</Text>
        </View>
      </Pressable>
      <Pressable style={UtilityStyles.utilityItem}  onPress={() => null}>
        <View style={UtilityStyles.utilityItemDetail}>
          <Icon name="map-outline" size={theme.fontSize.standardText} />
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
    backgroundColor: theme.colors.secondary,
    height: height * 0.075,
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
    marginLeft: theme.spacing.h4,
    fontSize: theme.fontSize.subtitle,
  },
  middleUtilityItem: {
    borderLeftWidth: 1,
    borderRightWidth:1,
    borderColor: theme.colors.background,
  },
  activeIcon: {
    position: 'absolute',
    top: -4,
    right: 12,
    height: "10%",
    width: "10%",
    backgroundColor: theme.colors.primary,
    borderRadius: 50,
  },
})
