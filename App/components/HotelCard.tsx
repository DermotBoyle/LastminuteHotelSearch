import React from 'react'
import {
  ListRenderItem,
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { HotelDetails } from '../queries/GetHotelListQuery'
import { getTotalWithCurrencySymbol } from '../utils/currency'

const IMAGE_WIDTH = Dimensions.get('window').width * 0.6
const IMAGE_HEIGHT = Dimensions.get('window').height * 0.2
const FULL_WIDTH_IMAGE = Dimensions.get('window').width * 0.95
const CARD_HEIGHT = Dimensions.get('window').height * 0.4
const IMAGE_MARGIN = 6

const HotelCard: ListRenderItem<HotelDetails> = hotelData => {

  const hasHotelAchievedStar = (stars: number, index: number) => stars > index
  const hotelUserRatingOutOf100 = (userRating: number) => userRating * 10

  return (
    <View style={styles.cardContainer}>
      {/** Virtual scroller (FlatList) would be better here not to load all images at once */}
      <ScrollView
        style={styles.imageScroller}
        horizontal
        showsHorizontalScrollIndicator={false}
        disableIntervalMomentum={true} // One child at a time
        pagingEnabled
        decelerationRate={0}
        snapToInterval={IMAGE_WIDTH + IMAGE_MARGIN}
        snapToAlignment="start"
        contentInset={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}>
        {hotelData.item.gallery.length > 1
          ? (hotelData.item.gallery.map(imgUri => {
            return (
              <Image
                key={imgUri}
                source={{ uri: imgUri }}
                style={styles.cardImage}
                defaultSource={require('../assets/photos/lastminute_default_photo.jpeg')}
              />
            )
          })
          )
          :( <Image
            source={{ uri: hotelData.item.gallery[0] }}
            style={styles.cardImageFullWidth}
            defaultSource={require('../assets/photos/lastminute_default_photo.jpeg')}
          />
          )}
      </ScrollView>
      <Text style={styles.addressText}>{hotelData.item.location.address}</Text>
      <Text style={styles.nameText}>{hotelData.item.name}</Text>
      <View style={styles.ratingContainer}>
        <View style={styles.starContainer}>
          {new Array(5).fill(0).map((_, i) =>
            hasHotelAchievedStar(hotelData.item.stars, i)
              ? <Icon key={i} name="star" size={18} color={'#FFD700'} />
              : <Icon key={i} name="star" size={18} color={'#EBEBED'} />,
          )}
        </View>
        <View style={styles.userRatingContainer}>
          <Text style={styles.userRatingText}>
            {hotelUserRatingOutOf100(hotelData.item.userRating)}
          </Text>
        </View>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.lastMinutePriceText}>
          {getTotalWithCurrencySymbol(hotelData.item.currency,hotelData.item.price)}
        </Text>
        <Text style={styles.lastMinutePriceSubtext}>total</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    position: 'relative',
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 8,
    height: CARD_HEIGHT,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  imageScroller: {
    height: IMAGE_HEIGHT,
    flexGrow: 0,
  },
  cardImage: {
    height: IMAGE_HEIGHT,
    width: IMAGE_WIDTH,
    borderRadius: 8,
    marginRight: 6,
  },
  cardImageFullWidth: {
    flex: 1,
    width: FULL_WIDTH_IMAGE,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  addressText: {
    color: '#C7C7CA',
    fontSize: 14,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  nameText: {
    fontSize: 18,
    paddingHorizontal: 16,
    paddingBottom: 8,
    fontWeight: '600',
  },
  ratingContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '40%',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  starContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderEndWidth: 2,
    borderColor: '#EBEBED',
    marginRight: 8,
    paddingRight: 8,
  },
  userRatingContainer: {
    backgroundColor: '#A0CA3F',
    padding: 4,
    borderRadius: 8,
  },
  userRatingText: {
    color: '#ffff',
    fontWeight: '600',
  },
  priceContainer: {
    position: 'absolute',
    right: 16,
    bottom: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  lastMinutePriceText: {
    color: '#F0527E',
    fontSize: 24,
    fontWeight: '600',
  },
  lastMinutePriceSubtext: {
    color: '#F0527E',
    fontSize: 12,
  },
})

export default HotelCard