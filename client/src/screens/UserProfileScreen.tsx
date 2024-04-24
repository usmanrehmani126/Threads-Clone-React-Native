import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  SafeAreaView,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  followUserAction,
  unFollowUserAction,
} from '../../redux/actions/userActions';
import {useDispatch, useSelector} from 'react-redux';
import PostCard from '../components/PostCard';

const UserProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const d = route.params.item;
  const [imagePreview, setImagePreview] = useState(false);
  const {user, isLoading, users} = useSelector((state: any) => state.user);
  const {posts} = useSelector((state: any) => state.post);
  const [data, setData] = useState(d);
  const [active, setActive] = useState(0);
  const [postData, setPostData] = useState([]);
  const [loadingPost, setPostLoading] = useState(true);

  useEffect(() => {
    if (users) {
      const userData = users.find((i: any) => i._id === d?._id);
      setData(userData);
    }
    if (posts) {
      setPostLoading(true);
      const uPosts = posts.filter((item: any) => item.user._id === d._id);
      setPostData(uPosts);
      setPostLoading(false);
    }
    setPostLoading(false);
  }, [users, route.params.item]);
  const followUnFollowHandler = async () => {
    try {
      if (data.followers.find((i: any) => i.userId === user._id)) {
        await unFollowUserAction({
          userId: user._id,
          users,
          followUserId: data._id,
        })(dispatch);
      } else {
        await followUserAction({
          userId: user._id,
          users,
          followUserId: data._id,
        })(dispatch);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View className="flex-1 bg-black">
      {data ? (
        <SafeAreaView>
          {imagePreview ? (
            <>
              <TouchableOpacity
                onPress={() => setImagePreview(!imagePreview)}
                className="pt-20 items-center"
                activeOpacity={0.9}>
                <Image
                  source={{uri: data.avatar.url}}
                  width={250}
                  height={250}
                  borderRadius={500}
                />
              </TouchableOpacity>
            </>
          ) : (
            <>
              {isLoading ? (
                <>
                  <ActivityIndicator size={'large'} color={'white'} />
                </>
              ) : (
                <>
                  <View className=" flex-row items-center px-4 mt-2">
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => navigation.goBack()}
                      className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center ">
                      <MaterialIcons
                        name="arrow-back"
                        color={'black'}
                        size={22}
                      />
                    </TouchableOpacity>
                    <Text className="font-[Poppins-SemiBold] text-white text-lg ml-20">
                      Profile
                    </Text>
                  </View>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <View className="p-2 mb-14">
                      <View className="flex-row w-full justify-between">
                        <View className="">
                          <Text className="font-[Poppins-Bold] text-white ml-3 mt-4 text-[22px]">
                            {data.name}
                          </Text>
                          <Text className="font-[Poppins-Regular] text-white ml-3 -mt-2 text-[14px]">
                            {data.userName}
                          </Text>
                          <Text className="font-[Poppins-Regular] text-gray-400  ml-3 text-[14px]">
                            {data?.bio}

                          </Text>
                          <Text className="font-[Poppins-SemiBold] text-white ml-3 text-[14px]">
                            {data.followers.length} followers
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => setImagePreview(!imagePreview)}
                          className="absolute right-4"
                          activeOpacity={0.5}>
                          <Image
                            source={{uri: data.avatar.url}}
                            width={60}
                            height={60}
                            borderRadius={100}
                          />
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity
                        onPress={followUnFollowHandler}
                        className="w-full h-[42px] items-center justify-center flex-row mt-2 bg-white rounded-md"
                        activeOpacity={0.7}>
                        <Text className="font-[Poppins-SemiBold] text-black ml-8 text-[14px]">
                          {data.followers.find(
                            (i: any) => i.userId === user._id,
                          )
                            ? 'Following'
                            : 'Follow'}
                        </Text>
                      </TouchableOpacity>
                      <View className=" border-b border-b-gray-700  mt-4 px-[1px]">
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
                            <Text className="text-white font-[Poppins-SemiBold]  text-[18px]  text-center">
                              Replies
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      {active === 0 && (
                        <>
                          {loadingPost ? (
                            <View className="mt-5">
                              <ActivityIndicator
                                size={'small'}
                                color={'white'}
                              />
                            </View>
                          ) : (
                            <>
                              {postData &&
                                postData.map((item: any) => (
                                  <PostCard
                                    item={item}
                                    key={item._id}
                                    navigation={navigation}
                                  />
                                ))}
                              {postData.length === 0 && (
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
                    </View>
                  </ScrollView>
                </>
              )}
            </>
          )}
        </SafeAreaView>
      ) : (
        <SafeAreaView>
          <View className="mt-32">
            <Text className="font-[Poppins-SemiBold] my-4 text-white items-center text-center text-[14px]">
              This account currently unavailable🙄.
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.goBack()}
              className="w-full h-10 rounded-full bg-gray-100 items-center justify-center ">
              <Text className="font-[Poppins-Regular] text-black text-[14px]">
                GO Back
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({});
