import {ImageUri, Post} from '@/types/domain';
import axiosInstance from './axios';

type ResponsePost = Post & {images: ImageUri};

// Post를 생성할 떄 id는 필요하지 않다. (Auto Increment이기 때문)
type RequestCreatePost = Omit<Post, 'id'> & {imageUris: ImageUri[]};

const createPost = async (body: RequestCreatePost): Promise<ResponsePost> => {
  const {data} = await axiosInstance.post('/posts', body);

  return data;
};

export {createPost};

export type {ResponsePost, RequestCreatePost};
