import {createDrawerNavigator} from '@react-navigation/drawer';

import CalendarHomeScreen from '@/screens/calendar/CalendarHomeScreen';
import MapStackNavigator, {MapStackParamList} from '../stack/MapStackNavigator';
import {colors, mainNavigations} from '@/constants';
import {NavigatorScreenParams, RouteProp} from '@react-navigation/native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Dimensions} from 'react-native';
import CustomDrawerContent from './CustomDrawerContent';

import FeedTabNavigator, {FeedTabParamList} from '../tab/FeedTabNavigator';
import FeedHomeHeaderLeft from '@/components/feed/FeedHomeHeaderLeft';
import SettingStackNavigator, {
  SettingStackParamlist,
} from '../stack/SettingStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/common';

export type MainDrawerParamList = {
  [mainNavigations.HOME]: NavigatorScreenParams<MapStackParamList>;
  [mainNavigations.FEED]: NavigatorScreenParams<FeedTabParamList>;
  [mainNavigations.CALENDAR]: undefined;
  [mainNavigations.SETTING]: NavigatorScreenParams<SettingStackParamlist>;
};

const Drawer = createDrawerNavigator<MainDrawerParamList>();

function DrawerIcons(
  route: RouteProp<MainDrawerParamList>,
  focused: boolean,
  theme: ThemeMode,
) {
  let iconName = '';

  switch (route.name) {
    case mainNavigations.HOME: {
      iconName = 'location-on';
      break;
    }
    case mainNavigations.FEED: {
      iconName = 'book';
      break;
    }
    case mainNavigations.CALENDAR: {
      iconName = 'event-note';
      break;
    }
    case mainNavigations.SETTING: {
      iconName = 'settings';
      break;
    }
  }

  return (
    <MaterialIcons
      name={iconName}
      size={18}
      color={focused ? colors[theme].UNCHANGE_BLACK : colors[theme].GRAY_500}
    />
  );
}

function MainDrawerNavigator() {
  const {theme} = useThemeStore();

  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      screenOptions={({route}) => ({
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          width: Dimensions.get('screen').width * 0.6,
          backgroundColor: colors[theme].WHITE,
        },
        drawerActiveTintColor: colors[theme].UNCHANGE_BLACK,
        drawerInactiveTintColor: colors[theme].GRAY_500,
        // 클릭시 색상
        drawerActiveBackgroundColor:
          theme === 'light' ? colors[theme].PINK_200 : colors[theme].PINK_500,
        drawerInactiveBackgroundColor: colors[theme].GRAY_100,
        drawerLabelStyle: {
          fontWeight: '600',
        },
        drawerIcon: ({focused}) => DrawerIcons(route, focused, theme),
      })}>
      <Drawer.Screen
        name={mainNavigations.HOME}
        component={MapStackNavigator}
        options={{
          title: '홈',
          // 손으로, 왼쪽 끝에 이렇게 스왑했을떄 켜지는 드로어 열리는 현상. 방지.
          swipeEnabled: false,
        }}
      />
      <Drawer.Screen
        name={mainNavigations.FEED}
        component={FeedTabNavigator}
        options={{
          title: '피드',
        }}
      />
      <Drawer.Screen
        name={mainNavigations.CALENDAR}
        component={CalendarHomeScreen}
        options={({navigation}) => ({
          title: '캘린더',
          headerShown: true,
          headerLeft: () => FeedHomeHeaderLeft(navigation),
          headerStyle: {
            backgroundColor: colors[theme].WHITE,
            shadowColor: colors[theme].GRAY_200,
          },
          headerTintColor: colors[theme].BLACK,
          headerTitleStyle: {
            fontSize: 15,
          },
        })}
      />
      <Drawer.Screen
        name={mainNavigations.SETTING}
        component={SettingStackNavigator}
        options={{
          title: '설정',
          drawerItemStyle: {
            height: 0,
          },
        }}
      />
    </Drawer.Navigator>
  );
}

export default MainDrawerNavigator;
