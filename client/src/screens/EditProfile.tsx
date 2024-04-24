import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {TextInput} from 'react-native';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {loadUser} from '../../redux/actions/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  navigation: any;
};

const EditProfile = ({navigation}: Props) => {
  const {user} = useSelector((state: any) => state.user);
  const [avatar, setAvatar] = useState(user?.avatar?.url);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: user.name,
    userName: user?.userName,
    bio: user?.bio,
  });

  const handleSubmitHandler = async () => {
    const token = await AsyncStorage.getItem('token');
    if (userData.name.length !== 0 && userData.userName.length !== 0) {
      await axios
        .put(
          `http://192.168.100.16:8000/api/v1/update-profile`,
          {
            name: userData.name,
            userName: userData.userName,
            bio: userData.bio,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((res: any) => {
          loadUser()(dispatch);
        });
    }
  };

  const ImageUpload = async () => {
    const token = await AsyncStorage.getItem('token');
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.8,
      includeBase64: true,
    }).then((image: ImageOrVideo | null) => {
      if (image) {
        // setImage('data:image/jpeg;base64,' + image.data);
        axios
          .put(
            `http://192.168.100.16:8000/api/v1/update-avatar`,
            {
              avatar: 'data:image/jpeg;base64,' + image?.data,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          .then((res: any) => {
            loadUser()(dispatch);
          });
      }
    });
  };

  return (
    <SafeAreaView>
      <View className="flex-row items-center justify-between p-3">
        <View className="flex-row items-center">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
            className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center ">
            <Ionicons name="chevron-back" color={'black'} size={22} />
          </TouchableOpacity>
          <Text className="text-[20px] font-[600] text-[#000] font-[Poppins-Medium]">
            Edit Profile
          </Text>
        </View>
        <TouchableOpacity activeOpacity={0.5} onPress={handleSubmitHandler}>
          <Text className="text-[20px] text-black font-[Poppins-Bold]">
            Done
          </Text>
        </TouchableOpacity>
      </View>
      <View className="h-[90%] items-center justify-center">
        <View className="w-[90%] p-3 min-h-[300] h-max border rounded-[10px] border-[#0000002e]">
          <View className="flex-row">
            <View className="w-full flex-row justify-between">
              <View>
                <Text className="text-[18px] font-[600] text-black font-[Poppins-SemiBold]">
                  Name
                </Text>
                <TextInput
                  value={userData.name}
                  onChangeText={e => setUserData({...userData, name: e})}
                  placeholder="Enter your name..."
                  placeholderTextColor={'#000'}
                  className="text-[16px] text-[#000000b0] font-[Poppins-Medium]"
                />
                <TextInput
                  value={userData.userName}
                  onChangeText={e => setUserData({...userData, userName: e})}
                  placeholder="Enter your user name..."
                  placeholderTextColor={'#000'}
                  className="text-[16px] mb-2 text-[#000000b0] font-[Poppins-Medium] w-48"
                />
              </View>
              <TouchableOpacity activeOpacity={0.7} onPress={ImageUpload}>
                <Image
                  source={{uri: avatar}}
                  width={60}
                  height={60}
                  borderRadius={100}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View className="w-full border-t border-[#00000015] pt-2">
            <Text className="text-[18px] font-[600] text-black font-[Poppins-SemiBold]">
              Bio
            </Text>
            <TextInput
              value={userData.bio}
              onChangeText={e => setUserData({...userData, bio: e})}
              placeholder="Enter your bio..."
              placeholderTextColor={'#000'}
              className="text-[16px] text-[#000000b0] font-[Poppins-Medium]"
              multiline={true}
              numberOfLines={4}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
