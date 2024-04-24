import axios from 'axios';
import {Dispatch} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlashMessage, {showMessage} from 'react-native-flash-message';

export const registerUser =
  (formData: any) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({
        type: 'userRegisterRequest',
      });
      const {data} = await axios.post(
        'http://192.168.100.16:8000/api/v1/registration',
        // http://192.168.100.16:8000/api/v1/login
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      dispatch({
        type: 'userRegisterSuccess',
        payload: data.user,
      });
      await AsyncStorage.setItem('token', data.token);
    } catch (error) {
      dispatch({
        type: 'userRegisterFailed',
        payload: error.response.data.message,
      });
      console.log('Error from Register API', error.message);
      showMessage({
        type: 'danger',
        icon: 'danger',
        message: error.response.data.message,
        duration: 2500,
      });
    }
  };

export const loadUser = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({
      type: 'userLoadRequest',
    });

    const token = await AsyncStorage.getItem('token');
    const {data} = await axios.get('http://192.168.100.16:8000/api/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: 'userLoadSuccess',
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: 'userLoadFailed',
      payload: error.response.data.message,
    });
  }
};

export const loginUser =
  (email: string, password: string) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({
        type: 'userLoginRequest',
      });
      const {data} = await axios.post(
        'http://192.168.100.16:8000/api/v1/login',
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      dispatch({
        type: 'userLoginSuccess',
        payload: data.user,
      });
      if (data.token) {
        await AsyncStorage.setItem('token', data.token);
      }
    } catch (error) {
      showMessage({
        type: 'danger',
        icon: 'danger',
        message: error.response.data.message,
        duration: 2500,
      });
      console.log(error.message);
      dispatch({
        type: 'userLoginFailed',
        payload: error.response.data.message,
      });
    }
  };

export const logoutUser = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({
      type: 'userLogoutRequest',
    });
    await AsyncStorage.setItem('token', '');
    dispatch({
      type: 'userLogoutSuccess',
      payload: {},
    });
    console.log('User logged out');
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: 'userlogoutFailed',
      payload: error.response.data.message,
    });
  }
};
export const getAllUsers = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({
      type: 'getUsersRequest',
    });
    const token = await AsyncStorage.getItem('token');
    const {data} = await axios.get('http://192.168.100.16:8000/api/v1/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: 'getUsersSuccess',
      payload: data.users,
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: 'getUsersFailed',
      payload: error.response.data.message,
    });
  }
};

interface FollowUnFollowParams {
  userId: string;
  followUserId: string;
  users: any;
}

export const followUserAction =
  ({userId, users, followUserId}: FollowUnFollowParams) =>
  async (dispatch: Dispatch<any>) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const updatedUsers = users.map((userObj: any) =>
        userObj._id === followUserId
          ? {
              ...userObj,
              followers: [...userObj.followers, {userId}],
            }
          : userObj,
      );
      dispatch({
        type: 'getUsersSuccess',
        payload: updatedUsers,
      });
      await axios.put(
        'http://192.168.100.16:8000/api/v1/add-user',
        {followUserId},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (error) {
      console.log('Error while following user', error.message);
      showMessage({
        type: 'danger',
        icon: 'danger',
        message: error.response.data.message,
        duration: 2500,
      });
    }
  };

export const unFollowUserAction =
  ({userId, users, followUserId}: FollowUnFollowParams) =>
  async (dispatch: Dispatch<any>) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const updatedUsers = users.map((userObj: any) =>
        userObj._id === followUserId
          ? {
              ...userObj,
              followers: userObj.followers.filter(
                (follower: any) => follower.userId !== userId,
              ),
            }
          : userObj,
      );
      dispatch({
        type: 'getUsersSuccess',
        payload: updatedUsers,
      });
      await axios.put(
        'http://192.168.100.16:8000/api/v1/add-user',
        {followUserId},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (error) {
      console.log('Error while following user', error);
    }
  };
