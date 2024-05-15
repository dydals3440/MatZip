import {colors} from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import axios from 'axios';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import Config from 'react-native-config';
import WebView, {
  WebViewMessageEvent,
  WebViewNavigation,
} from 'react-native-webview';

interface KakaoLoginScreenProps {}

const REDIRECT_URI = `${
  Platform.OS === 'ios' ? `http://localhost:3030` : 'http://10.0.2.2:3030/'
}/auth/oauth/kakao`;

function KakaoLoginScreen({}: KakaoLoginScreenProps) {
  const {kakaoLoginMutation} = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isChangeNavigate, setIsChangeNavigate] = useState(true);

  const handleOnMessage = (event: WebViewMessageEvent) => {
    console.log(event.nativeEvent.url);
    if (event.nativeEvent.url.includes(`${REDIRECT_URI}?code=`)) {
      // 나머지 부분이 코드에 담기게됨.
      const code = event.nativeEvent.url.replace(`${REDIRECT_URI}?code=`, '');
      // 코드를 보내주면됨
      requestToken(code);
    }
  };
  const requestToken = async (code: string) => {
    const response = await axios({
      method: 'post',
      url: 'https://kauth.kakao.com/oauth/token',
      params: {
        grant_type: 'authorization_code',
        client_id: Config.KAKAO_REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code,
      },
    });

    kakaoLoginMutation.mutate(response.data.access_token);
  };
  // 로그인 => 코드 생김 => 이 코드를 백엔드에서 받음

  const handleNavigationChangeState = (event: WebViewNavigation) => {
    const isMatched = event.url.includes(`${REDIRECT_URI}?code=`);
    setIsLoading(isMatched);
    console.log(event.loading);
    setIsChangeNavigate(event.loading);
  };

  return (
    <SafeAreaView style={styles.container}>
      {(isLoading || isChangeNavigate) && (
        <View style={styles.kakaoLoadingContainer}>
          <ActivityIndicator size={'small'} color={colors.BLACK} />
        </View>
      )}
      <WebView
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${Config.KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        onMessage={handleOnMessage}
        injectedJavaScript={"window.ReactNativeWebView.postMessage('')"}
        onNavigationStateChange={handleNavigationChangeState}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  kakaoLoadingContainer: {
    backgroundColor: colors.WHITE,
    height: Dimensions.get('window').height,
    paddingBottom: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default KakaoLoginScreen;
