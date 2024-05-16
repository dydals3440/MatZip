import {ResponsePost, getPosts} from '@/api';
import {queryKeys} from '@/constants';
import {ResponseError} from '@/types/common';
import {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryOptions,
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';

function useGetInfinitePosts(
  //3번쨰 파라미터는 페이지마다 배열이 만들어지므로 [][] 임.
  queryOptions?: UseInfiniteQueryOptions<
    ResponsePost[],
    ResponseError,
    // 그냥 data 리턴시, InfiniteData<ResponsePost[], number> 타입으로.
    // ResponsePost[][],
    InfiniteData<ResponsePost[], number>,
    ResponsePost[],
    QueryKey,
    number
  >,
) {
  return useSuspenseInfiniteQuery({
    queryFn: ({pageParam}) => getPosts(pageParam),
    queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastPost = lastPage[lastPage.length - 1];
      return lastPost ? allPages.length + 1 : undefined;
    },
    // throwOnError: (v5)하지만, 실제로 활성화 되어있음. Suspense를 사용하는 경우.
    // useErrorBoundary: true (v4)
    // data.pages로 리턴값이 나옴.
    // select는 반환값을 변환해줌.
    // select를 통해 데이터 변환.
    // select: data => data.pages,
    ...queryOptions,
  });
}

export default useGetInfinitePosts;
