import React from 'react';
import styled from 'styled-components';
import SideBar from '../components/SideBar';

function ChatList() {
  return (
    <ChatListContainer>
      <SideBar />
      <ChatListContents>
        <TopBar>채팅</TopBar>
        <ChatingList>
          <ChatElement>채팅방 1</ChatElement>
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
