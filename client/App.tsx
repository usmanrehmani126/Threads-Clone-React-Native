import {NavigationContainer} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import Main from './Navigations/Main';
import Auth from './Navigations/Auth';
import {Provider, useDispatch, useSelector} from 'react-redux';
import store from './redux/store';
import React = require('react');
import {loadUser} from './redux/actions/userActions';
import {ActivityIndicator, View, Text, LogBox} from 'react-native';
import FlashMessage from 'react-native-flash-message';
LogBox.ignoreLogs();
const App = () => {
  return (
    <>
      <Provider store={store}>
        <AppStack />
        <FlashMessage
          position="center"
          autoHide={true}
          animationDuration={20}
        />
      </Provider>
    </>
  );
};

const AppStack = () => {
  const {isAuthenticated, loading} = useSelector((state: any) => state.user);
  React.useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <View className="flex-1 bg-black">
      {loading ? (
        <View className="mt-40">
          <ActivityIndicator size={'large'} color={'white'} />
        </View>
      ) : (
        <>
          {isAuthenticated ? (
            <NavigationContainer>
              <Main />
            </NavigationContainer>
          ) : (
            <NavigationContainer>
              <Auth />
            </NavigationContainer>
          )}
        </>
      )}
    </View>
  );
};

export default App;
// 10:49:13 / 14:33:09
