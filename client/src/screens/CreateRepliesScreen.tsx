import {useNavigation, useRoute} from '@react-navigation/native';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import {useState} from 'react';
import getTimeDuration from '../components/TimeGeneratorFile';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAllPosts} from '../../redux/actions/postAction';

const CreateRepliesScreen = ({}) => {
  const {user} = useSelector((state: any) => state.user);
  const route = useRoute();
  const post = route.params.item;
  const postId = route.params.postId;
  console.log('>>>>>>>>>>>>>>post card from create replies screen', postId);
  const navigation = useNavigation();
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const time = post.createdAt;
  const dispatch = useDispatch();
  const formattedTime = getTimeDuration(time);
  const imageUpload = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.9,
      includeBase64: true,
    }).then((image: ImageOrVideo | null) => {
      if (image) {
        setImage('data:image/jpeg;base64,' + image.data);
      }
    });
  };
  const createReplies = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!title && !image) {
      showMessage({
        type: 'danger',
        icon: 'danger',
        message: 'Please add reply',
        duration: 2500,
      });
    }
    try {
      setLoading(true);
      if (!postId) {
        await axios
          .put(
            'http://192.168.100.16:8000/api/v1/add-replies',
            {
              postId: post._id,
              title,
              image,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          .then(response => {
            // navigation.goBack();
            // setLoading(false);
            getAllPosts()(dispatch);
            navigation.navigate('PostDetailScreen', {
              data: response.data.post,
            });
            setTitle('');
            setImage('');
            setLoading(false);
          });
      } else {
        setLoading(true);
        await axios
          .put(
            'http://192.168.100.16:8000/api/v1/add-reply',
            {
              postId,
              replyId: post._id,
              title,
              image,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          .then(response => {
            // navigation.goBack();
            setLoading(false);
            getAllPosts()(dispatch);
            navigation.navigate('PostDetailScreen', {
              data: response.data.post,
            });
            setTitle('');
            setImage('');
            setLoading(false);
          });
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-black relative">
      <View className="w-full flex-row posts-center ml-4 mt-2">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color={'white'} />
        </TouchableOpacity>
        <Text className="pl-4 tex-[20px] font-[Poppins-Bold] text-white">
          Replies
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row item-center justify-between p-3">
          <View className="flex-row item-center ml-3 gap-4">
            <Image
              source={{uri: post?.user?.avatar?.url}}
              width={35}
              height={35}
              borderRadius={100}
            />
            <Text className=" text-white font-[Poppins-SemiBold] text-md">
              {post?.user?.name}
            </Text>
          </View>
          <Text className=" text-gray-500 font-[Poppins-Regular] text-xs">
            {formattedTime}
          </Text>
        </View>
        {post.title && (
          <Text className=" text-gray-300 font-[Poppins-Regular] text-sm w-72 ml-12 mb-2">
            {post?.title}
          </Text>
        )}

        <View className="ml-[40px] my-1">
          {post.image && (
            <Image
              source={{uri: post.image.url}}
              style={{aspectRatio: 1, borderRadius: 10, width: '95%'}}
            />
          )}
        </View>
        {post.image ? (
          <View className="absolute top-[90] left-5 h-[90%] w-[1px] bg-[#171717]" />
        ) : (
          <View className="absolute top-[90] left-5 h-[60%] w-[1px] bg-[#011222]" />
        )}

        <View className="p-3">
          <View className="flex-row item-center">
            <Image
              source={{uri: user?.avatar?.url}}
              width={35}
              height={35}
              borderRadius={100}
            />
            <View className="pl-3">
              <Text className="text-white font-[Poppins-SemiBold] text-md">
                {user.name}
              </Text>

              <TextInput
                placeholder={`Reply to ${post.user.name}...`}
                placeholderTextColor={'gray'}
                className="text-white font-[Poppins-Medium] w-60"
                value={title}
                onChangeText={txt => setTitle(txt)}
              />
              <TouchableOpacity activeOpacity={0.5} onPress={imageUpload}>
                <AntDesign name="clouduploado" size={26} color={'gray'} />
              </TouchableOpacity>
              {image && (
                <View className="mt-3">
                  <Image
                    source={{uri: image}}
                    height={250}
                    width={200}
                    alt=""
                    borderRadius={4}
                    resizeMethod="auto"
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
      <View className="p-2 flex-row justify-between">
        <Text className="tex-[20px] mt-4 font-[Poppins-Medium] text-white">
          Anyone can reply.
        </Text>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={createReplies}
          className="bg-white rounded-md w-[30%] items-center justify-center h-[40px]">
          {loading ? (
            <>
              <ActivityIndicator color={'black'} size={'large'} />
            </>
          ) : (
            <Text className="text-black font-[Poppins-Medium]">Post</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreateRepliesScreen;
