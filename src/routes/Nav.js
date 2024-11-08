import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DashNav from './DashNav';
import LoginScreen from '../screens/AuthScreen/LoginScreen';
import SInfo from 'react-native-sensitive-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainNav from './MainNav';
import * as Auth from  '../redux/action/authAction'
import { useDispatch, useSelector } from 'react-redux';

const Nav = () => {
  const token = useSelector((state) => state.auth.user);

  // console.log(token,"this is token i amsuji")
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const data = await SInfo.getItem('data', {
        sharedPreferencesName: 'mySharedPrefs',
        keychainService: 'myKeychain',
      });
      // console.log(data)
      const parsedData = JSON.parse(data);
      if (parsedData != null) {
        if (parsedData.token != null) {
          dispatch(Auth.fetchUserSuccess(parsedData.token, parsedData.user_id, parsedData.user_name))
        } else {

        }
    }
    } catch (error) {
      console.error('Error fetching data from storage', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <NavigationContainer>
      {token ? <DashNav /> : <MainNav />}
    </NavigationContainer>
  );
};

export default Nav;
