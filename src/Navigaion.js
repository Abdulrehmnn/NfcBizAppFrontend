import React, { useContext } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from './Context/AuthContext';
import LoadingIndicator from './Context/LoadingIndicator';
import Splash from './Screens/Splash';
import Login from './Screens/Login';
import MainScreen from './Screens/MainScreen';
import Cardsplash from './Screens/Cardsplash';
import CardScreen from './Screens/CardScreen';
import MenuScreen from './Screens/MenuScreen';
import Templates from './Screens/Templetes';
import SalonInputs from './Components/TempletInputs/SalonInputs';

const Stack = createStackNavigator();

const Navigation = () => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <NavigationContainer>
        <Stack.Navigator>
          {user && user.isLoggedIn ? (
            <>
              <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Tempt" component={Templates} options={{ headerShown: false }} />
              <Stack.Screen name="MenuScreen" component={MenuScreen} options={{ headerShown: false }} />
              <Stack.Screen name="SalonInputs" component={SalonInputs} options={{ headerShown: false }} />
            </>
          ) : (
            <>
              <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
              <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
              <Stack.Screen name="Cardsplash" component={Cardsplash} options={{ headerShown: false }} />
              <Stack.Screen name="CardScreen" component={CardScreen} options={{ headerShown: false }} />
            </>
          )}
          {/* <Stack.Screen name="second" component={Splash} options={{ headerShown: false }} /> */}
          {/* <Stack.Screen name="first" component={Splash} options={{ headerShown: false }} /> */}
          {/* <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} /> */}

          {/* <Stack.Screen name="Cardsplash" component={Cardsplash} options={{ headerShown: false }} />
          <Stack.Screen name="CardScreen" component={CardScreen} options={{ headerShown: false }} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default Navigation;
