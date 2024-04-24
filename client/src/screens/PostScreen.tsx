import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import {showMessage} from 'react-native-flash-message';
import {createPostAction, getAllPosts} from '../../redux/actions/postAction';
const PostScreen = () => {
  const navigation = useNavigation();
  const {user} = useSelector((state: any) => state.user);
  const {post, isLoading, isSuccess} = useSelector((state: any) => state.post);
  const [activeIndex, setActiveIndex] = useState(0);
  const [active, setActive] = useState(false);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const dispatch = useDispatch();
  console.log(isSuccess);
  useEffect(() => {
    if (
      replies.length === 1 &&
      replies[0].title === '' &&
      replies[0].image === ''
    ) {
      setReplies([]);
    }
    if (isSuccess) {
      navigation.goBack();
      getAllPosts()(dispatch);
    }
    setReplies([]);
    setTitle('');
    setImage('');
  }, [isSuccess, post]);
  const [replies, setReplies] = useState([{title: '', image: '', user}]);
  const handleTitleChange = (index: number, text: string) => {
    setReplies(prevPost => {
      const updatedPost = [...prevPost];
      updatedPost[index] = {...updatedPost[index], title: text};
      return updatedPost;
    });
  };
  const uploadImage = (index: number) => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.9,
      includeBase64: true,
    }).then((image: ImageOrVideo | null) => {
      if (image) {
        setReplies(prevPost => {
          const updatedPost = [...prevPost];
          updatedPost[index] = {
            ...updatedPost[index],
            image: 'data:image/jpeg;base64,' + image?.data,
          };
          return updatedPost;
        });
      }
    });
  };

  const addNewThread = () => {
    if (
      replies[activeIndex].title !== '' ||
      replies[activeIndex].image !== ''
    ) {
      setReplies(prevPost => [...prevPost, {title: '', image: '', user}]);
      setActiveIndex(replies.length);
    }
  };
  const removeThread = (index: number) => {
    if (replies.length > 0) {
      const updatedPost = [...replies];
      updatedPost.splice(index, 1);
      setReplies(updatedPost);
      setActiveIndex(replies.length - 1);
    } else {
      setReplies([{title: '', image: '', user}]);
    }
  };

  const addFresheNewThread = () => {
    if (title !== '' || image !== '') {
      setActive(true);
      setReplies(prevPost => [...prevPost, {title: '', image: '', user}]);
      setActiveIndex(replies.length);
    }
  };

  const postImageUpload = () => {
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
  const createPost = () => {
    if (title === '' && image === undefined) {
      showMessage({
        type: 'danger',
        icon: 'danger',
        message: 'Please write Thread',
        duration: 2500,
      });
    } else {
      createPostAction(title, image, user, replies)(dispatch);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-black justify-between p-3">
      <ScrollView>
        {/* Back Button with Text */}
        <View className="w-full flex-row items-center">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={26} color={'white'} />
          </TouchableOpacity>
          <Text className="pl-4 tex-[20px] font-[Poppins-Bold] text-white">
            New Thread
          </Text>
        </View>
        {/* Back Button with Text */}

        {/* Add Post's Section */}

        <View className="flex-row mt-3">
          <Image
            source={{uri: user?.avatar?.url}}
            height={40}
            width={40}
            borderRadius={100}
          />
          <View className="pl-3 ">
            <View className="w-[90%] justify-between flex-row">
              <Text className="pl-4 tex-[20px] font-[Poppins-Bold] text-white">
                {user?.name}
              </Text>
              <TouchableOpacity activeOpacity={0.5}>
                <AntDesign name="close" size={26} color={'white'} />
              </TouchableOpacity>
            </View>
            <TextInput
              placeholder="Start a Thread..."
              placeholderTextColor={'gray'}
              value={title}
              className="text-[14px] text-white font-[Poppins-Regular] w-[95%] my-2"
              onChangeText={text => setTitle(text)}
            />
            <TouchableOpacity activeOpacity={0.5} onPress={postImageUpload}>
              <AntDesign name="clouduploado" size={26} color={'gray'} /> 
            </TouchableOpacity>
            {image && (
              <View className="mt-3">
                <Image
                  source={{uri: image}}
                  height={350}
                  width={200}
                  alt=""
                  resizeMethod="auto"
                />
              </View>
            )}
            {replies.length === 0 && (
              <View className="flex-row w-full items-center mt-5 opacity-7">
                <Image
                  source={{uri: user?.avatar?.url}}
                  style={{width: 30, height: 30}}
                  borderRadius={100}
                />
                <Text
                  className="pl-3 font-[Poppins-Regular] text-white"
                  onPress={addFresheNewThread}>
                  Add to Thread...
                </Text>
              </View>
            )}
          </View>
        </View>
        {/* Add Post's Section */}

        {/* Add Replies Section */}
        {replies.map((item, index) => (
          <View key={index} className="flex-row mt-3">
            <Image
              source={{uri: user?.avatar?.url}}
              height={40}
              width={40}
              borderRadius={100}
            />
            <View className="pl-3 ">
              <View className="w-[90%] justify-between flex-row">
                <Text className="pl-4 tex-[20px] font-[Poppins-Bold] text-white">
                  {user?.name}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => removeThread(index)}>
                  <AntDesign name="close" size={26} color={'white'} />
                </TouchableOpacity>
              </View>
              <TextInput
                placeholder="Start a Thread..."
                placeholderTextColor={'gray'}
                value={item.title}
                className="text-[14px] text-white font-[Poppins-Regular] "
                onChangeText={text => handleTitleChange(index, text)}
              />
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => uploadImage(index)}>
                <AntDesign name="clouduploado" size={26} color={'gray'} />
              </TouchableOpacity>
              {item.image && (
                <View className="mt-3">
                  <Image
                    source={{uri: item.image}}
                    height={350}
                    width={200}
                    alt=""
                    resizeMethod="auto"
                  />
                </View>
              )}
              {index === activeIndex && (
                <View className="flex-row w-full items-center mt-5 opacity-7">
                  <Image
                    source={{uri: user?.avatar?.url}}
                    style={{width: 30, height: 30}}
                    borderRadius={100}
                  />
                  <Text
                    className="pl-3 font-[Poppins-Regular] text-white"
                    onPress={addNewThread}>
                    Add to Thread...
                  </Text>
                </View>
              )}
            </View>
          </View>
        ))}
        {/* Add Replies Section */}
      </ScrollView>
      {/* Bottom  Post Button */}
      <View className="p-2 flex-row justify-between">
        <Text className="tex-[20px] mt-4 font-[Poppins-Medium] text-white">
          Anyone can reply.
        </Text>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={createPost}
          className="bg-white rounded-md w-[30%] items-center justify-center h-[40px]">
          {isLoading ? (
            <>
              <ActivityIndicator color={'black'} size={'large'} />
            </>
          ) : (
            <Text className="text-black font-[Poppins-Medium]">Post</Text>
          )}
        </TouchableOpacity>
      </View>
      {/* Bottom  Post Button */}
    </SafeAreaView>
  );
};

export default PostScreen;

const styles = StyleSheet.create({});
