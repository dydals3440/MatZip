import {deletePost} from '@/api';
import queryClient from '@/api/queryClient';
import {queryKeys} from '@/constants';
import {UseMutationCustomOptions} from '@/types/common';
import {Marker} from '@/types/domain';
import {useMutation} from '@tanstack/react-query';

function useMutateDeletePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: deletePost,
    // 삭제된 포스트의 아이디 정보를 전달.
    // 이 걸로 setQueryData를 활용해서 직접 없애도됨.
    onSuccess: deleteId => {
      // 피드 삭제 무효화
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
      // 마커 불러오는거 무효화
      //   queryClient.invalidateQueries({
      //     queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
      //   });
      // 캐시 직접 업데이트 하는 방법
      queryClient.setQueryData<Marker[]>(
        [queryKeys.MARKER, queryKeys.GET_MARKERS],
        existingMarkers => {
          return existingMarkers?.filter(marker => marker.id !== deleteId);
        },
      );
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_CALENDAR_POSTS],
      });
    },
    ...mutationOptions,
  });
}

export default useMutateDeletePost;
