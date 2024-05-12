import {ResponseCalendarPost, getCalendarPosts} from '@/api';
import {queryKeys} from '@/constants';
import {UseQueryCustomOptions} from '@/types/common';
import {useQuery, queryOptions, keepPreviousData} from '@tanstack/react-query';

function useGetCalendarPosts(
  year: number,
  month: number,
  queryOptions?: UseQueryCustomOptions<ResponseCalendarPost>,
) {
  return useQuery({
    queryFn: () => getCalendarPosts(year, month),
    queryKey: [queryKeys.POST, queryKeys.GET_CALENDAR_POSTS, year, month],
    // 데이터를 가져오는 동안, 이전 데이터를 유지하는 기능. 페이지네이션을 구현할 떄 특히 유연, 다음 달로 넘길떄 더이상 깜빡거리는 현상이 나타나지 않음.
    placeholderData: keepPreviousData,
    ...queryOptions,
  });
}

// v4
// keepPreviousData: true

export default useGetCalendarPosts;
