import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { GrClose } from 'react-icons/gr';

interface ModalPropsInterface {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: JSX.Element;
}

function Modal({ isOpen = false, setIsOpen, children }: ModalPropsInterface): JSX.Element {
  return (
    <div>
      {isOpen && (
        <>
          <ModalBackGround onClick={() => setIsOpen(false)} />
          <ModalWrapper>
            <CloseButton onClick={() => setIsOpen(false)}>
              <GrClose />
            </CloseButton>
            {children}
          </ModalWrapper>
        </>
      )}
    </div>
  );
}

export default Modal;

const ModalBackGround = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgb(0, 0, 0, 0.7);
  z-index: 998;
`;

const ModalWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 30px 40px;
  min-width: 70vw;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 20px;
  z-index: 999;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 14px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
`;
