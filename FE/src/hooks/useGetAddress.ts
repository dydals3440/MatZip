import {errorMessages} from '@/constants';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {LatLng} from 'react-native-maps';

function useGetAddress(location: LatLng) {
  const {latitude, longitude} = location;
  const [result, setResult] = useState('');

  useEffect(() => {
    // 즉시 실행 함수 패턴.
    (async () => {
      try {
        const {data} = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=street_address|route|political&key=AIzaSyA3p0LP3f2N6JGQrNceUd-OSFE_eSGiONA&language=ko`,
        );

        const address = data.results.length
          ? data.results[0].formatted_address
          : `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;

        setResult(address);
      } catch (error) {
        setResult(errorMessages.CANNOT_GET_ADDRESS);
      }
    })();
  }, [latitude, longitude]);

  return result;
}

export default useGetAddress;
