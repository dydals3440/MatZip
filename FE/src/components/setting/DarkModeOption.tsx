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
          <CompoundOption.Button onPress={handlePressLight}>
            라이트 모드
          </CompoundOption.Button>
          <CompoundOption.Button onPress={handlePressDark}>
            다크 모드
          </CompoundOption.Button>
          <CompoundOption.Button onPress={handlePressSystem}>
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
