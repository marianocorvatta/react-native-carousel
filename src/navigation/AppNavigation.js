import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CarouselScreen from '../features/carousel/CarouselScreen';

const Stack = createStackNavigator();

export default function AppNavigation() {

  return (
    <NavigationContainer>
      <Stack.Navigator
        headerShown={false}
        initialRouteName='CarouselScreen'
      >
        <Stack.Screen
          name="CarouselScreen"
          component={CarouselScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
