import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PostCard from '../components/PostCard';
import PostDetailsCard from '../components/PostDetailsCard';
import {useSelector} from 'react-redux';

const PostDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const values = route.params.data;
  const {posts} = useSelector((state: any) => state.post);
  const [data, setData] = useState(values);
  useEffect(() => {
    if (posts) {
      const d = posts.find((i: any) => i._id === values._id);
      setData(d);
    }
  }, [posts]);
  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="p-3">
        <View className="w-full flex-row posts-center">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={26} color={'white'} />
          </TouchableOpacity>
          <Text className="pl-4 tex-[20px] font-[Poppins-Bold] text-white">
            Post Activity
          </Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <PostDetailsCard item={data} />
        <View>
          {data?.replies?.map((i: any, index: number) => {
            return (
              <PostDetailsCard
                item={i}
                key={index}
                isReply={true}
                postId={values._id}
              />
            );
          })}
        </View>
        <View className="mb-6"></View>
      </ScrollView>
      <View className="w-full items-center justify-center bg-white  rounded-[40px]  h-[40px] flex-row">
        <TouchableOpacity
          className="w-[90%] h-[35px] flex-row items-center"
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('CreateRepliesScreen', {
              item: values,
            });
          }}>
          <Image
            source={{uri: values.user.avatar.url}}
            width={30}
            height={30}
            borderRadius={100}
          />
          <Text className="text-gray-500 ml-5 font-[Poppins-Medium] text-base">
            Reply to {values.user.name}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PostDetailScreen;

const styles = StyleSheet.create({});
