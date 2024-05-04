import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import CustomMarker from './CustomMarker';
import {colors} from '@/constants';

interface MarkerSelectorProps {}

const MarkerSelector = ({}: MarkerSelectorProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.markerLabel}>마커 선택</Text>
      <ScrollView>
        <View style={styles.markerInputScroll}>
          {['RED', 'YELLOW', 'GREEN', 'BLUE', 'PURPLE'].map(color => {
            return (
              <Pressable style={styles.markerBox}>
                <CustomMarker color={color} />
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    padding: 15,
  },
  markerLabel: {
    marginBottom: 15,
    color: colors.GRAY_700,
  },
  markerInputScroll: {
    flexDirection: 'row',
    gap: 20,
  },
  markerBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: colors.GRAY_100,
  },
});

export default MarkerSelector;
