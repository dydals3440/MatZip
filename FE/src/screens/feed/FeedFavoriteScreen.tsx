import {colors} from '@/constants';
import React, {Suspense} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/common';
import FeedFavoriteList from '@/components/feed/FeedFavoriteList';
import Loader from '@/components/common/Loader';
import RetryErrorBoundary from '@/components/common/RetryErrorBoundary';

const FeedFavoriteScreen = () => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  return (
    <View style={styles.container}>
      <RetryErrorBoundary>
        <Suspense fallback={<Loader />}>
          <FeedFavoriteList />
        </Suspense>
      </RetryErrorBoundary>
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
