import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import styled from 'styled-components';
import { getAuth } from 'firebase/auth';
import { firebaseAuth, firebaseDB, firebaseApp } from '../../firebase';
import SideBar from '../components/SideBar';

interface UserListInterface {
  uid: string;
  displayName: string;
}

function Users({ data }): JSX.Element {
  const [userList, setUserList] = useState<UserListInterface[]>([]);
  const user = getAuth(firebaseApp).currentUser;

  useEffect(() => {
    (async () => {
      const ref = doc(firebaseDB, 'users', 'users');
      const res = (await getDoc(ref)).data();
      const target = Object.values(res);
      setUserList(target);
    })();
  }, []);

  return (
    <UserContainer>
      <SideBar />
      <UserContent>
        <TopBar>채팅</TopBar>
        <UserList>
          <MyElement>{user?.displayName}</MyElement>
          {userList.map(
            ({ uid, displayName }) => uid !== user?.uid && <UserElement key={uid}>{displayName}</UserElement>,
          )}
        </UserList>
      </UserContent>
    </UserContainer>
  );
}

export const getServerSideProps = async (context) => {
  const ref = doc(firebaseDB, '', 'users');
  const res = await getDoc(ref);

  return { props: { res } };
};

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
