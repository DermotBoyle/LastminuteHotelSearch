import { filterByBudget, filterByStars } from "../utils/filter"

export type BudgetRangeState = number[];

export enum Filters {
  BUDGET = "BUDGET",
  STARS = "STARS"
}

export type FilterFnState = {
  [Filters.BUDGET]: BudgetRangeState,
  [Filters.STARS]: number,
}

export type ReducerActions =
| {
  type: Filters.BUDGET,
  payload: BudgetRangeState,
}
| {
  type: Filters.STARS,
  payload: number,
}

export type FilterOptions = {
  type: Filters,
  label: string,
  filterFunction: ((predicate: any) => any),
}

export const filterLabels: Record<Filters, string> = {
  [Filters.BUDGET] : 'Budget',
  [Filters.STARS] : "Stars",
}

export const filterMethods : Record<Filters, FilterOptions> = {
  [Filters.BUDGET] : {
    type: Filters.BUDGET,
    label: filterLabels[Filters.BUDGET],
    filterFunction: filterByBudget,
  },
  [Filters.STARS] : {
    type: Filters.STARS,
    label: filterLabels[Filters.STARS],
    filterFunction: filterByStars,
  },
}

export const MIN_VALUE = 0
export const MAX_VALUE = 2000
