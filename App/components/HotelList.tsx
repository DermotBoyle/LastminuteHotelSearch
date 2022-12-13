import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { HotelDetails } from '../queries/GetHotelListQuery'
import { theme } from '../variables'
import HotelCard from './HotelCard'

type HotelListProps = {
  hotelData: HotelDetails[] | undefined,
};

const HotelList: React.FC<HotelListProps> = props => {
  return (
    <>
      {props?.hotelData && props.hotelData.length > 0
        ? <FlatList
          data={props.hotelData}
          renderItem={HotelCard}
          keyExtractor={hotelData => `${hotelData.id}`}
        />
        : <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsFoundText}>No results found</Text>
          <Text style={styles.removeFiltersText}> Try removing some filters: the perfect deal is still waiting</Text>
        </View>
      }
    </>
  )
}

const styles = StyleSheet.create({
  noResultsContainer: {
    height: "35%",
    backgroundColor: theme.colors.background,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "15%",
    marginTop: "10%",
    width:"90%",
    alignSelf: "center",
    borderRadius: 8,
  },
  noResultsFoundText: {
    fontSize: theme.fontSize.title,
    fontWeight: '600',
    paddingBottom: 12,
  },
  removeFiltersText: {
    textAlign: "center",
    fontSize: theme.fontSize.standardText,
  },

})

export default HotelList
