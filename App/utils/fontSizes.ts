import { Dimensions } from "react-native"

export const { height, width } = Dimensions.get('window')

export const fontSizes = {
  small: height * 0.02,
  medium: height * 0.03,
  large: height * 0.038,
}
