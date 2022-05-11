import React from 'react';
import styled from 'styled-components';
import firebaseAuth from '../../firebase';
import SideBar from '../components/SideBar';

function Users(): JSX.Element {
  const { displayName } = firebaseAuth.currentUser;

  return (
    <UserContainer>
      <SideBar />
      <UserContent>
        <TopBar>유저</TopBar>
        <UserList>
          <MyElement>{displayName}</MyElement>
          <UserElement>친구 1</UserElement>
          <UserElement>친구 2</UserElement>
        </UserList>
      </UserContent>
    </UserContainer>
  );
}

export default Users;

const UserContainer = styled.main`
  display: flex;
`;

const UserContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TopBar = styled.div`
  position: sticky;
  top: 0;
  padding: 24px 16px;
  border-bottom: 1px solid #f2f2f2;
  background-color: white;
  font-size: 28px;
`;

const UserList = styled.ul`
  flex: 1;
  overflow: auto;
`;

const MyElement = styled.li`
  width: 100%;
  padding: 16px;
  border-bottom: 1px soild #f2f2f2;
  font-size: 22px;
`;

const UserElement = styled.li`
  width: 100%;
  padding: 16px;
  font-size: 20px;
`;
