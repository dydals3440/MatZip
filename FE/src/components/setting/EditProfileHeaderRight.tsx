import React from 'react';
import {StyleSheet, View} from 'react-native';
import HeaderButton from '../common/HeaderButton';

const EditProfileHeaderRight = (onSubmit: () => void) => {
  return <HeaderButton labelText="완료" onPress={onSubmit} />;
};

const styles = StyleSheet.create({});

export default EditProfileHeaderRight;
