import {useRef, useState, useEffect} from 'react';
import {AppState} from 'react-native';

function useAppState() {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [isComback, setIsComback] = useState(false);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        // 앱의 상태가 비활성화 또는 백그라운드에 있다가 active가 되면? 다시 돌아왔다 볼 수 있.
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        setIsComback(true);
        console.log('App has come to the foreground!');
      }

      if (appState.current.match(/active/) && nextAppState === 'background') {
        setIsComback(false);
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return {isComback, appStateVisible};
}

export default useAppState;
