import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import Router from 'next/router';
import styled from 'styled-components';
import { firebaseAuth, firebaseDB } from '../../firebase';

interface SignupInfoInterface {
  email: string;
  password: string;
  checkPassword: string;
  name: string;
}

function SignUp(): JSX.Element {
  const [signupInfo, setSignupInfo] = useState<SignupInfoInterface>({
    email: '',
    password: '',
    checkPassword: '',
    name: '',
  });

  const adjustInput = (type: string, event: ChangeEvent<HTMLInputElement>): void => {
    const input = event.target.value;
    const adjustedInfo = { ...signupInfo, [type]: input };
    setSignupInfo(adjustedInfo);
  };

  const onSignup = async (event: MouseEvent) => {
    event.preventDefault();
    const auth = firebaseAuth;
    const { email, password, name } = signupInfo;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: name,
      });

      await setDoc(doc(firebaseDB, 'users', auth.currentUser.uid), {
        displayName: auth.currentUser.displayName,
        uid: auth.currentUser.uid,
        chatList: {},
      });

      Router.push('/users');
    } catch (error) {
      console.log(error);
    }
  };

  const moveToLogin = (event: MouseEvent) => {
    event.preventDefault();
    Router.push('/login');
  };

  return (
    <SignupContainer>
      <SignupHead>회원가입</SignupHead>
      <SignupForm>
        <InputWrapper>
          <InputTitle>이메일</InputTitle>
          <SignupInput type="email" value={signupInfo.email} onChange={(e) => adjustInput('email', e)} />
        </InputWrapper>
        <InputWrapper>
          <InputTitle>비밀번호</InputTitle>
          <SignupInput type="password" value={signupInfo.password} onChange={(e) => adjustInput('password', e)} />
        </InputWrapper>
        <InputWrapper>
          <InputTitle>비밀번호 확인</InputTitle>
          <SignupInput
            type="password"
            value={signupInfo.checkPassword}
            onChange={(e) => adjustInput('checkPassword', e)}
          />
        </InputWrapper>
        <InputWrapper>
          <InputTitle>이름</InputTitle>
          <SignupInput value={signupInfo.name} onChange={(e) => adjustInput('name', e)} />
        </InputWrapper>
        <ButtonWrapper>
          <SubmitButton onClick={onSignup}>가입하기</SubmitButton>
          <BackButton onClick={moveToLogin}>돌아가기</BackButton>
        </ButtonWrapper>
      </SignupForm>
    </SignupContainer>
  );
}

export default SignUp;

const SignupContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const SignupHead = styled.h1`
  margin-bottom: 22px;
  font-size: 22px;
  font-weight: 700;
`;

const SignupForm = styled.form`
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

const SignupInput = styled.input`
  display: block;
  padding: 10px 20px;
  width: 100%;
  font-size: 16px;
  border: 1px solid #f2f2f2;
  border-radius: 8px;

  &:focus {
    border: 1px solid #035397;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  margin-top: 30px;
`;

const SubmitButton = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #035397;
  border-radius: 8px;
  color: white;
`;

const BackButton = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #f2f2f2;
`;
