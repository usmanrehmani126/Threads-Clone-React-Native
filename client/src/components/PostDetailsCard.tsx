import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import getTimeDuration from './TimeGeneratorFile';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  addLikes,
  addLikesToReply,
  removeLikes,
} from '../../redux/actions/postAction';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
const PostDetailsCard = ({item, isReply, postId}) => {
  const {user} = useSelector((state: any) => state.user);
  const {posts} = useSelector((state: any) => state.post);
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const time = item.createdAt;
  const formittedDuration = getTimeDuration(time);
  const navigation = useNavigation();
  const reactsHandler = async (e: any) => {
    if (item.likes.length !== 0) {
      const isLikeBefore = item.likes.find((i: any) => i.userId === user._id);
      if (isLikeBefore) {
        removeLikes({postId: postId ? postId : e._id, posts, user})(dispatch);
      } else {
        addLikes({postId: postId ? postId : e._id, posts, user})(dispatch);
      }
    } else {
      addLikes({postId: postId ? postId : e._id, posts, user})(dispatch);
    }
  };
  const profileHandler = async (e: any) => {
    const token = await AsyncStorage.getItem('token');
    await axios
      .get(`http://192.168.100.16:8000/api/v1/get-user/${e._id}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        if (res.data.user._id !== user._id) {
          navigation.navigate('UserProfile', {
            item: res.data.user,
          });
        } else {
          navigation.navigate('Profile');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const replyReactsHandler = (e: any) => {
    if (e.likes.length !== 0) {
      const isLikeBefore = e.likes.find((i: any) => i.userId === user._id);
      if (isLikeBefore) {
        removeLikes({postId: e._id, posts, user})(dispatch);
      } else {
        addLikes({postId: e._id, posts, user})(dispatch);
      }
    } else {
      addLikesToReply({
        postId: postId ? postId : e._id,
        posts,
        replyId: e._id,
        user,
        title: e.title,
      })(dispatch);
    }
  };
  return (
    <View className="p-[10px] border-b border-b-gray-700">
      <View>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-4">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => profileHandler(item.user)}>
              <Image
                source={{uri: item?.user?.avatar?.url}}
                width={35}
                height={35}
                borderRadius={100}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => profileHandler(item.user)}>
              <Text className=" text-white font-[Poppins-SemiBold] text-md">
                {item?.user?.name}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => profileHandler(item.user)}></TouchableOpacity>
          <Text className=" text-gray-500 font-[Poppins-Regular] text-xs">
            {formittedDuration}
          </Text>
        </View>
        {item.title && (
          <Text className=" text-gray-300 font-[Poppins-Regular] text-sm w-72 ml-12 mb-2">
            {item?.title}
          </Text>
        )}
        <View className="ml-[40px] my-1">
          {item.image && (
            <Image
              source={{uri: item.image.url}}
              style={{aspectRatio: 1, borderRadius: 10, zIndex: 1111}}
            />
          )}
        </View>
        {item.image ? (
          <View className="absolute top-12 left-6 h-[90%] w-[1px] bg-[#171717]" />
        ) : (
          <View className="absolute top-12 left-6 h-[60%] w-[1px] bg-[#011222]" />
        )}

        <View className="flex-row items-center justify-between ml-[40px] mt-3">
          <View className="flex-row items-center gap-3">
            <TouchableOpacity
              onPress={() =>
                isReply ? reactsHandler(item) : replyReactsHandler(item)
              }>
              {item.likes.length > 0 ? (
                <>
                  {item.likes.find((i: any) => i.userId === user._id) ? (
                    <Image
                      source={{
                        uri: 'https://cdn-icons-png.flaticon.com/512/2589/2589175.png',
                      }}
                      width={30}
                      height={30}
                    />
                  ) : (
                    <Entypo name="heart" size={26} color={'white'} />
                  )}
                </>
              ) : (
                <Entypo name="heart" size={26} color={'white'} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CreateRepliesScreen', {
                  item: item,
                  postId: postId,
                })
              }
              activeOpacity={0.4}
              className="flex-row items-center gap-1">
              <EvilIcons name="comment" size={28} color={'white'} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.4}
              className="flex-row items-center gap-1">
              <Feather name="repeat" size={22} color={'white'} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.4}
              className="flex-row items-center gap-1">
              <Feather name="send" size={22} color={'white'} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity activeOpacity={0.7}>
            <Ionicons name="bookmark-outline" size={22} color={'white'} />
          </TouchableOpacity>
        </View>
        {!isReply && (
          <View className="pl-[50px] mt-2 flex-row">
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() =>
                navigation.navigate('PostDetailScreen', {
                  data: item,
                })
              }>
              <Text className=" text-gray-500 font-[Poppins-Regular] text-xs">
                {item.replies.length !== 0 &&
                  `${item.replies.length} replies .`}{' '}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6}>
              <Text className=" text-gray-500 font-[Poppins-Regular] text-xs">
                {item.likes.length} {item.likes.length > 1 ? 'likes' : 'like'}{' '}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {item.reply && (
        <>
          {item.reply.length !== 0 && (
            <>
              <View className="flex-row items-center">
                <TouchableOpacity
                  className="flex-row items-center"
                  onPress={() => setActive(!active)}>
                  <Text className="font-[Poppins-Regular] text-[14px] ml-[40px] mt-[10px]">
                    {active ? 'Hide replies' : 'View replies'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center">
                  <Text className="font-[Poppins-Regular] text-[14px] ml-[10px] mt-[10px]">
                    {item.likes.length}
                    {item.likes.length > 1 ? ' Likes' : ' Like'}{' '}
                  </Text>
                </TouchableOpacity>
              </View>
              {active && (
                <>
                  {item.reply.map((i: any, index: number) => {
                    return (
                      <PostDetailsCard
                        item={i}
                        key={i._id}
                        isReply={true}
                        postId={item._id}
                      />
                    );
                  })}
                </>
              )}
            </>
          )}
        </>
      )}
    </View>
  );
};

export default PostDetailsCard;

const styles = StyleSheet.create({});

