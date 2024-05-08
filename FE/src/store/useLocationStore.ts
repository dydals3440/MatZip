import {LatLng} from 'react-native-maps';
import {create} from 'zustand';

interface LocationState {
  moveLocation: LatLng | null;
  setMoveLocation: (location: LatLng) => void;
}

const useLocationStore = create<LocationState>(set => ({
  // 이동할 위치
  moveLocation: null,
  // moveLocation을 변경하는 함수
  setMoveLocation: (moveLocation: LatLng) => {
    // 만약 다른 state들이 ㅁ낳다면, 그대로 state를 복사, 새로운 것만 업데이트.
    set({moveLocation});
  },
}));

export default useLocationStore;
