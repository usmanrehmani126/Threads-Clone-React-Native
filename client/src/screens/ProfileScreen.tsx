import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import PostCard from '../components/PostCard';

const Profile = () => {
  const {user, loading} = useSelector((state: any) => state.user);
  const {posts} = useSelector((state: any) => state.post);
  const [active, setActive] = useState(0);
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const [loadingPost, setPostLoading] = useState(true);
  useEffect(() => {
    setPostLoading(true);
    if (posts) {
      const mPosts = posts.filter((item: any) => item.user._id === user._id);
      setData(mPosts);
      setPostLoading(false);
    }
    setPostLoading(false);
  }, [posts]);
  return (
    <View className="flex-1 bg-black">
      {loading ? (
        <ActivityIndicator size={'large'} color={'white'} />
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="">
              <View className="-mt-2">
                {/* Main Image  */}
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1688668603709-4df6a026ed88?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGhyZWFkcyUyMGFwcHxlbnwwfHwwfHx8MA%3D%3D',
                  }}
                  className="w-full h-32"
                  style={{
                    borderBottomLeftRadius: 30,
                    borderBottomRightRadius: 30,
                  }}
                />

                {/* Main Image  */}

                {/* User Profile name,back button,edit button  */}
                <View className="absolute top-6 left-6">
                  <View
                    className=" flex-row items-center justify-between"
                    style={{width: 350}}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => navigation.goBack()}
                      className="w-10 h-10 rounded-full bg-white items-center justify-center">
                      <MaterialIcons
                        name="arrow-back"
                        color={'black'}
                        size={22}
                      />
                    </TouchableOpacity>
                    <Text className=" text-white font-[Poppins-Bold]  text-md mt-3 ">
                      {user?.userName}
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      className="w-10 h-10 rounded-full bg-white items-center justify-center"
                      onPress={() => navigation.navigate('SettingScreen')}>
                      <AntDesign name="setting" size={20} color={'black'} />
                    </TouchableOpacity>
                  </View>
                </View>
                {/* User Profile name,back button,edit button  */}

                {/* User Profile image,user secondN name,email etc  */}

                <View className="items-center justify-center -mt-14">
                  <Image
                    source={{
                      uri: user?.avatar?.url
                        ? user?.avatar?.url
                        : 'https://images.unsplash.com/photo-1570498839593-e565b39455fc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGZvb3RiYWxsJTIwcGxheWVyJTIwaW1hZ2VzfGVufDB8fDB8fHww',
                    }}
                    className="w-24 h-24 rounded-full"
                  />

                  <Text className=" text-gray-100 font-[Poppins-Medium]  text-md mt-3 ">
                    {user?.name}
                  </Text>
                  <View className="flex-row items-center justify-center gap-2 mb-2">
                    <Feather name="link-2" color={'white'} size={22} />
                    <Text className=" text-white font-[Poppins-Regular] text-sm">
                      {user?.email}
                    </Text>
                  </View>
                  <Text className=" text-gray-500 font-[Poppins-Regular] text-sm w-[90%]">
                  
                    {user?.bio ? user.bio : null}
                  </Text>
                </View>
                {/*  User Profile image,user secondN name,email etc   */}
              </View>

              {/*  User Followers,posts,likes section   */}
              <Text
                className={` font-[Poppins-SemiBold] text-xl text-white ml-2 mt-2`}>
                Your Activity:
              </Text>
              <View className=" justify-center mt-2 flex-row items-center">
                <View className="mr-11">
                  <Text
                    className={` font-[Poppins-SemiBold] text-xl text-white ml-2`}>
                    {user?.followers.length}
                  </Text>
                  <Text className="text-gray-400 font-[Poppins-Regular] text-xs ml-1 ">
                    Followers
                  </Text>
                </View>
                <View className="mr-11">
                  <Text
                    className={` font-[Poppins-SemiBold] text-xl ml-4 text-white`}>
                    {user?.following.length}
                  </Text>
                  <Text
                    className={`text-gray-400 font-[Poppins-Regular] text-xs ml-1 `}>
                    Following
                  </Text>
                </View>
              </View>

              <View className=" border-b border-b-gray-600  mt-8 px-1">
                <View className="flex-row items-center justify-between">
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => setActive(0)}
                    className=" w-[50%]">
                    <Text
                      className="text-white font-[Poppins-SemiBold] pl-2 text-[18px]  text-center"
                      style={{
                        opacity: active === 0 ? 1 : 0.7,
                        borderBottomWidth: active === 0 ? 2.3 : 0,
                        borderBottomColor: 'white',
                      }}>
                      Threads
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => setActive(1)}
                    style={{
                      opacity: active === 1 ? 1 : 0.7,
                      borderBottomWidth: active === 1 ? 2.3 : 0,
                      borderBottomColor: 'white',
                    }}
                    className="w-[50%]">
                    <Text className="text-white font-[Poppins-SemiBold] pl-2 text-[18px]  text-center">
                      Replies
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {active === 0 && (
                <>
                  {loadingPost ? (
                    <View className="mt-5">
                      <ActivityIndicator size={'small'} color={'white'} />
                    </View>
                  ) : (
                    <>
                      {data &&
                        data.map((item: any) => (
                          <PostCard
                            item={item}
                            key={item._id}
                            navigation={navigation}
                          />
                        ))}
                      {data.length === 0 && (
                        <View className="items-center justify-center mt-6">
                          <Text className="text-xl text-white font-[Poppins-Bold]">
                            No post's found
                          </Text>
                          <Pressable
                            className="bg-white w-[80%] mt-6 rounded-full items-center justify-center h-12"
                            onPress={() => navigation.navigate('Post')}>
                            <Text className="text-md text-black font-[Poppins-SemiBold]">
                              Let's create new Post
                            </Text>
                          </Pressable>
                        </View>
                      )}
                    </>
                  )}
                </>
              )}

              {active === 1 && (
                <>
                  {loadingPost ? (
                    <View className="mt-5">
                      <ActivityIndicator size={'small'} color={'white'} />
                    </View>
                  ) : (
                    <>
                      {/* {data &&
                        data.map((item: any) => (
                          <PostCard
                            item={item}
                            key={item._id}
                            navigation={navigation}
                          />
                        ))} */}
                      {/* {data.length === 0 && ( */}
                        <View className="items-center justify-center mt-6">
                          <Text className="text-xl text-white font-[Poppins-Bold]">
                            No Replies
                          </Text>
                        </View>
                      {/* )} */}
                    </>
                  )}
                </>
              )}
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default Profile;

