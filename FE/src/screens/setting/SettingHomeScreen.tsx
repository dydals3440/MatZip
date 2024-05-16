import DarkModeOption from '@/components/setting/DarkModeOption';
import MapLegendOption from '@/components/setting/MapLegendOption';
import SettingItem from '@/components/setting/SettingItem';
import {colors, settingNavigations} from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import useModal from '@/hooks/useModal';
import useThemeStorage from '@/hooks/useThemeStorage';
import {SettingStackParamlist} from '@/navigations/stack/SettingStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/common';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

type SettingHomeScreenProps = StackScreenProps<SettingStackParamlist>;

const SettingHomeScreen = ({navigation}: SettingHomeScreenProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const {logoutMutation} = useAuth();
  const darkModeOption = useModal();
  const mapLegendOption = useModal();

  const handlePressEditProfile = () => {
    navigation.navigate(settingNavigations.EDIT_PROFILE);
  };

  const handlePressLogout = () => {
    logoutMutation.mutate(null);
  };

  const handlePressEditCategory = () => {
    navigation.navigate(settingNavigations.EDIT_CATEGORY);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.space} />
        <SettingItem title="프로필 수정" onPress={handlePressEditProfile} />
        <SettingItem
          title="마커 카테고리 설정"
          onPress={handlePressEditCategory}
        />
        <SettingItem title="다크 모드" onPress={darkModeOption.show} />
        <SettingItem title="범례 표시" onPress={mapLegendOption.show} />
        <View style={styles.space} />
        <SettingItem
          title="로그아웃"
          onPress={handlePressLogout}
          color={colors[theme].RED_500}
          icon={
            <Octicons
              name={'sign-out'}
              color={colors[theme].RED_500}
              size={16}
            />
          }
        />
        <DarkModeOption
          isVisible={darkModeOption.isVisible}
          hideOption={darkModeOption.hide}
        />
        <MapLegendOption
          isVisible={mapLegendOption.isVisible}
          hideOption={mapLegendOption.hide}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    space: {
      height: 30,
    },
  });

export default SettingHomeScreen;
