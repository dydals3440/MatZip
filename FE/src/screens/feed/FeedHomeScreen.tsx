import FeedList from '@/components/feed/FeedList';
import React from 'react';
import {StyleSheet, View, Text, SafeAreaView} from 'react-native';

interface FeedHomeScreenProps {}

function FeedHomeScreen({}: FeedHomeScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <FeedList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FeedHomeScreen;
