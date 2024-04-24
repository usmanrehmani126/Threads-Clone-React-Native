import {useEffect, useState} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  Pressable,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  followUserAction,
  getAllUsers,
  unFollowUserAction,
} from '../../redux/actions/userActions';
const SearchScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const {users, user, isLoading} = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    getAllUsers()(dispatch);
  }, [dispatch]);
  useEffect(() => {
    if (users) {
      setData(users);
    }
  }, [users]);
  const handleSearchChange = (e: any) => {
    if (e.length !== 0) {
      const filterUsers =
        users &&
        users.filter((i: any) =>
          i.name.toLowerCase().includes(e.toLowerCase()),
        );
      setData(filterUsers);
    } else {
      setData(data);
    }
  };

  return (
    <View className="flex-1 bg-black">
      <Text className="text-white font-[Poppins-Bold] ml-3 text-2xl mt-3">
        Search
      </Text>
      {isLoading ? (
        <View className="mt-40">
          <ActivityIndicator size={'large'} color={'white'} />
        </View>
      ) : (
        <>
          <SafeAreaView>
            <View className="p-2">
              <View className="relative">
                <Pressable
                  className="absolute top-[18px] left-2 "
                  style={{zIndex: 100}}>
                  <Feather name="search" color={'black'} size={22} />
                </Pressable>
                <TextInput
                  onChangeText={e => handleSearchChange(e)}
                  placeholder="Search by name"
                  className="w-full h-[44px] bg-white rounded-[5px] pl-8 text-black mt-[10px] font-[Poppins-Medium] ml-1"
                  placeholderTextColor={'gray'}
                />
              </View>
              <FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                // ListEmptyComponent={() => (
                //   <View className="">
                //     <Text className="pl-3 text-[28px] text-center  mt-8 text-white font-[Poppins-Bold]">
                //       Opps! No User's Here!.
                //     </Text>
                //     <TouchableOpacity className="bg-white p-2 rounded-md items-center justify-center w-[90%] ml-[22px]">
                //       <Text className="text-black font-[Poppins-Bold] text-xl">
                //         Invite Friends.
                //       </Text>
                //     </TouchableOpacity>
                //   </View>
                // )}
                renderItem={({item, index}) => {
                  const showCount = index + 1 != item.length;
                  let showBorder = showCount ? 'border-b border-gray-700' : '';
                  const handleFollowUnfollow = async (e: any) => {
                    try {
                      if (e.followers.find((i: any) => i.userId === user._id)) {
                        // This is for Unfollow Feature
                        await unFollowUserAction({
                          userId: user._id,
                          users,
                          followUserId: e._id,
                        })(dispatch);
                      } else {
                        // This is for Follow Feature
                        await followUserAction({
                          userId: user._id,
                          users,
                          followUserId: e._id,
                        })(dispatch);
                      }
                    } catch (error) {
                      console.log(error.message);
                    }
                  };
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('UserProfile', {item: item})
                      }
                      activeOpacity={0.7}
                      className=" mt-6 flex-row">
                      <Image
                        source={{uri: item?.avatar?.url}}
                        width={30}
                        height={30}
                        borderRadius={100}
                      />
                      <View
                        className={`w-[90%] flex-row justify-between pb-2 `}>
                        <View>
                          <Text className="pl-3 text-[18px] text-white font-[Poppins-Medium]">
                            {item.name}
                          </Text>
                          <Text className="pl-3 text-[14px] text-gray-400 font-[Poppins-Medium]">
                            {item.userName}
                          </Text>
                          <Text className="pl-3 text-sm text-gray-400 font-[Poppins-Regular]">
                            {item.followers.length} followers
                          </Text>
                        </View>
                        <View>
                          <TouchableOpacity
                            onPress={() => handleFllowUnFollow(item)}
                            activeOpacity={0.6}
                            className="rounded-[8px] w-[100px] flex-row items-center justify-center h-[35px] border border-white"
                            onPress={() => handleFollowUnfollow(item)}>
                            <Text className="pl-3 text-sm text-white font-[Poppins-Regular]">
                              {item.followers.find(
                                (i: any) => i.userId === user._id,
                              )
                                ? 'Following'
                                : 'Follow'}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </SafeAreaView>
        </>
      )}
    </View>
  );
};

export default SearchScreen;
