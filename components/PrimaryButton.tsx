import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

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
    width: '30%',
    backgroundColor: "#F0527E",
    height: "50%",
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffff',
    fontSize: 16,
    fontWeight: '600',
  },
})

export default PrimaryButton
