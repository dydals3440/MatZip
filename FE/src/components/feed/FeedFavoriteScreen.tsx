import {colors} from '@/constants';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const FeedFavoriteScreen = () => {
  return (
    <View style={styles.container}>
      <Text>즐겨찾기 스크린</Text>
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
