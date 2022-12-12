import React, { useMemo, useReducer, useState } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import HotelList from '../components/HotelList'
import UtilityToolbar from '../components/UtilityToolbar'
import { useQuery } from 'react-query'
import SortModal from '../components/SortModal'
import { HotelDetails } from '../queries/GetHotelListQuery'
import { applySort, sortAscendingNumber, sortDescendingNumber } from '../utils/sort'
import FilterScreen from '../components/FilterModal'
import { Currency } from '../components/HotelCard'
import { FilterFnState, filterMethods, Filters, MAX_VALUE, MIN_VALUE } from '../types/FilterTypes'
import { SortMethods, SortSelectionLabels, SortSelections } from '../types/SortTypes'
import { filterByBudget, initialState, reducer } from '../utils/filter'

export type HotelDetailKeys = keyof HotelDetails

const HotelSearchPage = () => {
  const getHotels = async () => {
    const res = await fetch(
      'https://run.mocky.io/v3/eef3c24d-5bfd-4881-9af7-0b404ce09507',
    )

    const data = await res.json()

    return data
  }

  const { data, error, isLoading, refetch } = useQuery<HotelDetails[], Error>('getHotels', getHotels )

  /**
   * Modified Data state
   */
  const [ modifiedData, setModifiedData ] = useState<HotelDetails[] | null>(null)

  /**
   * Sort State
   */
  const [ showSortModal, setShowSortModal ] = useState<boolean>(false)
  const [ activeSortSelection, setActiveSortSelection ] = useState<SortSelections>(SortSelections.RECOMMENDED)

  /**
   * Filter state and Filter reducer
   */
  const [ showFilterScreen, setShowFilterScreen ] = useState<boolean>(false)
  const [ filterPredicateFunctions, setFilterPredicateFunctions ] = useState<Record<Filters, any>>({ [Filters.BUDGET]: filterByBudget  })
  const [ filtersToBeApplied, setFiltersToBeApplied ] = useState<Filters[]>([ Filters.BUDGET ])
  const [ state, dispatch ] = useReducer(reducer, initialState)

  /**
   * This function creates an array of filter predicates
   * The filter predicate array is then mapped over and the callback of each filter is passed the HotelDetails data
   *
   * @param type
   */
  const applyFilter = (type?: SortSelections) => {
    const sortType = type ?? activeSortSelection
    const filters = filtersToBeApplied.map((filter) => filterMethods[filter].filterFunction(state[filter]))
    const filteredHotels = filters.flatMap((filterFn) =>  data?.filter(filterFn))

    applySort(sortMethods, sortType, filteredHotels as HotelDetails[])
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
  const sortAscendingBySelectionType = (type: SortSelections, key?: HotelDetailKeys, filteredHotels?: HotelDetails[]) => {
    if (filteredHotels){
      setModifiedData(sortAscendingNumber(filteredHotels, key))
    } else if (data) {
      setModifiedData(sortAscendingNumber(data, key))
    }

    setActiveSortSelection(type)
    setShowSortModal(false)
    setShowFilterScreen(false)
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
  const sortDescendingBySelectionType = (type: SortSelections, key?: HotelDetailKeys, filteredHotels?: HotelDetails[]) => {
    if (filteredHotels){
      setModifiedData(sortDescendingNumber(filteredHotels, key))
    } else if (data) {
      setModifiedData(sortDescendingNumber(data, key))
    }

    setActiveSortSelection(type)
    setShowSortModal(false)
    setShowFilterScreen(false)
  }

  /**
   * Applies recommended sort by fetching data and checks if applyFilter()
   * is to be applied on original data set
   *
   * Recommended sort presumes data returned from API is in correct state
   *
   * @param type
   */
  const applyRecommendedSort = (type: SortSelections, key?: HotelDetailKeys, filteredHotels?: HotelDetails[]) => {
    if (filteredHotels){
      setModifiedData(sortDescendingNumber(filteredHotels, key))
    } else if (data) {
      setModifiedData(sortDescendingNumber(data, key))
    }

    setActiveSortSelection(type)
    setShowSortModal(false)
    setShowFilterScreen(false)
  }

  /**
   * Resets filter state to initialState
   * then checks if any sort methods are active to be applied
   * @returns void
   */
  const resetFiltersAndApplyPossibleSort = () => {
    dispatch({ type: Filters.BUDGET, payload: [ MIN_VALUE, MAX_VALUE ] })
    applySort(sortMethods, activeSortSelection)
    setShowFilterScreen(false)
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
          setFilterPredicateFunctions={setFilterPredicateFunctions}
          filterPredicateFunctions={filterPredicateFunctions}
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
