import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
  Animated, Easing, RefreshControl
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {getAllPosts} from '../../redux/actions/postAction';
import {useDispatch, useSelector} from 'react-redux';
import PostCard from '../components/PostCard';
import Lottie from 'lottie-react-native';
const loader=require("../../assets/animation_lkbqh8co.json")
type Props = {};

const HomeScreen = (props: Props) => {
  const dispatch = useDispatch();
  const [offsetY, setOffsetY] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [extraPaddingTop] = useState(new Animated.Value(0));
  const refreshingHeight = 100;
  const lottieViewRef = useRef<Lottie>(null);
  const {posts, isLoading} = useSelector((state: any) => state.post);
  let progress = 0;
  if (offsetY < 0 && !isRefreshing) {
    const maxOffsetY = -refreshingHeight;
    progress = Math.min(offsetY / maxOffsetY, 1);
  }

  function onScroll(event: any) {
    const {nativeEvent} = event;
    const {contentOffset} = nativeEvent;
    const {y} = contentOffset;
    setOffsetY(y);
  }

  function onRelease() {
    if (offsetY <= -refreshingHeight && !isRefreshing) {
      setIsRefreshing(true);
      setTimeout(() => {
        getAllPosts()(dispatch);
        setIsRefreshing(false);
      }, 3000);
    }
  }

  function onScrollEndDrag(event: any) {
    const {nativeEvent} = event;
    const {contentOffset} = nativeEvent;
    const {y} = contentOffset;
    setOffsetY(y);

    if (y <= -refreshingHeight && !isRefreshing) {
      setIsRefreshing(true);
      setTimeout(() => {
        getAllPosts()(dispatch);
        setIsRefreshing(false);
      }, 3000);
    }
  }
  useEffect(() => {
    getAllPosts()(dispatch);
    // getAllUsers()(dispatch);
  }, []);
  useEffect(() => {
    if (isRefreshing) {
      Animated.timing(extraPaddingTop, {
        toValue: refreshingHeight,
        duration: 0,
        useNativeDriver: false,
      }).start();
      lottieViewRef.current?.play();
    } else {
      Animated.timing(extraPaddingTop, {
        toValue: 0,
        duration: 400,
        easing: Easing.elastic(1.3),
        useNativeDriver: false,
      }).start();
    }
  }, [isRefreshing]);

  return (
    <View className="bg-black flex-1">
      {isLoading ? (
        <View className="mt-40">
          <ActivityIndicator color={'white'} size={'large'} />
        </View>
      ) : (
        <>
          <SafeAreaView>
            <FlatList
              data={posts}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => <PostCard item={item} />}
            />
          </SafeAreaView>
        </>
      )}
    </View>
  );
};

export default HomeScreen;
