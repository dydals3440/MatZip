import {colors} from '@/constants';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FeedFavoriteList from './FeedFavoriteList';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/common';

const FeedFavoriteScreen = () => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  return (
    <View style={styles.container}>
      <FeedFavoriteList />
    </View>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[theme].WHITE,
    },
  });

export default FeedFavoriteScreen;
