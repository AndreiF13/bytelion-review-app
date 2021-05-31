import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ReviewsScreen from '../screens/Reviews';
import SettingsScreen from '../screens/Settings/';
import { BottomTabParamList, ReviewsParamList, SettingsParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Reviews"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Reviews"
        component={ReviewsNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="user-check" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Settings"                                  
        component={SettingsNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="sliders" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: { name: React.ComponentProps<typeof Feather>['name']; color: string }) {
  return <Feather size={30} style={{ marginBottom: -3 }} {...props} />;
}

const ReviewsStack = createStackNavigator<ReviewsParamList>();

function ReviewsNavigator() {
  return (
    <ReviewsStack.Navigator>     
      <ReviewsStack.Screen
        name="ReviewsScreen"
        component={ReviewsScreen}
        options={{ headerTitle: 'Reviews' }}
      />
    </ReviewsStack.Navigator>
  );
}

const SettingsStack = createStackNavigator<SettingsParamList>();

function SettingsNavigator() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ headerTitle: 'Settings' }}
      />
    </SettingsStack.Navigator>
  );
}
