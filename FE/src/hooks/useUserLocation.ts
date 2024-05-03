import Geolocation from '@react-native-community/geolocation';
import {useEffect, useState} from 'react';
import {LatLng} from 'react-native-maps';
import useAppState from './useAppState';

function useUserLocation() {
  const [userLocation, setUserLocation] = useState<LatLng>({
    latitude: 37.5516032365118,
    longitude: 126.98989626020192,
  });
  const [isUserLocationError, setIsUserLocationError] = useState(false);
  const {isComback} = useAppState();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
        const {latitude, longitude} = info.coords;
        setUserLocation({latitude, longitude});
        setIsUserLocationError(false);
        // 앱이 백그라운 갔다가, 다시 앱으로 돌아올떄 상태를 체크할 수 있음.(AppState 검색)
      },
      // error
      () => {
        setIsUserLocationError(true);
      },
      // options
      {
        enableHighAccuracy: true,
      },
    );
  }, [isComback]);

  return {userLocation, isUserLocationError};
}

export default useUserLocation;
