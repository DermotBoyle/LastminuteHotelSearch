import { filterByBudget } from "../utils/filter"
import { SortSelectionLabels, SortSelections } from "./SortTypes"

export type BudgetRangeState = number[];

export enum Filters {
  BUDGET = "BUDGET"
}

export type FilterFnState = {
  [Filters.BUDGET]: BudgetRangeState,
}

export type ReducerActions = {
  type: Filters,
  payload: BudgetRangeState,
}

export type FilterOptions = {
  type: Filters,
  label: string,
  filterFunction: ((predicate: any) => any),
}

export const filterLabels: Record<Filters, string> = {
  [Filters.BUDGET] : 'Budget',
}

export const filterMethods : Record<Filters, FilterOptions> = {
  [Filters.BUDGET] : {
    type: Filters.BUDGET,
    label: SortSelectionLabels[SortSelections.RECOMMENDED],
    filterFunction: filterByBudget,
  },
}

export const MIN_VALUE = 0
export const MAX_VALUE = 2000
