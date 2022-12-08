import React from 'react';
import {Text, View} from 'react-native';
import HotelList from '../components/HotelList';
import UtilityToolbar from '../components/UtitlityToolbar';
import {useQuery} from 'react-query';

const HotelSearchPage = () => {
  const getHotels = async () => {
    const res = await fetch(
      'https://run.mocky.io/v3/eef3c24d-5bfd-4881-9af7-0b404ce09507',
    );

    const data = await res.json();

    return data;
  };

  const {data, error, isLoading} = useQuery('getHotels', getHotels);

  if (error) {
    return <Text>Request Failed</Text>;
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <UtilityToolbar />
      <HotelList hotelData={data} />
    </View>
  );
};

export default HotelSearchPage;
