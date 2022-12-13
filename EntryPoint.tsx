import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HotelSearchPage from './App/domains/HotelSearchPage'

const Stack = createStackNavigator()

const EntryPoint = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Hotels" component={HotelSearchPage} />
    </Stack.Navigator>
  )
}

export default EntryPoint
