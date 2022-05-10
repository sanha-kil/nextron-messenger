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
  left: 0;
  padding: 30px 20px;
  height: 100vh;
  border-right: 1px solid #f2f2f2;
`;

const SideBarButton = styled.button`
  display: block;
  margin-bottom: 10px;
  font-size: 30px;
  color: #035397;
  cursor: pointer;
`;
