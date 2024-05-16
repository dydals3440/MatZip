import {storageKeys} from '@/constants';
import useLegendStore from '@/store/useLegendStore';
import {getEncryptStorage, setEncryptStorage} from '@/utils';
import {useEffect} from 'react';

function useLegendStorage() {
  const {isVisible, setIsVisible} = useLegendStore();

  const set = async (flag: boolean) => {
    await setEncryptStorage(storageKeys.SHOW_LEGEND, flag);
    setIsVisible(flag);
  };

  useEffect(() => {
    (async () => {
      // ShowLegend 라는 값이 있으면, 사용하고 없으면 false
      const storedData =
        (await getEncryptStorage(storageKeys.SHOW_LEGEND)) ?? false;
      setIsVisible(storedData);
    })();
  }, []);

  return {set, isVisible};
}

export default useLegendStorage;
