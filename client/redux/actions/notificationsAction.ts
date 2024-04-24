import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Dispatch} from 'react';
export const getNotifications = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({
      type: 'getNotificationRequest',
    });
    const token = await AsyncStorage.getItem('token');
    const {data} = await axios.get(
      'http://192.168.100.16:8000/api/v1/get-notifications',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    dispatch({
      type: 'getNotificationSuccess',
      payload: data.notifications,
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: 'getNotificationFailed',
      payload: error.response.data.message,
    });
  }
};
