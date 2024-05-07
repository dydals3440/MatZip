import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import Octicons from 'react-native-vector-icons/Octicons';

import InputField from '@/components/InputField';
import {colors, mainNavigations, mapNavigations} from '@/constants';
import {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import CustomButton from '@/components/CustomButton';
import useForm from '@/hooks/useForm';
import {getDateWithSeparator, validateAddPost} from '@/utils';
import AddPostHeaderRight from '@/components/AddPostHeaderRight';
import useMutationCreatePost from '@/hooks/queries/useMutateCreatePost';
import {MarkerColor} from '@/types/domain';
import useGetAddress from '@/hooks/useGetAddress';
import MarkerSelector from '@/components/MarkerSelector';
import ScoreInput from '@/components/ScoreInput';
import DatePickerOption from '@/components/DatePickerOption';
import useModal from '@/hooks/useModal';
import ImageInput from '@/components/ImageInput';
import usePermission from '@/hooks/usePermission';
import useImagePicker from '@/hooks/useImagePicker';
import PreviewImageList from '@/components/PreviewImageList';

type AddPostScreenProps = StackScreenProps<
  MapStackParamList,
  typeof mapNavigations.ADD_POST
>;

function AddPostScreen({route, navigation}: AddPostScreenProps) {
  const {location} = route.params;
  const descriptionRef = useRef<TextInput | null>(null);
  const createPost = useMutationCreatePost();
  const address = useGetAddress(location);
  const addPost = useForm({
    initialValue: {title: '', description: ''},
    validate: validateAddPost,
  });
  const [markerColor, setMarkerColor] = useState<MarkerColor>('RED');
  const [score, setScore] = useState(5);
  const [date, setDate] = useState(new Date());
  const dateOption = useModal();
  const [isPicked, setIsPicked] = useState(false);
  const imagePicker = useImagePicker({
    initialImages: [],
  });
  usePermission('PHOTO');

  console.log('image-picker.imageUris', imagePicker.imageUris);

  const handleConfirmDate = () => {
    setIsPicked(true);
    dateOption.hide();
  };

  const handleChangeDate = (pickedDate: Date) => {
    setDate(pickedDate);
  };

  const handleSelectMarker = (name: MarkerColor) => {
    setMarkerColor(name);
  };

  const handleChangeScore = (value: number) => {
    setScore(value);
  };

  const handleSubmit = () => {
    const body = {
      date,
      title: addPost.values.title,
      description: addPost.values.description,
      color: markerColor,
      score,
      imageUris: imagePicker.imageUris,
    };
    createPost.mutate(
      {address, ...location, ...body},
      {
        onSuccess: () => navigation.goBack(),
      },
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => AddPostHeaderRight(handleSubmit),
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <InputField
            value={address}
            disabled
            icon={
              <Octicons name="location" size={16} color={colors.GRAY_500} />
            }
          />
          <CustomButton
            variant="outlined"
            size="large"
            label={isPicked ? getDateWithSeparator(date, '. ') : '날짜 선택'}
            onPress={dateOption.show}
          />
          <InputField
            placeholder="제목을 입력하세요."
            error={addPost.errors.title}
            touched={addPost.touched.title}
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => descriptionRef.current?.focus()}
            {...addPost.getTextInputProps('title')}
          />
          <InputField
            ref={descriptionRef}
            placeholder="기록하고 싶은 내용을 입력하세요. (선택)"
            error={addPost.errors.description}
            touched={addPost.touched.description}
            // enter눌렀을떄 다음줄 받을 수 있음
            multiline
            blurOnSubmit={false}
            returnKeyType="next"
            {...addPost.getTextInputProps('description')}
          />
        </View>
        <MarkerSelector
          score={score}
          markerColor={markerColor}
          onPressMarker={handleSelectMarker}
        />
        <ScoreInput score={score} onChangeScore={handleChangeScore} />

        <View style={styles.imagesViewer}>
          <ImageInput onChange={imagePicker.handleChange} />
          <PreviewImageList
            imageUris={imagePicker.imageUris}
            onDelete={imagePicker.delete}
            onChangeOrder={imagePicker.changeOrder}
          />
        </View>
        <DatePickerOption
          date={date}
          isVisible={dateOption.isVisible}
          onChangeDate={handleChangeDate}
          onConfirmDate={handleConfirmDate}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    marginBottom: 10,
    flex: 1,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 20,
  },
  imagesViewer: {
    flexDirection: 'row',
  },
});

export default AddPostScreen;
