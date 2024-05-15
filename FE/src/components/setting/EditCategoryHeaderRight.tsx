import React from 'react';
import {StyleSheet} from 'react-native';
import HeaderButton from '../common/HeaderButton';

const EditCategoryHeaderRight = (onSubmit: () => void) => {
  return <HeaderButton labelText="저장" onPress={onSubmit} />;
};

const styles = StyleSheet.create({});

export default EditCategoryHeaderRight;
