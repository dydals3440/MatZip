import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import useForm from '@/hooks/useForm';
import InputField from '@/components/common/InputField';
import CustomButton from '@/components/common/CustomButton';
import {validateSignup} from '@/utils';
import useAuth from '@/hooks/queries/useAuth';

interface SignUpScreenProps {}

const SignUpScreen = ({}: SignUpScreenProps) => {
  const passwordRef = useRef<TextInput | null>(null);
  const passwordConfirmRef = useRef<TextInput | null>(null);
  const {signupMutation, loginMutation} = useAuth();
  const signup = useForm({
    initialValue: {email: '', password: '', passwordConfirm: ''},
    validate: validateSignup,
  });

  const handleSubmit = () => {
    const {email, password} = signup.values;
    signupMutation.mutate(signup.values, {
      onSuccess: () => loginMutation.mutate({email, password}),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="이메일"
          error={signup.errors.email}
          touched={signup.touched.email}
          inputMode="email"
          // 다음 Input으로 넘어갈 수 있는 key 생성.
          returnKeyType="next"
          // next버튼 누르면 닫히는데, 이럼 안닫힘.
          blurOnSubmit={false}
          onSubmitEditing={() => passwordRef.current?.focus()}
          {...signup.getTextInputProps('email')}
        />
        <InputField
          ref={passwordRef}
          placeholder="비밀번호"
          // Automatic strong password 인풋에 차는 문제 해결
          textContentType="oneTimeCode"
          error={signup.errors.password}
          touched={signup.touched.password}
          returnKeyType="next"
          onSubmitEditing={() => passwordConfirmRef.current?.focus()}
          // 비밀번호 masking 처리.
          secureTextEntry
          {...signup.getTextInputProps('password')}
        />
        <InputField
          ref={passwordConfirmRef}
          placeholder="비밀번호 확인"
          error={signup.errors.passwordConfirm}
          touched={signup.touched.passwordConfirm}
          secureTextEntry
          // 다 하면 제출되게 마지막이니.
          onSubmitEditing={handleSubmit}
          {...signup.getTextInputProps('passwordConfirm')}
        />
      </View>
      <CustomButton label="회원가입" onPress={handleSubmit} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 30,
  },
});

export default SignUpScreen;
