import AuthStackNavigator from '../stack/AuthStackNavigator';
import MainDrawerNavigator from '../drawer/MainDrawerNavigator';
import useAuth from '../../hooks/queries/useAuth';
import RetryErrorBoundary from '@/components/common/RetryErrorBoundary';
import {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

// 사용자가 먼저 맞이하는 로직들.
function RootNavigator() {
  const {isLogin, isLoginLoading} = useAuth();

  // 로딩 상태가 끝나면 스플래시 스크린을 숨기는 코드 작성.

  useEffect(() => {
    if (!isLoginLoading) {
      // 살짝 로그인 화면이 보이므로, 안보이게 임의로 시간초를 늘림.
      setTimeout(() => {
        SplashScreen.hide();
      }, 500);
    }
  }, [isLoginLoading]);

  return (
    <RetryErrorBoundary>
      {isLogin ? <MainDrawerNavigator /> : <AuthStackNavigator />}
    </RetryErrorBoundary>
  );
}

export default RootNavigator;
