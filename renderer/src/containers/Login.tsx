import React, { ChangeEvent, MouseEvent, useState } from 'react';
import Router from 'next/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import styled from 'styled-components';
import { firebaseAuth } from '../../firebase';

interface LoginInfoInterface {
  email: string;
  password: string;
}

function Login(): JSX.Element {
  const [loginInfo, setLoginInfo] = useState<LoginInfoInterface>({
    email: '',
    password: '',
  });

  const adjustInput = (type: string, event: ChangeEvent<HTMLInputElement>): void => {
    const input = event.target.value;
    const adjustedInfo = { ...loginInfo, [type]: input };
    setLoginInfo(adjustedInfo);
  };

  const onLogin = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { email, password } = loginInfo;
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      Router.push('/users');
    } catch (error) {
      alert(error);
    }
  };

  const moveSignup = (event) => {
    event.preventDefault();
    Router.push('/signup');
  };

  return (
    <LoginContainer>
      <LoginHead>Messenger</LoginHead>
      <LoginForm>
        <InputWrapper>
          <InputTitle>이메일</InputTitle>
          <LoginInput type="email" value={loginInfo.email} onChange={(e) => adjustInput('email', e)} />
        </InputWrapper>
        <InputWrapper>
          <InputTitle>비밀번호</InputTitle>
          <LoginInput type="password" value={loginInfo.password} onChange={(e) => adjustInput('password', e)} />
        </InputWrapper>
        <ButtonWrapper>
          <LoginButton onClick={onLogin}>로그인 하기</LoginButton>
          <SignupButton onClick={moveSignup}>회원가입</SignupButton>
        </ButtonWrapper>
      </LoginForm>
    </LoginContainer>
  );
}

export default Login;

const LoginContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const LoginHead = styled.h1`
  margin-bottom: 20px;
  font-size: 30px;
  font-weight: 700;
`;

const LoginForm = styled.form`
  width: 300px;
`;

const InputWrapper = styled.div`
  margin: 16px 0;
`;

const InputTitle = styled.p`
  margin-bottom: 8px;
  font-size: 12px;
  color: #b2b2b2;
`;

const LoginInput = styled.input`
  display: block;
  padding: 10px 20px;
  width: 300px;
  font-size: 16px;
  border: 1px solid #f2f2f2;
  border-radius: 8px;

  &:focus {
    border: 1px solid #035397;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
`;

const LoginButton = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #035397;
  border-radius: 8px;
  color: white;
`;

const SignupButton = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #f2f2f2;
`;
