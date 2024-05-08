import {numbers} from '@/constants';
import useLocationStore from '@/store/useLocationStore';
import {useEffect, useRef, useState} from 'react';
import MapView, {LatLng, Region} from 'react-native-maps';

type Delta = Pick<Region, 'latitudeDelta' | 'longitudeDelta'>;

function useMoveMapView() {
  const {moveLocation} = useLocationStore();

  // 확대 정도 유지
  const [regionDelta, setRegionDelta] = useState<Delta>(numbers.INITIAL_DELTA);

  const mapRef = useRef<MapView | null>(null);

  const moveMapView = (coordinate: LatLng, delta?: Delta) => {
    mapRef.current?.animateToRegion({
      ...coordinate,
      //   latitudeDelta: 0.0922,
      //   longitudeDelta: 0.0421,
      //   전달 받은 델타값이 없으면 위의 값으로 (기본값)설정
      // 전달받은게 있으면 그걸 사용.
      ...(delta ?? regionDelta),
    });
  };

  const handleChangeDelta = (region: Region) => {
    {
      const {latitudeDelta, longitudeDelta} = region;
      setRegionDelta({latitudeDelta, longitudeDelta});
    }
  };

  useEffect(() => {
    moveLocation && moveMapView(moveLocation);
  }, [moveLocation]);

  return {mapRef, moveMapView, handleChangeDelta};
}

export default useMoveMapView;
