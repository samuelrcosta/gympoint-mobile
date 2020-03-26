import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Topbar from './components/Topbar';
import Login from './pages/SignIn';
import Checkins from './pages/Checkins';
import HelpOrders from './pages/HelpOrders';
import Profile from './pages/Profile';

const Base = createStackNavigator();
const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const switchOptions = {
  headerShown: false,
};

function SignInNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" options={switchOptions} component={Login} />
    </Stack.Navigator>
  );
}

function SignedNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Checkins"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: '#ee4e62',
        inactiveTintColor: '#999999',
        style: {
          backgroundColor: '#fff',
          borderTopColor: 'transparent',
        },
      }}
    >
      <BottomTab.Screen
        name="Checkins"
        component={Checkins}
        options={{
          tabBarLabel: 'Check-ins',
          tabBarIcon: ({ color }) => (
            <Icon name="edit-location" size={20} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="HelpOrders"
        component={HelpOrders}
        options={{
          tabBarLabel: 'Pedir Ajuda',
          tabBarIcon: ({ color }) => (
            <Icon name="live-help" size={20} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color }) => (
            <Icon name="person" size={20} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export default function Routes({ signed }) {
  return (
    <NavigationContainer>
      <Base.Navigator initialRouteName={signed ? 'Signed' : 'SignIn'}>
        {!signed ? (
          <Base.Screen
            name="SignIn"
            options={switchOptions}
            component={SignInNavigator}
          />
        ) : (
          <Base.Screen
            name="Signed"
            options={{
              headerStyle: { height: 30 },
              headerTitle: () => <Topbar />,
              headerTitleAlign: 'center',
            }}
            component={SignedNavigator}
          />
        )}
      </Base.Navigator>
    </NavigationContainer>
  );
}
