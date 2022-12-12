import { HotelDetailKeys } from "../domains/HotelSearchPage"
import { HotelDetails } from "../queries/GetHotelListQuery"

export type SortMethods = {
  key?: HotelDetailKeys,
  type: SortSelections,
  label: string,
  sortingFunction: ((type: SortSelections, key?: keyof HotelDetails, filteredHotels?: HotelDetails[]) => void),
}

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
