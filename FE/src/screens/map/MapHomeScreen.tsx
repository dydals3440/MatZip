import React from 'react';
import {StyleSheet} from 'react-native';
import useAuth from '@/hooks/queries/useAuth';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const MapHomeScreen = () => {
  const {logoutMutation} = useAuth();
  return (
    <MapView
      style={styles.container}
      provider={PROVIDER_GOOGLE}
      showsUserLocation
      followsUserLocation
      showsMyLocationButton={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapHomeScreen;
