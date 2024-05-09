import React from 'react';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';

import {FeedStackParamlist} from '@/navigations/stack/FeedStackNavigator';
import useMutateDeletePost from '@/hooks/queries/useMutateDeletePost';
import useDetailStore from '@/store/useDetailPostStore';
import {CompoundOption} from '../common/CompoundOption';
import {alerts, feedNavigations} from '@/constants';

interface FeedDetailOptionProps {
  isVisible: boolean;
  hideOption: () => void;
}

// 피드에서 상세로 들어갔을 때 해당정보를 Zustand를 이용해서 젖아해놓는 스토어 만듬.

const FeedDetailOption = ({isVisible, hideOption}: FeedDetailOptionProps) => {
  const navigation = useNavigation<StackNavigationProp<FeedStackParamlist>>();
  const deletePost = useMutateDeletePost();
  const {detailPost} = useDetailStore();

  const handleDeletePost = () => {
    if (!detailPost) {
      return;
    }

    Alert.alert(alerts.DELETE_POST.TITLE, alerts.DELETE_POST.DESCRIPTION, [
      {
        text: '삭제',
        onPress: () => {
          deletePost.mutate(detailPost.id, {
            onSuccess: () => {
              // 옵션을 다시 닫아줌. 삭제 후
              hideOption();
              // 다시 피드 목록으로 이동
              navigation.goBack();
            },
          });
        },
        style: 'destructive',
      },
      {
        text: '취소',
        style: 'cancel',
      },
    ]);
  };

  const handleEditPost = () => {
    if (!detailPost) {
      return;
    }

    navigation.navigate(feedNavigations.EDIT_POST, {
      location: {
        latitude: detailPost.latitude,
        longitude: detailPost.longitude,
      },
    });
  };

  return (
    <CompoundOption isVisible={isVisible} hideOption={hideOption}>
      <CompoundOption.Background>
        <CompoundOption.Container>
          <CompoundOption.Button isDanger onPress={handleDeletePost}>
            삭제하기
          </CompoundOption.Button>
          <CompoundOption.Divider />
          <CompoundOption.Button onPress={handleEditPost}>
            수정하기
          </CompoundOption.Button>
        </CompoundOption.Container>
        <CompoundOption.Container>
          <CompoundOption.Button onPress={hideOption}>
            취소
          </CompoundOption.Button>
        </CompoundOption.Container>
      </CompoundOption.Background>
    </CompoundOption>
  );
};

export default FeedDetailOption;
