import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {HotelDetails} from '../queries/GetHotelListQuery';

type HotelListProps = {
  hotelData: HotelDetails[];
};

const HotelList: React.FC<HotelListProps> = props => {
  return (
    <ScrollView>
      {props.hotelData.map(hotel => {
        return (
          <View>
            <Text>{hotel.name}</Text>
            <Text>{hotel.location.address}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default HotelList;
