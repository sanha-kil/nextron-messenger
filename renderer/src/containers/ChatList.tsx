import { addDoc, collection, doc, getDocs, setDoc } from 'firebase/firestore';
import Router from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { firebaseDB } from '../../firebase';
import SideBar from '../components/SideBar';
import Modal from '../components/Modal';

function ChatList(): JSX.Element {
  const [chatList, setChatList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const roomNameInputRef = useRef(null);

  const createRoom = async () => {
    const roomName = roomNameInputRef.current.value;
    const { id } = await addDoc(collection(firebaseDB, 'groupChats'), {});
    await setDoc(doc(firebaseDB, 'groupChats', id), {
      roomName,
      id,
    });
    Router.push({ pathname: `/chatroom/${id}`, query: { isGroupChat: true } });
  };

  useEffect(() => {
    (async () => {
      const target = [];
      const querySnapshot = await getDocs(collection(firebaseDB, 'groupChats'));
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
        <TopBar>
          <TopHead>그룹 채팅</TopHead>
          <NewRoomButton onClick={() => setIsModalOpen(true)}>
            <AiOutlinePlusCircle />
          </NewRoomButton>
        </TopBar>
        <ChattngList>
          {chatList.map(({ id, roomName }) => (
            <ChatElement
              key={id}
              onClick={() => Router.push({ pathname: `/chatroom/${id}`, query: { isGroupChat: true } })}
            >
              {roomName}
            </ChatElement>
          ))}
        </ChattngList>
      </ChatListContents>
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <>
          <ModalInfo>채팅방 이름을 입력해주세요.</ModalInfo>
          <InputWrapper>
            <RoomInput ref={roomNameInputRef} />
            <SubmitButton onClick={createRoom}>생성</SubmitButton>
          </InputWrapper>
        </>
      </Modal>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 16px;
  border-bottom: 1px solid #f2f2f2;
`;

const TopHead = styled.h1`
  font-size: 28px;
`;

const NewRoomButton = styled.button`
  font-size: 24px;
`;

const ModalInfo = styled.p`
  font-size: 20px;
`;

const InputWrapper = styled.div`
  display: flex;
  margin-top: 20px;
`;

const RoomInput = styled.input`
  padding: 12px 20px;
  border: 1px solid #c2c2c2;
  border-radius: 30px;
  font-size: 18px;
`;

const SubmitButton = styled.button`
  margin-left: 10px;
  width: 50px;
  background-color: #035397;
  border-radius: 20px;
  color: white;
`;

const ChattngList = styled.ul`
  overflow: auto;
`;

const ChatElement = styled.li`
  width: 100%;
  padding: 16px;
  border-bottom: 1px solid #f2f2f2;
  font-size: 20px;
`;
