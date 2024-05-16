import {MutationFunction, useMutation, useQuery} from '@tanstack/react-query';
import {
  ResponseProfile,
  ResponseToken,
  appleLogin,
  deleteAccount,
  editCategory,
  editProfile,
  getAccessToken,
  getProfile,
  kakaoLogin,
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
import {Category, Profile} from '@/types/domain';

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
    // ErrorBoundary Option
    // 회원가입이나, 로그인 같은 경우 에러가 발생하면 이미 가입된 이메일이거나 비밀번호가 틀렸을 경우에도 에러가 발생해서 toast 메시지로 표시가 됨.
    // true로 설정하지 않거나
    // 에러코드의 번호가 서버 에러인 경우만에만 에러를 잡도록 설정
    throwOnError: error => Number(error.response?.status) >= 500,
    ...mutationOptions,
  });
}

function useLogin<T>(
  loginAPI: MutationFunction<ResponseToken, T>,
  mutationOptions?: UseMutationCustomOptions,
) {
  return useMutation({
    mutationFn: loginAPI,
    // mutationFn: postLogin,
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
    throwOnError: error => Number(error.response?.status) >= 500,
    ...mutationOptions,
  });
}

function useEmailLogin(mutationOptions?: UseMutationCustomOptions) {
  return useLogin(postLogin, mutationOptions);
}

function useKakaoLogin(mutationOptions?: UseMutationCustomOptions) {
  return useLogin(kakaoLogin, mutationOptions);
}

function useAppleLogin(mutationOptions?: UseMutationCustomOptions) {
  return useLogin(appleLogin, mutationOptions);
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

type ResponseSelectProfile = {categories: Category} & Profile;

/**
 * {"BLUE": "", "GREEN": "", "PURPLE": "", "RED": "", "YELLOW": "", "createdAt": "2024-05-14T07:36:24.393Z", "deletedAt": null, "email": "3482273945", "id": 5, "imageUri": "BFD9B292-B33B-4F88-BC35-8D0ED04383981715717434427.jpg", "kakaoImageUri": null, "loginType": "kakao", "nickname": "", "updatedAt": "2024-05-14T23:15:27.318Z"}
 */

/**
 * {"categories": {"BLUE": "", "GREEN": "", "PURPLE": "", "RED": "", "YELLOW": ""}, "createdAt": "2024-05-14T07:36:24.393Z", "deletedAt": null, "email": "3482273945", "id": 5, "imageUri": "BFD9B292-B33B-4F88-BC35-8D0ED04383981715717434427.jpg", "kakaoImageUri": null, "loginType": "kakao", "nickname": "", "updatedAt": "2024-05-14T23:15:27.318Z"}
 */

const transformProfileCategory = (
  data: ResponseProfile,
): ResponseSelectProfile => {
  const {BLUE, GREEN, PURPLE, RED, YELLOW, ...rest} = data;
  const categories = {BLUE, GREEN, PURPLE, RED, YELLOW};

  return {categories, ...rest};
};

function useGetProfile(
  queryOptions?: UseQueryCustomOptions<ResponseProfile, ResponseSelectProfile>,
) {
  return useQuery({
    queryFn: getProfile,
    queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
    // select option을 통해 리턴 값 변경함.
    select: transformProfileCategory,
    ...queryOptions,
  });
}

function useMutateCategory(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: editCategory,
    onSuccess: newProfile => {
      queryClient.setQueryData(
        [queryKeys.AUTH, queryKeys.GET_PROFILE],
        newProfile,
      );
    },
    ...mutationOptions,
  });
}

function useUpdateProfile(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: editProfile,
    // 새로운 프로필이 값으로 전달됨.
    onSuccess: newProfile => {
      queryClient.setQueryData(
        [queryKeys.AUTH, queryKeys.GET_PROFILE],
        newProfile,
      );
    },
    ...mutationOptions,
  });
}

function useLogout(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removeHeader('Authorization');
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
      queryClient.resetQueries({queryKey: [queryKeys.AUTH]});
    },
    // 로그아웃 잘 안되는 현상 수정
    // onSettled: () => {
    //   queryClient.invalidateQueries({queryKey: [queryKeys.AUTH]});
    // },
    ...mutationOptions,
  });
}

function useMutateDeleteAccount(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: deleteAccount,
    // 데이터 리턴값 변경

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
  const loginMutation = useEmailLogin();
  const kakaoLoginMutation = useKakaoLogin();
  const appleLoginMutation = useAppleLogin();
  const logoutMutation = useLogout();
  const profileMutation = useUpdateProfile();
  // 회원 탈퇴가 성공하면 로그아웃까지 바로 진행되도록 함.
  const deleteAccountMutation = useMutateDeleteAccount({
    onSuccess: () => logoutMutation.mutate(null),
  });
  const categoryMutation = useMutateCategory();

  return {
    signupMutation,
    loginMutation,
    isLogin,
    getProfileQuery,
    logoutMutation,
    kakaoLoginMutation,
    appleLoginMutation,
    profileMutation,
    deleteAccountMutation,
    categoryMutation,
  };
}

export default useAuth;
