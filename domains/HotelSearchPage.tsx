import React, { useState } from 'react'
import { SafeAreaView, Text, StyleSheet } from 'react-native'
import HotelList from '../components/HotelList'
import UtilityToolbar from '../components/UtilityToolbar'
import { useQuery } from 'react-query'
import SortModal from '../components/SortModal'
import { HotelDetails } from '../queries/GetHotelListQuery'
import { sortAscendingNumber, sortDescendingNumber } from '../utils/sort'

export enum SortSelections {
  RECOMMENDED = 'RECOMMENDED',
  PRICE = 'PRICE',
  STARS = 'STARS',
}

export const SortSelectionLabels = {
  [SortSelections.RECOMMENDED]: 'Recommended',
  [SortSelections.PRICE]: 'Price',
  [SortSelections.STARS]: 'Stars',
}

type HotelDetailKeys = keyof HotelDetails

export type SortMethods = {
  key?: HotelDetailKeys,
  type: SortSelections,
  label: string,
  sortingFunction: ((type: SortSelections, key?: keyof HotelDetails) => void),
}

const HotelSearchPage = () => {
  const getHotels = async () => {
    const res = await fetch(
      'https://run.mocky.io/v3/eef3c24d-5bfd-4881-9af7-0b404ce09507',
    )

    const data = await res.json()

    return data
  }

  const { data, error, isLoading, refetch } = useQuery<HotelDetails[], Error>('getHotels', getHotels)
  const [ showSortModal, setShowSortModal ] = useState<boolean>(false)
  const [ activeSortSelection, setActiveSortSelection ] = useState<SortSelections>(SortSelections.RECOMMENDED)
  const [ modifiedData, setModifiedData ] = useState<HotelDetails[] | null | undefined>(null)

  const sortAscendingBySelectionType = (type: SortSelections, key?: HotelDetailKeys) => {
    data && setModifiedData(sortAscendingNumber(data, key))
    setActiveSortSelection(type)
    setShowSortModal(false)
  }

  const sortDescendingBySelectionType =(type: SortSelections, key?: HotelDetailKeys) => {
    data && setModifiedData(sortDescendingNumber(data, key))
    setActiveSortSelection(type)
    setShowSortModal(false)
  }

  const resetInitialState = async (type: SortSelections) => {
    await refetch()
    setModifiedData(null)
    setActiveSortSelection(type)
    setShowSortModal(false)
  }

  const sortMethods: SortMethods[] = [
    {
      type: SortSelections.RECOMMENDED,
      label: SortSelectionLabels[SortSelections.RECOMMENDED],
      sortingFunction: resetInitialState,
    },
    {
      type: SortSelections.PRICE,
      label: SortSelectionLabels[SortSelections.PRICE],
      sortingFunction: sortAscendingBySelectionType,
      key: 'price',
    },
    {
      type: SortSelections.STARS,
      label: SortSelectionLabels[SortSelections.STARS],
      sortingFunction: sortDescendingBySelectionType,
      key: 'stars',
    },
  ]

  if (error) {
    return <Text>Request Failed</Text>
  }

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  return (
    <SafeAreaView style={styles.pageContainer}>
      <UtilityToolbar
        setShowSortModal={setShowSortModal}
        hasSortApplied={activeSortSelection !== SortSelections.RECOMMENDED}
      />
      <HotelList hotelData={modifiedData !== null ? modifiedData : data} />
      <SortModal
        title="Sort by:"
        isOpen={showSortModal}
        setShowSortModal={setShowSortModal}
        sortingDetails={sortMethods}
        activeSortSelection={activeSortSelection}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
})

export default HotelSearchPage
