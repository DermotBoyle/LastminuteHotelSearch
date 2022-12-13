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
import { theme } from '../variables'

const { height, width } = Dimensions.get('window')

const IMAGE_WIDTH = width * 0.6
const IMAGE_HEIGHT = height * 0.225
const FULL_WIDTH_IMAGE = width * 0.95
const CARD_HEIGHT = height * 0.45
const IMAGE_MARGIN = 6

const HotelCard: ListRenderItem<HotelDetails> = hotelData => {

  const hasHotelAchievedStar = (stars: number, index: number) => stars > index
  const hotelUserRatingOutOf100 = (userRating: number) => userRating * 10

  return (
    <View style={styles.cardContainer}>
      {/** Virtual scroller (FlatList) would be better here so not to load all images at once */}
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
                //Issue with Android in debug build processing the backup image
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
              ? <Icon testID='achieved-star' key={i} name="star" size={theme.fontSize.standardText} color={theme.colors.gold} />
              : <Icon key={i} name="star" size={theme.fontSize.standardText} color={theme.colors.background} />,
          )}
        </View>
        <View style={styles.userRatingContainer}>
          <Text style={styles.userRatingText}>
            {hotelUserRatingOutOf100(hotelData.item.userRating)}
          </Text>
        </View>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.lastMinutePriceText} testID="price-test">
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
    backgroundColor: theme.colors.secondary,
    margin: theme.spacing.h4,
    borderRadius: 8,
    height: CARD_HEIGHT,
    shadowColor: theme.colors.darkText,
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
    borderRadius: 8,
  },
  cardImage: {
    height: IMAGE_HEIGHT,
    width: IMAGE_WIDTH,
    borderRadius: 8,
    marginRight: theme.spacing.h2,
  },
  cardImageFullWidth: {
    flex: 1,
    width: FULL_WIDTH_IMAGE,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  addressText: {
    color: theme.colors.tertiaryText,
    fontSize: theme.fontSize.subtitle,
    paddingHorizontal: theme.spacing.h4,
    paddingTop: theme.spacing.v2,
    paddingBottom: theme.spacing.h2,
  },
  nameText: {
    fontSize: theme.fontSize.standardText,
    paddingHorizontal: theme.spacing.h4,
    paddingBottom: theme.spacing.h2,
    fontWeight: '600',
  },
  ratingContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '40%',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.h4,
  },
  starContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderEndWidth: 2,
    borderColor: theme.colors.background,
    marginRight: theme.spacing.h2,
    paddingRight: theme.spacing.h2,
  },
  userRatingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.success,
    padding: theme.spacing.h2,
    borderRadius: 8,
    height: width * 0.08,
    width: width * 0.08,
  },
  userRatingText: {
    color: theme.colors.secondary,
    fontWeight: '600',
    fontSize: theme.fontSize.detail,
    textAlign: 'center',
  },
  priceContainer: {
    position: 'absolute',
    right: theme.spacing.h4,
    bottom: theme.spacing.v2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  lastMinutePriceText: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.title,
    fontWeight: '600',
  },
  lastMinutePriceSubtext: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.subtitle,
  },
})

export default HotelCard
