import { useEffect } from 'react';

import { BackHandler, StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FontAwesome from '@expo/vector-icons/FontAwesome';

import { firebaseConfig } from './firebase';
import * as firebase from 'firebase';

import LoginScreen from './Screens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';
import EsteiraScreen from './Screens/EsteiraScreen';
import ArCondicionadoScreen from './Screens/ArCondicionadoScreen';
import DimerScreen from './Screens/DimerScreen';

const Tab = createBottomTabNavigator();

try {
  firebase.initializeApp(firebaseConfig);
} catch (e) {
  console.log('App em carregamento');
}

export default function App() {
  /*
  useEffect(() => {
    BackHandler.addEventListener('backPress', () => true);

    return () => BackHandler.removeEventListener('backPress', () => true);
  }, [])
  */

  return (
    <NavigationContainer>
      <StatusBar translucent backgroundColor="#06283D" barStyle="light-content" style={{ height: 0 }} />
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#DFF6FF',
          tabBarInactiveTintColor: '#808080',
          headerTintColor: '#DFF6FF',
          headerStyle: {
            backgroundColor: '#06283D',
          },
          tabBarStyle: {
            backgroundColor: '#06283D',
            borderTopWidth: 0,
          },
        }}>
        <Tab.Screen
          name="Login"
          component={LoginScreen}
          options={{
            tabBarStyle: { display: 'none' },
            headerShown: false,
            tabBarButton: () => null,
            tabBarVisible: false,
          }}
        />

        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="home" size={size} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Ar Condicionado"
          component={ArCondicionadoScreen}
          options={{
            tabBarButton: () => null,
            tabBarVisible: false,
          }}
        />

        <Tab.Screen
          name="Dimer"
          component={DimerScreen}
          options={{
            tabBarButton: () => null,
            tabBarVisible: false,
          }}
        />

        <Tab.Screen
          name="Esteira"
          component={EsteiraScreen}
          options={{
            tabBarButton: () => null,
            tabBarVisible: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
