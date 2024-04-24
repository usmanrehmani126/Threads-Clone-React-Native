import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch} from 'react-redux';
import {logoutUser} from '../../redux/actions/userActions';
import {showMessage} from 'react-native-flash-message';

const SettingScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    logoutUser()(dispatch);
    showMessage({
      type: 'success',
      icon: 'success',
      message: 'User logged out',
      duration: 2500,
    });
  };
  return (
    <View className="flex-1 bg-black">
      <View className=" flex-row items-center px-4 mt-2">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center ">
          <MaterialIcons name="arrow-back" color={'black'} size={22} />
        </TouchableOpacity>
        <Text className="font-[Poppins-SemiBold] text-white text-lg ml-20">
          Settings
        </Text>
      </View>

      <View className=" px-8 my-6">
        <TouchableOpacity
          activeOpacity={0.6}
          className="items-center justify-between flex-row mt-6 mb-2"
          onPress={() => navigation.navigate('EditProfile')}>
          <View className="items-center flex-row">
            <AntDesign name="user" color={'white'} size={18} />
            <Text
              className={`text-white
              } font-[Poppins-Regular] ml-4 text-lg`}>
              Edit Profile
            </Text>
          </View>

          <Entypo name="chevron-right" color={'white'} size={26} />
        </TouchableOpacity>
        <View style={{borderWidth: 0.3, borderColor: '#D3D3D3'}} />
        <TouchableOpacity
          activeOpacity={0.6}
          className="items-center justify-between flex-row mt-6 mb-2"
          //   onPress={() => navigation.navigate('EditProfileScreen')}
        >
          <View className="items-center flex-row">
            <Feather name="lock" color={'white'} size={22} />
            <Text
              className={`text-white
              } font-[Poppins-Regular] ml-4 text-lg`}>
              Privacy
            </Text>
          </View>

          <Entypo name="chevron-right" color={'white'} size={26} />
        </TouchableOpacity>
        <View style={{borderWidth: 0.3, borderColor: '#D3D3D3'}} />
        <TouchableOpacity
          activeOpacity={0.6}
          className="items-center justify-between flex-row mt-6 mb-2">
          <View className="items-center flex-row">
            <Ionicons name="bookmark-outline" size={22} color={'white'} />
            <Text className={`text-white font-[Poppins-Regular] ml-4 text-lg`}>
              Saved
            </Text>
          </View>

          <Entypo name="chevron-right" color={'white'} size={26} />
        </TouchableOpacity>
        <View style={{borderWidth: 0.3, borderColor: '#D3D3D3'}} />

        <TouchableOpacity
          activeOpacity={0.6}
          className="items-center justify-between flex-row mt-6 mb-2">
          <View className="items-center flex-row">
            <MaterialIcons name="privacy-tip" size={22} color={'white'} />
            <Text className={`text-white font-[Poppins-Regular] ml-4 text-lg`}>
              Add Payment
            </Text>
          </View>

          <Entypo name="chevron-right" color={'white'} size={26} />
        </TouchableOpacity>
        <View style={{borderWidth: 0.3, borderColor: '#D3D3D3'}} />

        <TouchableOpacity
          activeOpacity={0.6}
          className="items-center justify-between flex-row mt-6 mb-2">
          <View className="items-center flex-row">
            <Entypo name="block" size={22} color={'white'} />
            <Text
              className={`text-white
              } font-[Poppins-Regular] ml-4 text-lg`}>
              Block
            </Text>
          </View>

          <Entypo name="chevron-right" color={'white'} size={26} />
        </TouchableOpacity>
        <View style={{borderWidth: 0.3, borderColor: '#D3D3D3'}} />
        <TouchableOpacity
          activeOpacity={0.6}
          className="items-center justify-between flex-row mt-6 mb-2">
          <View className="items-center flex-row">
            <AntDesign name="sharealt" color={'white'} size={18} />
            <Text
              className={`text-white
              } font-[Poppins-Regular] ml-4 text-lg`}>
              Invite Friends
            </Text>
          </View>

          <Entypo name="chevron-right" color={'white'} size={26} />
        </TouchableOpacity>
        <View style={{borderWidth: 0.3, borderColor: '#D3D3D3'}} />

        <TouchableOpacity
          activeOpacity={0.6}
          className="items-center justify-between flex-row mt-6 mb-2"
          onPress={logoutHandler}>
          <View className="items-center flex-row">
            <AntDesign name="logout" size={22} color={'white'} />
            <Text
              className={` text-white
              } font-[Poppins-Regular] ml-4 text-lg`}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{borderWidth: 0.3, borderColor: '#D3D3D3'}} />
      </View>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({});
