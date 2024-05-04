import {getMarkers} from '@/api';
import {useQuery} from '@tanstack/react-query';
import {UseQueryCustomOptions} from '@/types/common';
import {queryKeys} from '@/constants';
import {Marker} from '@/types/domain';

function useGetMarkers(queryOptions?: UseQueryCustomOptions<Marker[]>) {
  return useQuery({
    queryFn: getMarkers,
    queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
    ...queryOptions,
  });
}

export default useGetMarkers;
