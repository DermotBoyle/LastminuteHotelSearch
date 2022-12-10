import React from 'react';
import {StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {HotelDetails} from '../queries/GetHotelListQuery';
import HotelCard from './HotelCard';

type HotelListProps = {
  hotelData: HotelDetails[];
};

const HotelList: React.FC<HotelListProps> = props => {
  return (
    <FlatList
      style={styles.list}
      data={props.hotelData}
      renderItem={HotelCard}
      keyExtractor={hotelData => `${hotelData.id}`}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});

export default HotelList;
