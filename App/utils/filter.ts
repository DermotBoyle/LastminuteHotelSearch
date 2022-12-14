import { HotelDetails } from "../queries/GetHotelListQuery"
import { FilterFnState, Filters, ReducerActions } from "../types/FilterTypes"

export const filterByBudget = (budgetRange: number[]) => (hotel: HotelDetails) => hotel.price >= budgetRange[0] && hotel.price <= budgetRange[1]

export const filterByStars = (stars: number) => (hotel:HotelDetails) => hotel.stars === stars

export const reducer = (state: FilterFnState, action: ReducerActions): FilterFnState => {
  switch (action.type) {
    case Filters.BUDGET:
      return {
        ...state,
        [Filters.BUDGET]: action.payload,
      }
    case Filters.STARS:
      return {
        ...state,
        [Filters.STARS]: action.payload,
      }
  }
}
