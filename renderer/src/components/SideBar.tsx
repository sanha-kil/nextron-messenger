import React from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { BsPeopleFill, BsFillChatFill } from 'react-icons/bs';

function SideBar(): JSX.Element {
  return (
    <SideBarContainer>
      <SideBarButton onClick={() => Router.push('/users')}>
        <BsPeopleFill />
      </SideBarButton>
      <SideBarButton onClick={() => Router.push('/list')}>
        <BsFillChatFill />
      </SideBarButton>
    </SideBarContainer>
  );
}

export default SideBar;

const SideBarContainer = styled.nav`
  position: sticky;
  top: 0;
  bottom: 0;
  left: 0;
  height: 100vh;
  padding: 30px 20px;
  border-right: 1px solid #f2f2f2;
  background-color: white;
  z-index: 999;
`;

const SideBarButton = styled.button`
  display: block;
  margin-bottom: 10px;
  font-size: 30px;
  color: #035397;
  cursor: pointer;
`;
