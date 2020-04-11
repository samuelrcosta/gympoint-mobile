import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Topbar from './components/Topbar';
import Login from './pages/SignIn';
import Checkins from './pages/Checkins';
import HelpOrdersList from './pages/HelpOrders';
import HelpOrdersShow from './pages/HelpOrders/ShowQuestion';
import HelpOrdersNew from './pages/HelpOrders/NewQuestion';
import Profile from './pages/Profile';

const Base = createStackNavigator();
const Stack = createStackNavigator();
const HelpStack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const switchOptions = {
  headerShown: false,
};

const defaultStackHeaderOptions = {
  headerStyle: { height: 30 },
  headerTitle: () => <Topbar />,
  headerTitleAlign: 'center',
  headerBackImage: () => <Icon name="chevron-left" size={20} color="#000" />,
};

function SignInNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" options={switchOptions} component={Login} />
    </Stack.Navigator>
  );
}

function HelpOrdersNavigator() {
  return (
    <HelpStack.Navigator initialRouteName="HelpOrdersList">
      <HelpStack.Screen
        name="HelpOrdersList"
        options={defaultStackHeaderOptions}
        component={HelpOrdersList}
      />
      <HelpStack.Screen
        name="HelpOrdersNew"
        options={defaultStackHeaderOptions}
        component={HelpOrdersNew}
      />
      <HelpStack.Screen
        name="HelpOrdersShow"
        options={defaultStackHeaderOptions}
        component={HelpOrdersShow}
      />
    </HelpStack.Navigator>
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
        component={HelpOrdersNavigator}
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

function getBaseScreenOptions(route) {
  try {
    const { routeNames, index } = route.route.state;
    const currentRoute = routeNames[index];

    if (currentRoute === 'HelpOrders') {
      return switchOptions;
    }
    return defaultStackHeaderOptions;
  } catch (err) {
    return defaultStackHeaderOptions;
  }
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
            options={route => getBaseScreenOptions(route)}
            component={SignedNavigator}
          />
        )}
      </Base.Navigator>
    </NavigationContainer>
  );
}
