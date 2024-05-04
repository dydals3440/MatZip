import {Marker} from '@/types/domain';
import axiosInstance from './axios';

// 그냥 좌표만 불러옴. 지도에서는 위치 마커색상 점수만 필요하기 떄문. 불가피하게 많은 데이터를 찾아올 이유가 없음.
const getMarkers = async (): Promise<Marker[]> => {
  const {data} = await axiosInstance.get('/markers/my');

  return data;
};

export {getMarkers};
