import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import PrimaryButton from './PrimaryButton'
import { FilterFnState, Filters, MAX_VALUE, MIN_VALUE, ReducerActions } from '../types/FilterTypes'
import { Currency, CurrencySymbolLabels } from '../utils/currency'
import { fontSizes, height, width } from '../utils/fontSizes'

type FilterScreenProps = {
  currency?: Currency,
  setShowFilterScreen: Dispatch<SetStateAction<boolean>>,
  applyFilter: () => void,
  resetFiltersAndApplyPossibleSort: () => void,
  state: FilterFnState,
  dispatch: Dispatch<ReducerActions>,
  filtersToBeApplied: Filters[],
};

const FilterScreen: React.FC <FilterScreenProps> = (props) => {

  const getSliderAmount = (currentSliderAmounts: number[]) =>
    props.currency
      ? `${CurrencySymbolLabels[props?.currency]}${currentSliderAmounts[0]} - ${currentSliderAmounts[1] !== MAX_VALUE
        ? CurrencySymbolLabels[props?.currency]
        : ''}${currentSliderAmounts[1] === MAX_VALUE
        ? 'no limit'
        : currentSliderAmounts[1]} (total price)`
      : `No currency found`

  /**
  * Reset slider onMount
  */
  useEffect(() =>
    props.dispatch({ type: Filters.BUDGET, payload: [ MIN_VALUE, MAX_VALUE ] })
  ,[])

  return (
    <View style={styles.screenContainer}>
      <View style={styles.screenHeader}>
        <Pressable style={styles.closeIconContainer}>
          <Icon name="close" size={fontSizes.large} onPress={() => props.setShowFilterScreen(false)} />
        </Pressable>
        <Text style={styles.titleText}>Filters</Text>
        <Pressable style={styles.resetAllContainer} onPress={() => props.resetFiltersAndApplyPossibleSort()}>
          <Text style={styles.resetText}>Reset All</Text>
        </Pressable>
      </View>
      <View style={styles.filterBodyContainer}>
        <View style={styles.budgetContainer}>
          <Text style={styles.budgetLabel}>Budget</Text>
          <View testID='slider-container' style={styles.sliderContainer}>
            <Text style={styles.sliderAmountText}>{getSliderAmount(props.state[Filters.BUDGET])}</Text>
            <MultiSlider
              markerStyle={{ height: fontSizes.small, width: fontSizes.small }}
              values={[ MIN_VALUE, MAX_VALUE ]}
              min={MIN_VALUE}
              max={MAX_VALUE}
              onValuesChange={(val) => props.dispatch({ type: Filters.BUDGET, payload: val })}
              minMarkerOverlapDistance={50}
              step={20}
              sliderLength={width * 0.75}
            />
          </View>
        </View>
      </View>
      <View style={styles.screenFooter}>
        <PrimaryButton title='Apply' ctaFunction={() => props.applyFilter()} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    height: "100%",
  },
  screenHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: "#ffff",
    alignItems: 'center',
    height: height * 0.085,
    paddingHorizontal: 16,
  },
  titleText: {
    fontSize: fontSizes.medium,
    fontWeight: '600',
    textAlign: 'center',
    width: '40%',
  },
  resetAllContainer: {
    width: '30%',
    paddingEnd: "2%",
  },
  resetText: {
    color: "#F0527E",
    textAlign: 'right',
    fontSize: fontSizes.small,
  },
  closeIconContainer: {
    width: '30%',
  },
  filterBodyContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  budgetLabel: {
    fontSize: fontSizes.medium,
    fontWeight: '600',
    marginBottom: height * 0.015,
  },
  budgetContainer: {
    height: height * 0.25,
    marginTop: '10%',
  },
  sliderContainer: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 12,
    backgroundColor: "#ffff",
    paddingVertical: 24,
  },
  sliderAmountText: {
    width: "100%",
    textAlign: 'left',
    fontSize: fontSizes.small,
    paddingHorizontal: 16,
    marginTop: -8,
    marginBottom: 8,
  },
  screenFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: height * 0.125,
    paddingHorizontal: 24,
    backgroundColor: '#ffff',
  },
})

export default FilterScreen
