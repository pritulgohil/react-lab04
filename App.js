import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Image, StyleSheet} from 'react-native';
import HomeScreen from './screens/HomeScreen';
import CabDetailScreen from './screens/CabDetailScreen';
import MyCabScreen from './screens/MyCabScreen';
import {CabProvider} from './context/CabContext';

import homeIcon from './assets/home.png';
import myCabIcon from './assets/mycab.png';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CabsList" component={HomeScreen} />
      <Stack.Screen name="CabDetail" component={CabDetailScreen} />
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <CabProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{
              tabBarIcon: ({size, color}) => (
                <Image
                  source={homeIcon}
                  style={[
                    styles.icon,
                    {tintColor: color, width: size, height: size},
                  ]}
                />
              ),
            }}
          />
          <Tab.Screen
            name="My Cab"
            component={MyCabScreen}
            options={{
              tabBarIcon: ({size, color}) => (
                <Image
                  source={myCabIcon}
                  style={[
                    styles.icon,
                    {tintColor: color, width: size, height: size},
                  ]}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </CabProvider>
  );
};

const styles = StyleSheet.create({
  icon: {
    resizeMode: 'contain',
  },
});

export default App;
