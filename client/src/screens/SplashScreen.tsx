import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
// import {useSelector} from 'react-redux';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
  const navigation = useNavigation();
  const {isAuthenticated} = useSelector((state: any) => state.user);
  useEffect(() => {
    setTimeout(() => {
      isAuthenticated
        ? navigation.navigate('Home')
        : navigation.navigate('Login');
    }, 3000);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        source={require('../../assets/img.png')}
        style={{width: '100%', resizeMode: 'contain'}}
      />
      <Text
        style={{
          color: 'white',
          fontSize: 40,
          marginTop: -60,
          fontFamily: 'Poppins-Bold',
        }}>
        Thread's
      </Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
