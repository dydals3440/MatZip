import React from 'react';
import {StyleSheet, View} from 'react-native';
import HeaderButton from '../common/HeaderButton';
import {colors} from '@/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {FeedStackParamlist} from '@/navigations/stack/FeedStackNavigator';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import useThemeStore from '@/store/useThemeStore';

// typing navigation은 maindrawer와 feedstack이 함께 사용되는 스크린이기 떄문에, 여기도 CompositeNavigationProp을 이용해서 스택과 드로워를 합쳐줌.

type FeedHomeHeaderLeftProps = CompositeNavigationProp<
  StackNavigationProp<FeedStackParamlist>,
  DrawerNavigationProp<MainDrawerParamList>
>;

const FeedHomeHeaderLeft = (navigation: FeedHomeHeaderLeftProps) => {
  const {theme} = useThemeStore();

  return (
    <HeaderButton
      icon={
        <Ionicons
          name="menu"
          color={colors[theme].BLACK}
          size={25}
          onPress={() => navigation.openDrawer()}
        />
      }
    />
  );
};

const styles = StyleSheet.create({});

export default FeedHomeHeaderLeft;
