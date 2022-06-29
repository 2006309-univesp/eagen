import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Translate
import {t} from '../i18n';

import CustomTabBar from '../components/CustomTabBar';

import Home from '../screens/Home';
import Search from '../screens/Search';
import Appointments from '../screens/Appointments';
import Favorites from '../screens/Favorites';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

export default () => (
  <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
    <Tab.Screen name={t('home')} component={Home} />
    <Tab.Screen name={t('search')} component={Search} />
    <Tab.Screen name={t('appointments')} component={Appointments} />
    <Tab.Screen name={t('favorites')} component={Favorites} />
    <Tab.Screen name={t('profile')} component={Profile} />
  </Tab.Navigator>
);
