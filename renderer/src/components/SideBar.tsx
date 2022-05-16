import React from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { BsPeopleFill, BsFillChatFill } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { getAuth, signOut } from 'firebase/auth';

function SideBar(): JSX.Element {
  const auth = getAuth();

  const onLogout = async () => {
    try {
      await signOut(auth);
      Router.push('/');
    } catch (error) {
      console.log('다시 시도해주세요');
    }
  };

  return (
    <SideBarContainer>
      <div>
        <SideBarButton onClick={() => Router.push('/users')}>
          <BsPeopleFill />
        </SideBarButton>
        <SideBarButton onClick={() => Router.push('/list')}>
          <BsFillChatFill />
        </SideBarButton>
      </div>
      <div>
        <SideBarButton onClick={onLogout}>
          <FiLogOut />
        </SideBarButton>
      </div>
    </SideBarContainer>
  );
}

export default SideBar;

const SideBarContainer = styled.nav`
  position: sticky;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  top: 0;
  bottom: 0;
  left: 0;
  height: 100vh;
  padding: 80px 20px 30px;
  border-right: 1px solid #f2f2f2;
  background-color: white;
  z-index: 999;
`;

const ButtonWrapper = styled.div``;

const SideBarButton = styled.button`
  display: block;
  margin-bottom: 10px;
  font-size: 30px;
  color: #035397;
  cursor: pointer;
`;
