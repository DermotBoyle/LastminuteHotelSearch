import { HotelDetails } from "../queries/GetHotelListQuery"
import { SortMethods, SortSelections } from "../types/SortTypes"

export const sortAscendingNumber = <T extends Record<K, any>, K extends string>
(itemArray: T[],key?: K) => {
  if (!itemArray || !key) {
    return null
  }
  return [ ...itemArray ].sort((a, b) => a[key] - b[key])
}

export const sortDescendingNumber = <T extends Record<K, any>, K extends string>
(itemArray: T[], key?: K) => {
  if (!itemArray || !key) {
    return null
  }
  return [ ...itemArray ].sort((a, b) => b[key] - a[key])
}

export const applySort = (sortMethods: SortMethods[], activeSortSelection: SortSelections, filteredHotels:HotelDetails[]) => {
  const sortedResult = sortMethods.find((sortMethod) => sortMethod.type === activeSortSelection)

  if (!sortedResult) return console.error('[applySort]: find sort method corrupted') // should never happen

  sortedResult.sortingFunction(sortedResult.type, filteredHotels, sortedResult.key )
}

