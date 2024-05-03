import {useMutation, useQuery} from '@tanstack/react-query';
import {
  getAccessToken,
  getProfile,
  logout,
  postLogin,
  postSignup,
} from '@/api/auth';

import {UseMutationCustomOptions, UseQueryCustomOptions} from '@/types/common';
import {removeEncryptStorage, setEncryptStorage} from '@/utils';

import {removeHeader, setHeader} from '@/utils/header';
import {useEffect} from 'react';
import queryClient from '@/api/queryClient';
import {numbers, queryKeys, storageKeys} from '@/constants';

// interface UseMutationOptions<TData = unknown, TError = DefaultError, TVariables = void, TContext = unknown> extends OmitKeyof<MutationObserverOptions<TData, TError, TVariables, TContext>, '_defaulted'> {
// }

// // v4
// function useSignup() {
//   return useMutation(postSignup, {
//     onSuccess: () => {},
//   });
// }

function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    ...mutationOptions,
  });
}

function useLogin(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postLogin,
    // 로그인 성공시 처리할 동작
    onSuccess: ({accessToken, refreshToken}) => {
      setEncryptStorage(storageKeys.REFRESH_TOKEN, refreshToken);
      // 이렇게 하면 앞으로의 요청에 일일이 헤더 설정 X, default로 헤더가 들어감.
      setHeader('Authorization', `Bearer ${accessToken}`);
    },
    onSettled: () => {
      // 자동 갱신이 처음 로그인 했을 떄도, 옵션에 따라 로직이 돌도록 해줌.
      queryClient.refetchQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
      });
      // 로그인 후에, 남아있는 프로필 데이터도 변경해야 할 수 있기에, 쿼리르 오래된 데이터로 만들게 함.
      queryClient.invalidateQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
      });
    },
    ...mutationOptions,
  });
}

function useGetRefreshToken() {
  const {data, isSuccess, isError} = useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
    // accessToken 유효시간 30분
    queryFn: getAccessToken,
    // 30분보다는 살짝 작게 27분정도.
    staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME,
    // 앱을 종료하지 않고, 다른 작업을 했다가 돌아와도 갱신되게
    refetchOnReconnect: true,
    // 다시 연결되거나 백그라운드에서 refetch 될 수 있도록 true
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    if (isSuccess) {
      setHeader('Authorization', `Bearer ${data.accessToken}`);
      setEncryptStorage(storageKeys.REFRESH_TOKEN, data.refreshToken);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      removeHeader('Authorization');
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
    }
  }, [isError]);

  return {isSuccess, isError};
}
// v4
// useQuery([queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN], getAccessToken, { onSuccess, onError })

function useGetProfile(queryOptions?: UseQueryCustomOptions) {
  return useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
    queryFn: getProfile,
    ...queryOptions,
  });
}

function useLogout(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removeHeader('Authorization');
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.AUTH]});
    },
    ...mutationOptions,
  });
}

function useAuth() {
  const signupMutation = useSignup();
  const refreshTokenQuery = useGetRefreshToken();
  const getProfileQuery = useGetProfile({
    // enabled는 여기가 true일때 실행하게
    // refreshToken이 성공할때 가져올 수 있게
    enabled: refreshTokenQuery.isSuccess,
  });
  const isLogin = getProfileQuery.isSuccess;
  const loginMutation = useLogin();
  const logoutMutation = useLogout();

  return {
    signupMutation,
    loginMutation,
    isLogin,
    getProfileQuery,
    logoutMutation,
  };
}

export default useAuth;
