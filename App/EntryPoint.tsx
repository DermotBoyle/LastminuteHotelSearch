import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HotelSearchPage from './domains/HotelSearchPage'
import { theme } from './variables'

const Stack = createStackNavigator()

const EntryPoint = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Hotels" component={HotelSearchPage} options={{ headerTitleStyle: { fontSize: theme.fontSize.subtitle } }} />
    </Stack.Navigator>
  )
}

export default EntryPoint
