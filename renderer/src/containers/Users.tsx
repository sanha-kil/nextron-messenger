import React from 'react';
import styled from 'styled-components';
import SideBar from '../components/SideBar';

function Users(): JSX.Element {
  return (
    <UserContainer>
      <SideBar />
      <div>ㅎㅇ</div>
    </UserContainer>
  );
}

export default Users;

const UserContainer = styled.main`
  display: flex;
`;
