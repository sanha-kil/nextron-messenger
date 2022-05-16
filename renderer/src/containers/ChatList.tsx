import { collection, getDocs } from 'firebase/firestore';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { firebaseDB } from '../../firebase';
import SideBar from '../components/SideBar';

function ChatList(): JSX.Element {
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    (async () => {
      const target = [];
      const querySnapshot = await getDocs(collection(firebaseDB, 'chats'));
      querySnapshot.forEach((doc) => {
        target.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setChatList(target);
    })();
  }, []);

  return (
    <ChatListContainer>
      <SideBar />
      <ChatListContents>
        <TopBar>채팅</TopBar>
        <ChatingList>
          {chatList.map(({ id, name }) => (
            <ChatElement key={id} onClick={() => Router.push(`/chatroom/${id}`)}>
              {name}
            </ChatElement>
          ))}
        </ChatingList>
      </ChatListContents>
    </ChatListContainer>
  );
}

export default ChatList;

const ChatListContainer = styled.main`
  display: flex;
`;

const ChatListContents = styled.section`
  flex: 1;
`;

const TopBar = styled.div`
  position: sticky;
  padding: 24px 16px;
  border-bottom: 1px solid #f2f2f2;
  font-size: 28px;
`;

const ChatingList = styled.ul``;

const ChatElement = styled.li``;
