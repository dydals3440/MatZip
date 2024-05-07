import useGetInfinitePosts from '@/hooks/queries/useGetInfinitePosts';
import {StyleSheet, View} from 'react-native';

const FeedList = () => {
  const {data: posts} = useGetInfinitePosts();
  return <View></View>;
};

const styles = StyleSheet.create({});

export default FeedList;
