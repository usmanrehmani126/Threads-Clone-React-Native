import React, {useEffect, useState} from 'react';
import LoginScreen from '../src/screens/LoginScreen';
import SignUpScreen from '../src/screens/SignupScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../src/screens/SplashScreen';

const Auth = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default Auth;
