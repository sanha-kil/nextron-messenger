import React from 'react';
import styled from 'styled-components';
import SideBar from '../components/SideBar';

function ChatList() {
  return (
    <ChatListContainer>
      <SideBar />
      <ChatListContents>
        <TopBar>채팅</TopBar>
        <Chats>
          <ChatElement />
        </Chats>
      </ChatListContents>
    </ChatListContainer>
  );
}

export default ChatList;

const ChatListContainer = styled.main`
  display: flex;
`;

const ChatListContents = styled.section`
  width: 100%;
`;

const TopBar = styled.div`
  padding: 24px 16px;
  border-bottom: 1px solid #f2f2f2;
  font-size: 28px;
`;

const Chats = styled.ul``;

const ChatElement = styled.li``;
