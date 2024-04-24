import {
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import getTimeDuration from './TimeGeneratorFile';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  addLikes,
  getAllPosts,
  removeLikes,
} from '../../redux/actions/postAction';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
const PostCard = ({item, isReply, postId}) => {
  const {user} = useSelector((state: any) => state.user);
  const {posts} = useSelector((state: any) => state.post);
  const [openModal, setOpenModal] = useState(false);
  const [loadingWhileDeleting, setLoadingWhileDeleting] = useState(false);
  const dispatch = useDispatch();
  const time = item.createdAt;
  const formittedDuration = getTimeDuration(time);
  const navigation = useNavigation();
  const reactsHandler = async (e: any) => {
    if (item.likes.lenght !== 0) {
      const isLikeBefore = item.likes.find((i: any) => i.userId === user._id);
      if (isLikeBefore) {
        removeLikes({postId: e._id, posts, user})(dispatch);
      } else {
        addLikes({postId: e._id, posts, user})(dispatch);
      }
    } else {
      addLikes({postId: e._id, posts, user})(dispatch);
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
  const deletePostHandler = async (e: any) => {
    setLoadingWhileDeleting(true);
    const token = await AsyncStorage.getItem('token');
    axios
      .delete(`http://192.168.100.16:8000/api/v1/delete-post/${e}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res: any) => {
        setLoadingWhileDeleting(false);
        getAllPosts()(dispatch);
      });
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
          <View>
            <Text className=" text-gray-500 font-[Poppins-Regular] text-xs">
              {formittedDuration}
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                item.user._id === user._id && setOpenModal(true);
              }}>
              <Image
                source={require('../../assets/menu.png')}
                className="w-6 h-6 my-1"
              />
            </TouchableOpacity>
          </View>
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
            <TouchableOpacity onPress={() => reactsHandler(item)}>
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
        {openModal && (
          <View className="flex-1 justify-center items-center mt-[16]">
            <Modal
              animationType="fade"
              transparent={true}
              visible={openModal}
              onRequestClose={() => {
                setOpenModal(!openModal);
              }}>
              <TouchableWithoutFeedback onPress={() => setOpenModal(false)}>
                <View className="flex-[1] justify-end bg-[#00000010]">
                  <TouchableWithoutFeedback onPress={() => setOpenModal(true)}>
                    <View className="w-full bg-[#fff] h-[120] rounded-[20px] p-[20px] items-center shadow-[#000] shadow-inner">
                      <TouchableOpacity
                        className="w-full bg-[#1a191910] h-[50px] rounded-[10px] items-center flex-row pl-5"
                        onPress={() => {
                          deletePostHandler(item._id);
                        }}>
                        {loadingWhileDeleting == true ? (
                          <View className="text-center w-full">
                            <ActivityIndicator color={'black'} size={'small'} />
                          </View>
                        ) : (
                          <>
                            <Text className="text-[18px] font-[600] text-[#e24848]">
                              Delete
                            </Text>
                          </>
                        )}
                      </TouchableOpacity>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          </View>
        )}
      </View>
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({});
