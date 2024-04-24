import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  ToastAndroid,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import validations from '../utlis/validations';
import {showError} from '../utlis/helperFunctions';
import {useDispatch, useSelector} from 'react-redux';
import {registerUser} from '../../redux/actions/userActions';

const SignupScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [bio, setBio] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [showPassword, setshowPassword] = useState(true);
  // const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const {error, isAuthenticated} = useSelector((state: any) => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('Home');
    }
    if (error) {
      console.log(error);
    }
  }, [error, isAuthenticated]);
  const isValidData = () => {
    const check = validations({
      email,
      password,
      name,
    });
    if (check) {
      showError(check);
      return false;
    }
    return true;
  };

  const onRegister = () => {
    const isValid = isValidData();
    if (isValid) {
      if (!avatar) {
        showError('please upload photo');
      } else {
        const formData = {email, password, name, avatar};
        registerUser(formData)(dispatch);
      }
    }
  };

  const uploadImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.8,
      includeBase64: true,
    }).then((image: ImageOrVideo | null) => {
      if (image) {
        setAvatar('data:image/jpeg;base64,' + image.data);
      }
    });
  };

  return (
    <ScrollView
      className="flex-1 bg-black "
      showsVerticalScrollIndicator={false}>
      <View className="items-center justify-center mt-12">
        <Image
          source={require('../../assets/img.png')}
          className="w-16 h-16 m-8"
        />
        <View className="w-[75%]">
          <Text className="text-white font-[600] text-[25px] text-center font-[Poppins-Bold]  ">
            Register Here.
          </Text>
          <TextInput
            placeholder="enter your name"
            value={name}
            onChangeText={text => setName(text)}
            placeholderTextColor={'gray'}
            className="w-full h-[45px] border border-gray-400 px-2 my-2 py-2 rounded-md text-white font-[Poppins-Medium]"
          />

          <TextInput
            placeholder="enter your bio"
            value={bio}
            onChangeText={text => setBio(text)}
            placeholderTextColor={'gray'}
            className="w-full h-[80px] border border-gray-400 px-2 my-2 py-2 rounded-md text-black font-[Poppins-Medium]"
          />
          <TextInput
            placeholder="enter your email"
            value={email}
            onChangeText={text => setEmail(text)}
            placeholderTextColor={'gray'}
            className="w-full h-[45px] border border-gray-400 px-2 my-2 py-2 rounded-md text-white font-[Poppins-Medium]"
          />
          <View className="flex-row items-center justify-between w-full h-[45px] border border-gray-400 my-2 rounded-md text-white">
            <TextInput
              placeholder="enter your password"
              value={password}
              className="font-[Poppins-Medium]"
              onChangeText={text => setPassword(text)}
              placeholderTextColor={'gray'}
              secureTextEntry={showPassword == true ? true : false}
            />
            <TouchableOpacity
              onPress={() => setshowPassword(!showPassword)}
              className="mr-1">
              {showPassword == true ? (
                <Text className="text-white  font-[Poppins-SemiBold]">
                  Show
                </Text>
              ) : (
                <Text className="text-white  font-[Poppins-SemiBold]">
                  Hide
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={uploadImage}
            className="flex-row items-center my-2 bg-gray-700 rounded-md w-[60%] py-2">
            <Image
              source={{
                uri: avatar
                  ? avatar
                  : 'https://cdn-icons-png.flaticon.com/128/568/568717.png',
              }}
              className="w-[25px] h-[25px] ml-2 rounded-full"
            />
            <Text className="text-white pl-2 font-[Poppins-SemiBold]">
              upload image
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onRegister}
            activeOpacity={0.7}
            className="w-full h-12 bg-white items-center rounded-3xl mr-12 flex-row justify-center">
            <Text className="text-black font-[Poppins-SemiBold] ml-2">
              Sign Up
            </Text>
          </TouchableOpacity>

          <View className="items-center mt-8">
            <Text className="text-gray-400 font-[Poppins-Medium]">
              Already have an Account?
            </Text>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => navigation.navigate('Login')}>
              <Text className="text-white text-[15px] font-[Poppins-SemiBold]">
                Login Here.
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignupScreen;
