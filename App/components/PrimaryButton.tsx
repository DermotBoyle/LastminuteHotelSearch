import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import { theme } from '../variables'

type PrimaryButtonProps = {
  title: string,
  ctaFunction: () => unknown,
}

const PrimaryButton: React.FC<PrimaryButtonProps> = (props) => {

  return (
    <Pressable onPress={() => props.ctaFunction()} style={styles.buttonContainer}>
      <Text style={styles.buttonText}>{props.title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    backgroundColor: theme.colors.primary,
    height: "50%",
    borderRadius: 8,
  },
  buttonText: {
    color: theme.colors.secondary,
    fontSize: theme.fontSize.subtitle,
    fontWeight: '600',
  },
})

export default PrimaryButton
