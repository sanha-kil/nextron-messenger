import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import Router, { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import styled from 'styled-components';
import { firebaseAuth, firebaseDB } from '../../firebase';
import { useGetChatting } from '../hooks/useGetChatting';

function ChatRoom(): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollTargetRef = useRef<HTMLDivElement>(null);
  const { query } = useRouter();
  const messages = useGetChatting(`chats/${query.id}/messages`);
  const user = firebaseAuth.currentUser;

  const sendMessage = async (event) => {
    event.preventDefault();
    const target = inputRef.current?.value;
    if (target.length > 0) {
      await addDoc(collection(firebaseDB, `chats/${query.id}/messages`), {
        createdAt: serverTimestamp(),
        sender: user.displayName,
        senderUid: user.uid,
        text: inputRef.current?.value,
      });
    }
    inputRef.current.value = '';
    scrollTargetRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollTargetRef.current.scrollIntoView();
  }, []);

  return (
    <ChatRoomContainer>
      <ChatHead>
        <BackButton
          onClick={() => {
            Router.push('/users');
          }}
        >
          <AiOutlineArrowLeft />
        </BackButton>
        채팅방
      </ChatHead>
      <ChatWrapper>
        {messages?.map(({ senderUid, id, text, sender }, idx) =>
          senderUid === user.uid ? (
            <MyChatElement key={id}>
              <ChatBubble>{text}</ChatBubble>
            </MyChatElement>
          ) : (
            <OthersChatElement key={id}>
              {senderUid !== messages[idx - 1]?.senderUid && <ChatOwner>{sender}</ChatOwner>}
              <ChatBubble>{text}</ChatBubble>
            </OthersChatElement>
          ),
        )}
        <ScrollTarget ref={scrollTargetRef} />
      </ChatWrapper>
      <ChatForm>
        <ChatInput ref={inputRef} />
        <ChatSubmitButton onClick={sendMessage}>
          <RiSendPlaneFill />
        </ChatSubmitButton>
      </ChatForm>
    </ChatRoomContainer>
  );
}

export default ChatRoom;

const ChatRoomContainer = styled.main`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ChatHead = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 88px;
  border-bottom: 1px solid #c2c2c2;
`;

const BackButton = styled.div``;

const ChatWrapper = styled.div`
  flex: 1;
  padding: 0 14px;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ScrollTarget = styled.div`
  height: 14px;
`;

const OthersChatElement = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;

const ChatOwner = styled.p`
  padding: 10px;
  font-size: 18px;
`;

const MyChatElement = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
`;

const ChatBubble = styled.p`
  padding: 16px 22px;
  margin: 4px 10px;
  max-width: 60vw;
  border: 1px solid #f2f2f2;
  border-radius: 30px;
  font-size: 18px;
`;

const ChatForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
  background-color: #f2f2f2;
`;

const ChatInput = styled.input`
  padding: 12px 20px;
  width: 74vw;
  border: 1px solid #c2c2c2;
  border-radius: 30px;
  font-size: 22px;
`;

const ChatSubmitButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  width: 50px;
  height: 50px;
  border-radius: 30px;
  background-color: #035397;
  font-size: 22px;
  color: white;
`;
