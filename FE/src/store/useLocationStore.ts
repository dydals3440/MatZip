import {LatLng} from 'react-native-maps';
import {create} from 'zustand';

interface LocationState {
  moveLocation: LatLng | null;
  selectLocation: LatLng | null;
  setMoveLocation: (location: LatLng | null) => void;
  setSelectLocation: (location: LatLng | null) => void;
}

const useLocationStore = create<LocationState>(set => ({
  selectLocation: null,
  // 이동할 위치
  moveLocation: null,
  // moveLocation을 변경하는 함수
  setMoveLocation: (moveLocation: LatLng | null) => {
    // 만약 다른 state들이 ㅁ낳다면, 그대로 state를 복사, 새로운 것만 업데이트.
    set(state => ({...state, moveLocation}));
  },
  setSelectLocation: (selectLocation: LatLng | null) => {
    set(state => ({...state, selectLocation}));
  },
}));

export default useLocationStore;
