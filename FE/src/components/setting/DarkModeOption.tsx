import React from 'react';
import {StyleSheet, View, useColorScheme} from 'react-native';
import {CompoundOption} from '../common/CompoundOption';
import useThemeStorage from '@/hooks/useThemeStorage';

interface DarkModeOptionProps {
  isVisible: boolean;
  hideOption: () => void;
}

const DarkModeOption = ({isVisible, hideOption}: DarkModeOptionProps) => {
  const systemDefault = useColorScheme();
  const {theme, isSystem, setMode, setSystem} = useThemeStorage();
  const handlePressLight = () => {
    setMode('light');
    setSystem(false);
    hideOption();
  };
  const handlePressDark = () => {
    setMode('dark');
    setSystem(false);
    hideOption();
  };
  const handlePressSystem = () => {
    setMode(systemDefault ?? 'light');
    setSystem(true);
    hideOption();
  };

  return (
    <CompoundOption isVisible={isVisible} hideOption={hideOption}>
      <CompoundOption.Background>
        <CompoundOption.Container>
          {/* 현재 어떤 모드를 선택했는지 알 수 없음 */}
          <CompoundOption.Button
            onPress={handlePressLight}
            isChecked={isSystem === false && theme === 'light'}>
            라이트 모드
          </CompoundOption.Button>
          <CompoundOption.Button
            onPress={handlePressDark}
            isChecked={isSystem === false && theme === 'dark'}>
            다크 모드
          </CompoundOption.Button>
          <CompoundOption.Button
            onPress={handlePressSystem}
            isChecked={isSystem === true}>
            시스템 기본값 모드
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

const styles = StyleSheet.create({});

export default DarkModeOption;
