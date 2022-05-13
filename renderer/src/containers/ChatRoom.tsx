import firestore, {
  addDoc,
  query as fbQuery,
  collection,
  getDocs,
  orderBy,
  serverTimestamp,
  limit,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { firebaseAuth, firebaseDB } from '../../firebase';

function ChatRoom(): JSX.Element {
  const [message, setMessage] = useState([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { query } = useRouter();
  const user = firebaseAuth.currentUser;

  const sendMessage = async (event) => {
    event.preventDefault();
    const target = inputRef.current?.value;
    if (target.length > 0) {
      await addDoc(collection(firebaseDB, `chats/${query.id}/messages`), {
        createdAt: serverTimestamp(),
        sender: firebaseAuth.currentUser.displayName,
        text: inputRef.current?.value,
      });
    }
    inputRef.current.value = '';
    loadMessage();
  };

  orderBy('createdAt', 'desc');

  const loadMessage = async () => {
    const target = [];

    const aRef = collection(firebaseDB, `chats/${query.id}/messages`);
    const q = fbQuery(aRef, orderBy('createdAt', 'asc'), limit(200));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      target.push({
        ...doc.data(),
        id: doc.id,
      });
    });

    setMessage(target);
  };

  useEffect(() => {
    loadMessage();
  }, []);

  return (
    <ChatRoomContainer>
      {message.map((el) => (
        <ChatElement key={el.id}>{el.text}</ChatElement>
      ))}
      <ChatForm>
        <ChatInput ref={inputRef} />
        <ChatSubmitButton onClick={sendMessage}>보내기</ChatSubmitButton>
      </ChatForm>
    </ChatRoomContainer>
  );
}

export default ChatRoom;

const ChatRoomContainer = styled.main``;

const ChatHead = styled.div``;

const ChatElement = styled.div``;

const ChatForm = styled.form``;

const ChatInput = styled.input``;

const ChatSubmitButton = styled.button``;
