import React from 'react';
import {StyleSheet, View} from 'react-native';
import ImageCarousel from '../common/ImageCarousel';
import useDetailStore from '@/store/useDetailPostStore';
import {StackScreenProps} from '@react-navigation/stack';
import {FeedStackParamlist} from '@/navigations/stack/FeedStackNavigator';
import {feedNavigations} from '@/constants';

type ImageZoomScreenProps = StackScreenProps<
  FeedStackParamlist,
  typeof feedNavigations.IMAGE_ZOOM
>;

const ImageZoomScreen = ({route}: ImageZoomScreenProps) => {
  // 인덱스는 어떤 이미지를 클릭했는지 판단할 떄 씀
  const {index} = route.params;
  const {detailPost} = useDetailStore();
  return (
    <ImageCarousel images={detailPost?.images ?? []} pressedIndex={index} />
  );
};

const styles = StyleSheet.create({});

export default ImageZoomScreen;
