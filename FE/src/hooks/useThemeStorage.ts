import {storageKeys} from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/common';
import {getEncryptStorage, setEncryptStorage} from '@/utils';
import {useEffect} from 'react';
import {useColorScheme} from 'react-native';

function useThemeStorage() {
  // 시스템 기본값을 알 수 있는 방법
  const systemTheme = useColorScheme();
  const {theme, isSystem, setTheme, setSystemTheme} = useThemeStore();

  const setMode = async (mode: ThemeMode) => {
    // 암호화 안해도 되기때문에 AsyncStorage를 설치해서 저장해도 무방.
    await setEncryptStorage(storageKeys.THEME_MODE, mode);
    setTheme(mode);
  };

  const setSystem = async (flag: boolean) => {
    await setEncryptStorage(storageKeys.THEME_SYSTEM, flag);
    setSystemTheme(flag);
  };

  useEffect(() => {
    // 즉시 실행 함수, 앱이 처음 실행됐다면 스토리지에 있는 현재 상태를 앱을 껐다 켜도
    // 적용할 수 있도록 스토리지 값을 읽어와서 상태를 변경시킴.
    (async () => {
      // 저장된 theme mode가 있다면, 그걸 사용하고 없다면 라이트...
      const mode = (await getEncryptStorage(storageKeys.THEME_MODE)) ?? 'light';
      //
      const systemMode =
        (await getEncryptStorage(storageKeys.THEME_SYSTEM)) ?? 'false';

      const newMode = systemMode ? systemMode : mode;
      setTheme(newMode);
      setSystemTheme(systemMode);
    })();
  }, [setTheme, setSystemTheme, systemTheme]);

  return {theme, isSystem, setMode, setSystem};
}

export default useThemeStorage;
