import {QueryClient} from '@tanstack/react-query';

// 리액트 쿼리는 요청이 실패하면, 기본적으로 3번 재요청을 하는데, 이것을 모두 금지시킴.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

export default queryClient;
