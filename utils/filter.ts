import { HotelDetails } from "../queries/GetHotelListQuery"
import { FilterFnState, Filters, ReducerActions } from "../types/FilterTypes"

export const filterByBudget = (budgetRange: number[]) => (hotel: HotelDetails) => hotel.price >= budgetRange[0] && hotel.price <= budgetRange[1]

export const initialState: FilterFnState = { 'BUDGET': [ 0, 2000 ] }

export const reducer = (state: FilterFnState, action: ReducerActions) => {
  switch (action.type) {
    case Filters.BUDGET:
      return {
        ...state,
        [Filters.BUDGET] : action.payload,
      }
  }
}
