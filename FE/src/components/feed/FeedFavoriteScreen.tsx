import {colors} from '@/constants';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FeedFavoriteList from './FeedFavoriteList';

const FeedFavoriteScreen = () => {
  return (
    <View style={styles.container}>
      <FeedFavoriteList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});

export default FeedFavoriteScreen;
