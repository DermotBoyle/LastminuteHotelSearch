import React from 'react'
import { render } from '@testing-library/react-native'
import { QueryClientProvider, QueryClient } from 'react-query'
import { NavigationContainer } from '@react-navigation/native'

const AllTheProviders = ({ children }) => {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        {children}
      </NavigationContainer>
    </QueryClientProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react-native'

// override render method
export { customRender as render }
