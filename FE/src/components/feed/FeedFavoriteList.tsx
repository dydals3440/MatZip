import useGetInfinitePosts from '@/hooks/queries/useGetInfinitePosts';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import FeedItem from './FeedItem';
import {useState} from 'react';
import useGetInfiniteFavoritePosts from '@/hooks/queries/useGetInfiniteFavoritePosts';

const FeedFavoriteList = () => {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfiniteFavoritePosts();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 위로 끌어당겼을 때, true
  // 새로고침.
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <FlatList
      data={posts?.pages.flat()}
      renderItem={({item}) => <FeedItem post={item} />}
      keyExtractor={item => String(item.id)}
      numColumns={2}
      ListEmptyComponent={
        <View>
          <Text style={{textAlign: 'center'}}>
            즐겨찾기 한 장소가 없습니다.
          </Text>
        </View>
      }
      contentContainerStyle={styles.contentContainer}
      onEndReached={handleEndReached}
      // 완전 다 안닿아도, 데이터를 페칭해오게함.
      onEndReachedThreshold={0.5}
      // 새로고침 기능
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      // ios 스크롤바 가운데에 오는 버그
      scrollIndicatorInsets={{right: 1}}
      indicatorStyle="black"
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 15,
  },
});

export default FeedFavoriteList;
