import {updatePost} from '@/api';
import queryClient from '@/api/queryClient';
import {queryKeys} from '@/constants';
import {UseMutationCustomOptions} from '@/types/common';
import {useMutation} from '@tanstack/react-query';

function useMutateUpdatePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: updatePost,
    onSuccess: newPost => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
      });
      // 개별포스트에 invalidate쿼리 해주면되는데, 서버에서 response-single-post-type으로 수정된 포스트의 정보가 그대로 오게됨. 그래서 setQueryData를 쓰는 방향성, 새로운 정보가 오기 떄문에, 무효화를 하지 않고, 캐시정보를 업데이트 해줌.
      queryClient.setQueryData(
        [queryKeys.POST, queryKeys.GET_POST, newPost.id],
        newPost,
      );
    },
    ...mutationOptions,
  });
}

export default useMutateUpdatePost;
