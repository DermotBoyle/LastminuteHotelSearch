
import { Dimensions } from "react-native"

export const { height, width } = Dimensions.get('window')

const palette = {
  lastminutePink: '#F0527E',
  lastminuteSecondary: '#FFFF',
  lastminuteSuccess: '#A0CA3F',
  background: "#EBEBED",
  darkText: "#0000",
  primaryButtonText: "#FFFF",
  gold: "#FFD700",
  modalOpacityBackground: "#000000AA",
  detail: "#C7C7CA",
}

export const fontSize = {
  xsmall: height * 0.018,
  small: height * 0.02,
  medium: height * 0.025,
  large: height * 0.03,
  xlarge: height * 0.035,
}

export const theme = {
  colors: {
    primary: palette.lastminutePink,
    secondary: palette.lastminuteSecondary,
    success: palette.lastminuteSuccess,
    background: palette.background,
    primaryText: palette.darkText,
    primaryButtonText: palette.primaryButtonText,
    gold: palette.gold,
    darkText: palette.darkText,
    modalOpacityBackground: palette.modalOpacityBackground,
    tertiaryText: palette.detail,
  },

  fontSize: {
    detail: fontSize.xsmall,
    subtitle: fontSize.small,
    buttonText: fontSize.medium,
    standardText: fontSize.medium,
    title: fontSize.large,
  },

  spacing: {
    h2: width * 0.02,
    h4: width * 0.04,
    h8: width * 0.08,
    h12: width * 0.12,
    h16: width * 0.16,
    h24: width * 0.24,

    v2: height * 0.02,
    v4: height * 0.04,
    v8: height * 0.08,
    v12: height * 0.12,
    v16: height * 0.16,
    v24: height * 0.24,
  },

}
