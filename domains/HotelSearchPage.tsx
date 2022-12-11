import React, {useState} from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
import HotelList from '../components/HotelList';
import UtilityToolbar from '../components/UtitlityToolbar';
import {useQuery} from 'react-query';
import SortModal from '../components/SortModal';
import {HotelDetails} from '../queries/GetHotelListQuery';

export enum SortSelections {
  RECOMMENDED = 'RECOMMENDED',
  PRICE = 'PRICE',
  STARS = 'STARS',
}

export const SortSelectionLabels = {
  [SortSelections.RECOMMENDED]: 'Recommended',
  [SortSelections.PRICE]: 'Price',
  [SortSelections.STARS]: 'Stars',
};

const HotelSearchPage = () => {
  const getHotels = async () => {
    const res = await fetch(
      'https://run.mocky.io/v3/eef3c24d-5bfd-4881-9af7-0b404ce09507',
    );

    const data = await res.json();

    return data;
  };

  const {data, error, isLoading, refetch} = useQuery<HotelDetails[], Error>(
    'getHotels',
    getHotels,
  );
  const [showSortModal, setShowSortModal] = useState<boolean>(false);
  const [activeSortSelection, setActiveSortSelection] =
    useState<SortSelections>(SortSelections.RECOMMENDED);

  if (error) {
    return <Text>Request Failed</Text>;
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  const sortByPrice = (type: SortSelections) => {
    data?.sort((a, b) => a.price - b.price);
    setActiveSortSelection(type);
    setShowSortModal(false);
  };

  const resetInitialState = async (type: SortSelections) => {
    await refetch();
    setActiveSortSelection(type);
    setShowSortModal(false);
  };

  const sortMethods = [
    {
      type: SortSelections.RECOMMENDED,
      label: SortSelectionLabels[SortSelections.RECOMMENDED],
      sortingFunction: resetInitialState,
    },
    {
      type: SortSelections.PRICE,
      label: SortSelectionLabels[SortSelections.PRICE],
      sortingFunction: sortByPrice,
    },
  ];

  return (
    <SafeAreaView style={styles.pageContainer}>
      <UtilityToolbar setShowSortModal={setShowSortModal} />
      <HotelList hotelData={data} />
      <SortModal
        title="Sort by:"
        isOpen={showSortModal}
        setShowSortModal={setShowSortModal}
        sortingDetails={sortMethods}
        activeSortSelection={activeSortSelection}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
});

export default HotelSearchPage;
