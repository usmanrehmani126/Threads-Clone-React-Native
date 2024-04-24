import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../src/screens/SplashScreen';
import Tabs from './Tabs';
import SettingScreen from '../src/screens/SettingScreen';
import UserProfileScreen from '../src/screens/UserProfileScreen';
import CreateRepliesScreen from '../src/screens/CreateRepliesScreen';
import PostDetailScreen from '../src/screens/PostDetailScreen';
import EditProfile from '../src/screens/EditProfile';

type Props = {};

const Main = (props: Props) => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Home" component={Tabs} />
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
      <Stack.Screen name="UserProfile" component={UserProfileScreen} />
      <Stack.Screen
        name="CreateRepliesScreen"
        component={CreateRepliesScreen}
      />
      <Stack.Screen name="PostDetailScreen" component={PostDetailScreen} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
};

export default Main;
