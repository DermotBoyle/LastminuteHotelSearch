import React, { Dispatch, SetStateAction } from 'react'
import {
  Modal,
  Text,
  View,
  StyleSheet,
  FlatList,
  ListRenderItem,
  Pressable,
  Dimensions,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { SortMethods, SortSelections } from '../types/SortTypes'
import { height, theme, width } from '../variables'

type SortModalProps = {
  isOpen: boolean,
  setShowSortModal: Dispatch<SetStateAction<boolean>>,
  activeSortSelection: SortSelections,
  sortingDetails: SortMethods[],
  modalHeight?: number,
  title: string,
  applyFilter: (type: SortSelections) => void,
};

const MODAL_HEIGHT = Dimensions.get('window').height

const SortModal: React.FC<SortModalProps> = props => {
  const SortListItem: ListRenderItem<SortMethods> = ListItem => {
    return (
      <Pressable onPress={() => props.applyFilter( ListItem.item.type)}>
        <View
          style={[
            styles.modalListItem,
            ListItem.index === 0 && styles.modalListItemTopBorderRadius,
          ]}>
          <Text style={styles.modalListItemLabel}>{ListItem.item.label}</Text>
          {ListItem.item.type === props.activeSortSelection && (
            <Icon style={styles.modalListItemIcon} size={16} name="check" />
          )}
        </View>
      </Pressable>
    )
  }

  return (
    <Modal
      testID='sort-modal'
      animationType="fade"
      transparent={true}
      visible={props.isOpen}>
      <View style={styles.modalContainer}>
        <View style={styles.modalBody}>
          <View style={styles.modalHeader}>
            <Pressable
              style={styles.modalCloseIcon}
              onPress={() => props.setShowSortModal(false)}>
              <Icon style={styles.modalCloseIcon} size={theme.fontSize.standardText} name="close" />
            </Pressable>
            <Text style={styles.modalTitle}>{props.title}</Text>
          </View>
          <View style={styles.modalListBody}>
            <FlatList
              data={props.sortingDetails}
              renderItem={SortListItem}
              keyExtractor={sort => sort.label}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: theme.colors.modalOpacityBackground,
    justifyContent: 'flex-end',
  },
  modalBody: {
    flex: 0.45,
    backgroundColor: theme.colors.background,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  modalHeader: {
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    position: 'relative',
    display: 'flex',
    height: '20%',
    flexDirection: 'row',
    backgroundColor: theme.colors.secondary,
    alignItems: 'center',
  },
  modalCloseIcon: {
    position: 'absolute',
    top: height * 0.015,
    marginLeft: width * 0.015,
    zIndex: 2,
  },
  modalTitle: {
    width: '100%',
    textAlign: 'center',
    fontSize: theme.fontSize.standardText,
    fontWeight: '600',
  },
  modalListBody: {
    flex: 1,
    padding: theme.spacing.h4,
  },
  modalListItem: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: theme.colors.secondary,
    justifyContent: 'space-between',
    height: MODAL_HEIGHT * 0.07,
    alignItems: 'center',
    paddingHorizontal: theme.spacing.h4,
    marginBottom: 1,
  },
  modalListItemTopBorderRadius: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  modalListItemIcon: {
    color: theme.colors.primary,
    fontWeight: '600',
    fontSize: theme.fontSize.standardText,
  },
  modalListItemLabel: {
    fontWeight: '600',
    fontSize: theme.fontSize.subtitle,
  },
})

export default SortModal
