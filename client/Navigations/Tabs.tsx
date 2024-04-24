import {View, Text, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../src/screens/HomeScreen';
import SearchScreen from '../src/screens/SearchScreen';
import PostScreen from '../src/screens/PostScreen';
import NotificationScreen from '../src/screens/NotificationScreen';
import ProfileScreen from '../src/screens/ProfileScreen';

type Props = {};

const Tab = createBottomTabNavigator();
const tabBarStyle = {
  backgroundColor: 'black',
  borderTopWidth: 0,
  elevation: 0, // This will remove the shadow on Android
  shadowOpacity: 0, // This will remove the shadow on iOS
};
const Tabs = (props: Props) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="Home2"
        component={HomeScreen}
        options={({route}) => ({
          unmountOnBlur: true,
          tabBarStyle: tabBarStyle,
          tabBarIcon: ({focused}) => (
            <Image
              source={{
                uri: focused
                  ? 'https://cdn-icons-png.flaticon.com/128/3917/3917032.png'
                  : 'https://cdn-icons-png.flaticon.com/128/3917/3917014.png',
              }}
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? 'white' : '#444',
              }}
            />
          ),
        })}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={({route}) => ({
          unmountOnBlur: true,
          tabBarStyle: tabBarStyle,

          tabBarIcon: ({focused}) => (
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/3917/3917132.png',
              }}
              style={{
                width: focused ? 26 : 24,
                height: 25,
                tintColor: focused ? 'white' : '#444',
              }}
            />
          ),
        })}
      />

      <Tab.Screen
        name="Post"
        component={PostScreen}
        options={({route}) => ({
          tabBarStyle: tabBarStyle,
          // unmountOnBlur: true,
          tabBarStyle: {display: route.name === 'Post' ? 'none' : 'flex'},
          tabBarIcon: ({focused}) => (
            <Image
              source={{
                uri: focused
                  ? 'https://cdn-icons-png.flaticon.com/512/10015/10015412.png'
                  : 'https://cdn-icons-png.flaticon.com/512/10015/10015412.png',
              }}
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? '#000' : '#444',
              }}
            />
          ),
        })}
      />

      <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={({route}) => ({
          unmountOnBlur: true,
          tabBarStyle: tabBarStyle,

          tabBarIcon: ({focused}) => (
            <Image
              source={{
                uri: focused
                  ? 'https://cdn-icons-png.flaticon.com/512/1077/1077086.png'
                  : 'https://cdn-icons-png.flaticon.com/512/1077/1077035.png',
              }}
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? 'white' : '#444',
              }}
            />
          ),
        })}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({route}) => ({
          unmountOnBlur: true,

          tabBarStyle: tabBarStyle,
          tabBarIcon: ({focused}) => (
            <Image
              source={{
                uri: focused
                  ? 'https://cdn-icons-png.flaticon.com/128/1077/1077114.png'
                  : 'https://cdn-icons-png.flaticon.com/512/1077/1077063.png',
              }}
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? 'white' : '#444',
              }}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
