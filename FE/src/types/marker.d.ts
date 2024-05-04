import {LatLng, MapMarkerProps} from 'react-native-maps';
// marker props의 타입을 변경
declare module 'react-native-maps' {
  export interface MyMapMarkerProps extends MapMarkerProps {
    coordinate?: LatLng;
  }
}
