import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Splash from '../Screens/Splash';
import Login from '../Screens/Login';
import Cardsplash from '../Screens/Cardsplash';
import CardScreen from '../Screens/CardScreen';
import MainScreen from '../Screens/MainScreen';
import MenuScreen from '../Screens/MenuScreen';
import Templates from '../Screens/Templetes';
import SalonInputs from '../Components/TempletInputs/SalonInputs';
import CvInputs from '../Components/TempletInputs/CvInputs';
import MenuInputs from '../Components/TempletInputs/MenuInputs';
const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Cardsplash"
            component={Cardsplash}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CardScreen"
            component={CardScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MainScreen"
            component={MainScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MenuScreen"
            component={MenuScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Tempt"
            component={Templates}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SalonInputs"
            component={SalonInputs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CvInputs"
            component={CvInputs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MenuInputs"
            component={MenuInputs}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>

      </NavigationContainer>
    </View>

  )
}

export default Navigation
