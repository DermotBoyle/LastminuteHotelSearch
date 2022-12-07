import React from 'react';
import {QueryClientProvider, QueryClient} from 'react-query';
import {NavigationContainer} from '@react-navigation/native';
import EntryPoint from './EntryPoint';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <EntryPoint />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
