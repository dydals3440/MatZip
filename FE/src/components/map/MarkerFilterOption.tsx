import {StyleSheet, View} from 'react-native';
import {CompoundOption} from '../common/CompoundOption';
import {useState} from 'react';
import {MarkerColor} from '@/types/domain';
import useAuth from '@/hooks/queries/useAuth';
import {colorHex} from '@/constants';
import useMarkerFilterStorage from '@/hooks/useMarkerFilterStorage';

interface MarkerFilterOptionProps {
  isVisible: boolean;
  hideOption: () => void;
}

const categoryList: MarkerColor[] = [
  'RED',
  'YELLOW',
  'GREEN',
  'BLUE',
  'PURPLE',
];

const scoreList = ['1', '2', '3', '4', '5'];

const MarkerFilterOption = ({
  isVisible,
  hideOption,
}: MarkerFilterOptionProps) => {
  const [filterCondition, setFilterCondition] = useState('색상');
  const {getProfileQuery} = useAuth();
  const {categories} = getProfileQuery.data || {};
  const markerFilter = useMarkerFilterStorage();

  const handleCondition = (condition: string) => {
    setFilterCondition(condition);
  };

  const handleFilter = (name: string) => {
    markerFilter.set({
      ...markerFilter.items,
      [name]: !markerFilter.items[name],
    });
  };
  return (
    <CompoundOption isVisible={isVisible} hideOption={hideOption}>
      <CompoundOption.Background>
        <CompoundOption.Container>
          <CompoundOption.Title>마커 필터링</CompoundOption.Title>
          <CompoundOption.Divider />
          <View style={styles.filterContainer}>
            {['색상', '평점'].map(condition => (
              <CompoundOption.Filter
                key={condition}
                isSelected={filterCondition === condition}
                onPress={() => handleCondition(condition)}>
                {condition}
              </CompoundOption.Filter>
            ))}
          </View>
          <CompoundOption.Divider />

          {filterCondition === '색상' && (
            <>
              {categoryList.map(color => (
                <CompoundOption.CheckBox
                  key={color}
                  isChecked={markerFilter.items[color]}
                  onPress={() => handleFilter(color)}
                  icon={
                    <View
                      style={[
                        styles.marker,
                        {backgroundColor: colorHex[color]},
                      ]}
                    />
                  }>
                  {categories?.[color]}
                </CompoundOption.CheckBox>
              ))}
            </>
          )}

          {filterCondition === '평점' && (
            <>
              {['1', '2', '3', '4', '5'].map(score => (
                <CompoundOption.CheckBox
                  key={score}
                  isChecked={markerFilter.items[score]}
                  onPress={() => handleFilter(score)}>
                  {score} 점
                </CompoundOption.CheckBox>
              ))}
            </>
          )}
        </CompoundOption.Container>
        <CompoundOption.Button onPress={hideOption}>완료</CompoundOption.Button>
      </CompoundOption.Background>
    </CompoundOption>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'space-around',
  },
  marker: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
});

export default MarkerFilterOption;
