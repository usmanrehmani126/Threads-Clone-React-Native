import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getNotifications} from '../../redux/actions/notificationsAction';
import {StatusBar} from 'native-base';
import getTimeDuration from '../components/TimeGeneratorFile';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotificationScreen = () => {
  const dispatch = useDispatch();
  const {notifications, isLoading} = useSelector(
    (state: any) => state.notification,
  );
  const navigation = useNavigation();
  const [acitve, setAcitve] = useState(0);
  const [showOnActive, setShowOnActive] = useState(0);

  useEffect(() => {
    getNotifications()(dispatch);
  }, []);

  const labels = ['All', 'Replies', 'Mentions', 'Follows'];
  const handleTabPress = (index: number) => {
    setAcitve(index);
    setShowOnActive(index);
  };

  return (
    <>
      <View className="flex-1 bg-black">
        {isLoading ? (
          <View className="mt-20">
            <ActivityIndicator size={'large'} color={'white'} />
          </View>
        ) : (
          <SafeAreaView>
            <StatusBar
              animated={true}
              backgroundColor={'black'}
              showHideTransition={'fade'}
              barStyle={'light-content'}
            />
            <View className="p-3">
              <Text className="text-3xl font-[Poppins-SemiBold] text-white">
                Activity
              </Text>
              <View className="w-full flex-row my-3 justify-between">
                <ScrollView
                  horizontal
                  className="w-full"
                  showsHorizontalScrollIndicator={false}>
                  {labels?.map((label, index) => (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => handleTabPress(index)}
                      key={index}
                      className="w-[120px] h-[38px] rounded-[8px] mx-3 items-center justify-center"
                      style={{
                        backgroundColor: acitve === index ? 'white' : 'black',
                        borderWidth: 1,
                        borderColor: 'gray',
                      }}>
                      <Text
                        className={`${
                          acitve === index ? 'text-black' : 'text-gray-400'
                        } font-[Poppins-Medium]`}>
                        {label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              {notifications?.length === 0 && (
                <View className="w-full h-[100px] flex items-center justify-center">
                  {showOnActive === 0 ? (
                    <Text className="text-3xl text-white font-[Poppins-Medium]">
                      You have no activity yet! 🙂
                    </Text>
                  ) : showOnActive === 1 ? (
                    <Text className="text-3xl text-white font-[Poppins-Medium]">
                      You have no Replies yet! 🙂
                    </Text>
                  ) : showOnActive === 2 ? (
                    <Text className="text-3xl text-white font-[Poppins-Medium]">
                      You have no Mentions yet! 🙂
                    </Text>
                  ) : showOnActive === 3 ? (
                    <Text className="text-3xl text-white font-[Poppins-Medium]">
                      You have no Followers yet! 🙂
                    </Text>
                  ) : null}
                </View>
              )}

              {acitve === 0 && (
                <FlatList
                  data={notifications}
                  // ListEmptyComponent={() => (
                  //   <View>
                  //     <Text className="pl-3 text-[28px] text-center  mt-8 text-white font-[Poppins-Bold]">
                  //       Opps! No Notifications here.
                  //     </Text>
                  //     <TouchableOpacity className="bg-white p-2 rounded-md items-center justify-center w-[90%] ml-[22px]">
                  //       <Text className="text-black font-[Poppins-Bold] text-xl">
                  //         Invite Friends.
                  //       </Text>
                  //     </TouchableOpacity>
                  //   </View>
                  // )}
                  renderItem={({item}) => {
                    const time = item.createdAt;
                    const formittedDuration = getTimeDuration(time);
                    const handleNavigation = async (item: any) => {
                      const token = await AsyncStorage.getItem('token');
                      const id = item.creator._id;
                      await axios
                        .get(
                          `http://192.168.100.16:8000/api/v1/get-user/${id}`,
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          },
                        )
                        .then(response => {
                          navigation.navigate('UserProfile', {
                            item: response.data.user,
                          });
                        });
                    };
                    return (
                      <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => handleNavigation(item)}>
                        <View className="flex-row items-center">
                          <Image
                            source={{uri: item?.creator?.avatar?.url}}
                            width={40}
                            height={40}
                            borderRadius={100}
                          />
                          <View className="pl-3 my-2">
                            <View className="flex-row w-full items-center border-b border-gray-400">
                              <View className="w-full">
                                <View className="flex-row items-center">
                                  <Text className="text-[18px] text-white font-[Poppins-SemiBold]">
                                    {item.creator.name}
                                  </Text>
                                  <Text className="text-[13px] text-gray-400 font-[Poppins-Regular] pl-3">
                                    {formittedDuration} ago
                                  </Text>
                                </View>
                                <Text className="text-[16px] text-gray-300 font-[Poppins-Regular] pl-2">
                                  {item.title}.
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              )}
            </View>
          </SafeAreaView>
        )}
      </View>
    </>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({});
