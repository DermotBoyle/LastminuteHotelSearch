import React, { useMemo, useReducer, useState } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import HotelList from '../components/HotelList'
import UtilityToolbar from '../components/UtilityToolbar'
import { useQuery } from 'react-query'
import SortModal from '../components/SortModal'
import { HotelDetails } from '../queries/GetHotelListQuery'
import { applySort, sortAscendingNumber, sortDescendingNumber } from '../utils/sort'
import FilterScreen from '../components/FilterModal'
import { FilterFnState, filterMethods, Filters, MAX_VALUE, MIN_VALUE } from '../types/FilterTypes'
import { SortMethods, SortSelectionLabels, SortSelections } from '../types/SortTypes'
import { reducer } from '../utils/filter'
import { Currency } from '../utils/currency'

export type HotelDetailKeys = keyof HotelDetails

const initialFilterState: FilterFnState = { 'BUDGET' : [ MIN_VALUE, MAX_VALUE ], 'STARS': 4 }

const HotelSearchPage = () => {
  const getHotels = async () => {
    const res = await fetch(
      'https://run.mocky.io/v3/eef3c24d-5bfd-4881-9af7-0b404ce09507',
    )

    const data = await res.json()

    return data
  }

  const { data, error, isLoading } = useQuery<HotelDetails[], Error>('getHotels', getHotels )

  /**
   * Modified copy of data from API
   */
  const [ modifiedData, setModifiedData ] = useState<HotelDetails[] | null>(null)

  /**
   * Sort State
   */
  const [ showSortModal, setShowSortModal ] = useState<boolean>(false)
  const [ activeSortSelection, setActiveSortSelection ] = useState<SortSelections>(SortSelections.RECOMMENDED)

  /**
   * Filter state
   */
  const [ showFilterScreen, setShowFilterScreen ] = useState<boolean>(false)
  const [ filtersToBeApplied, setFiltersToBeApplied ] = useState<Filters[]>([ Filters.BUDGET ]) // Add filters here to test eg: Filters.Stars

  /**
   * Filter Reducer hook
   * Complex filter object state better managed by reducer pattern
   */
  const [ state, dispatch ] = useReducer(reducer, initialFilterState)

  const setTypeAndCloseModals = (type:SortSelections) => {
    setActiveSortSelection(type)
    setShowSortModal(false)
    setShowFilterScreen(false)
  }

  /**
   * This function creates an array of filter predicates
   * The filter predicate array is then mapped over and the callback of each filter is passed the HotelDetails data
   *
   * @param type
   */
  const applyFilter = (type?: SortSelections) => {

    if (!data) return console.error('[applyFilter] : data is missing or corrupt')

    const copyOfData = [ ...data ]
    const sortType = type ?? activeSortSelection
    const filters = filtersToBeApplied.map((filter) => filterMethods[filter].filterFunction(state[filter]))
    const filteredHotels = copyOfData?.filter(val => filters.every(predicate => predicate(val)))

    if (!filteredHotels) return console.error('[applyFilter] : filtered data is missing or corrupt')

    applySort(sortMethods, sortType, filteredHotels)
  }

  /**
   * Utility function to get the current currency symbol
   * Memoised to run only once per fetch
   */
  const currency = useMemo(() =>
    data?.map(({ currency }) => {
      if (Object.values(Currency).includes(currency)){
        return currency
      }
    })[0], [ data ])

  /**
     * Generic sort function by ascending number
     * Filtering is the first option before sorting
     * We check:
     * IF it is a filtered array, operate on that filtered data
     * ELSE we operate on a copy of the original data set
     * @param type
     * @param key
     * @param filteredHotels
     */
  const sortAscendingBySelectionType = (type: SortSelections, filteredHotels: HotelDetails[], key?: HotelDetailKeys) => {
    setModifiedData(sortAscendingNumber(filteredHotels, key))
    setTypeAndCloseModals(type)
  }

  /**
     * Generic sort function by descending number
     * Filtering is the first option before sorting
     * We check:
     * IF it is a filtered array, operate on that filtered data
     * ELSE we operate on a copy of the original data set
     * @param type
     * @param key
     * @param filteredHotels
     */
  const sortDescendingBySelectionType = (type: SortSelections, filteredHotels: HotelDetails[], key?: HotelDetailKeys) => {
    setModifiedData(sortDescendingNumber(filteredHotels, key))
    setTypeAndCloseModals(type)
  }

  /**
   * Recommended sort utilizes userRating
   * @param type
   */
  const applyRecommendedSort = (type: SortSelections, filteredHotels: HotelDetails[], key?: HotelDetailKeys) => {
    setModifiedData(sortDescendingNumber(filteredHotels, key))
    setTypeAndCloseModals(type)
  }

  /**
   * Resets filter state to initialState
   * then checks if any sort methods are active to be applied
   * @returns void
   */
  const resetFiltersAndApplyPossibleSort = () => {
    dispatch({ type: Filters.BUDGET, payload: [ MIN_VALUE, MAX_VALUE ] })
    applySort(sortMethods, activeSortSelection, data as HotelDetails[])
  }

  const sortMethods: SortMethods[] = [
    {
      type: SortSelections.RECOMMENDED,
      label: SortSelectionLabels[SortSelections.RECOMMENDED],
      sortingFunction: applyRecommendedSort,
      key: 'userRating',
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
    <View style={styles.pageContainer}>
      {showFilterScreen
        ? <FilterScreen
          currency={currency}
          setShowFilterScreen={setShowFilterScreen}
          applyFilter={applyFilter}
          resetFiltersAndApplyPossibleSort={resetFiltersAndApplyPossibleSort}
          state={state}
          filtersToBeApplied={filtersToBeApplied}
          dispatch={dispatch}
        />
        : <UtilityToolbar
          setShowSortModal={setShowSortModal}
          setShowFilterScreen={setShowFilterScreen}
          hasSortApplied={activeSortSelection !== SortSelections.RECOMMENDED}
        />
      }
      <HotelList hotelData={modifiedData !== null ? modifiedData : data} />
      <SortModal
        title="Sort by:"
        isOpen={showSortModal}
        setShowSortModal={setShowSortModal}
        sortingDetails={sortMethods}
        applyFilter={applyFilter}
        activeSortSelection={activeSortSelection}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  pageContainer: {
    height: '100%',
  },
})

export default HotelSearchPage
