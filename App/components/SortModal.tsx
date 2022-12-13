import React, { Dispatch, SetStateAction } from 'react'
import {
  Modal,
  Text,
  View,
  StyleSheet,
  FlatList,
  ListRenderItem,
  Pressable,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { SortMethods, SortSelections } from '../types/SortTypes'

type SortModalProps = {
  isOpen: boolean,
  setShowSortModal: Dispatch<SetStateAction<boolean>>,
  activeSortSelection: SortSelections,
  sortingDetails: SortMethods[],
  modalHeight?: number,
  title: string,
  applyFilter: (type: SortSelections) => void,
};

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
              <Icon style={styles.modalCloseIcon} size={24} name="close" />
            </Pressable>
            <Text style={styles.modalTitle}>{props.title}</Text>
          </View>
          <View style={styles.modalListBody}>
            <FlatList
              style={styles.sortList}
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
    backgroundColor: '#000000AA',
    justifyContent: 'flex-end',
  },
  modalBody: {
    flex: 0.3,
    backgroundColor: '#EBEBED',
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
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  modalCloseIcon: {
    position: 'absolute',
    top: 8,
    marginLeft: 8,
    zIndex: 2,
  },
  modalTitle: {
    width: '100%',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  sortList: {
    flex: 1,
  },
  modalListBody: {
    flex: 1,
    padding: 16,
  },
  modalListItem: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 1,
  },
  modalListItemTopBorderRadius: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  modalListItemIcon: {
    color: '#F0527E',
    fontWeight: '600',
  },
  modalListItemLabel: {
    fontWeight: '600',
  },
})

export default SortModal
