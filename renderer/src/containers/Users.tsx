import React, { useEffect, useState } from 'react';
import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import styled from 'styled-components';
import Router from 'next/router';
import { getAuth } from 'firebase/auth';
import { firebaseDB } from '../../firebase';
import SideBar from '../components/SideBar';

interface UserListInterface {
  uid: string;
  displayName: string;
}

function Users(): JSX.Element {
  const [userList, setUserList] = useState<UserListInterface[]>([]);
  const { currentUser } = getAuth();

  const onRoomClick = async (targetUid: string) => {
    const userId = currentUser.uid;
    const userRef = doc(firebaseDB, 'users', userId);
    const { chatList } = await (await getDoc(userRef)).data();

    if (!chatList[targetUid]) {
      const { id } = await addDoc(collection(firebaseDB, 'chats'), {});
      await updateDoc(doc(firebaseDB, 'users', targetUid), {
        chatList: { ...chatList, [userId]: id },
      });
      await updateDoc(doc(firebaseDB, 'users', userId), {
        chatList: { ...chatList, [targetUid]: id },
      });
    }

    Router.push(`/chatroom/${chatList[targetUid]}?isGroupChat=false`);
  };

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(firebaseDB, 'users'));

      const target = [];
      querySnapshot.forEach((doc) => target.push(doc.data()));
      setUserList(target);
    })();
  }, []);

  return (
    <UserContainer>
      <SideBar />
      <UserContent>
        <TopBar>유저 목록</TopBar>
        <UserList>
          <MyHead>내 프로필</MyHead>
          <MyElement>{currentUser?.displayName}</MyElement>
          <UserHead>유저 목록</UserHead>
          {userList.map(
            ({ uid, displayName }) =>
              uid !== currentUser?.uid && (
                <UserElement key={uid} onClick={() => onRoomClick(uid)}>
                  {displayName}
                </UserElement>
              ),
          )}
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
  display: flex;
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

const MyHead = styled.li`
  padding: 16px 16px 10px;
  font-size: 12px;
  color: #c2c2c2;
`;

const MyElement = styled.li`
  width: 100%;
  padding: 18px 18px 18px 16px;
  border-bottom: 1px solid #f2f2f2;
  font-size: 24px;
`;

const UserHead = styled.li`
  padding: 50px 16px 10px;
  border-bottom: 1px solid #f2f2f2;
  font-size: 12px;
  color: #c2c2c2;
`;

const UserElement = styled.li`
  width: 100%;
  padding: 16px;
  border-bottom: 1px solid #f2f2f2;
  font-size: 20px;
`;
