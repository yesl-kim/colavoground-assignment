import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes, css } from 'styled-components';
import { IoClose } from 'react-icons/io5';

interface ModalProps {
  visible: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const el: Element = document.querySelector('#modal')!;

export function Modal({ visible, children, onClose }: ModalProps) {
  const [animate, setAnimate] = useState(false);
  const [localVisible, setLocalVisible] = useState(visible);

  useEffect(() => {
    if (localVisible && !visible) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 250);
    }
    setLocalVisible(visible);
  }, [localVisible, visible]);

  if (!animate && !localVisible) return null;

  return createPortal(
    <Dimmer disappear={!visible}>
      <Container disappear={!visible}>
        <CloseButton onClick={onClose}>
          <IoClose color="#666" size={25} />
        </CloseButton>
        {children}
      </Container>
    </Dimmer>,
    el,
  );
}

const fadeIn = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1
  }
  to {
    opacity: 0
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(200px);
  }
  to {
    transform: translateY(0px);
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(200px);
  }
`;

const Dimmer = styled.div<{ disappear: boolean }>`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);

  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;

  ${({ disappear }) =>
    disappear &&
    css`
      animation-name: ${fadeOut};
    `}
`;

const Container = styled.section<{ disappear: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-self: end;
  width: 100%;
  height: calc(100vh - 30px);
  border-radius: 10px 10px 0 0;
  background: white;

  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${slideUp};
  animation-fill-mode: forwards;

  ${({ disappear }) =>
    disappear &&
    css`
      animation-name: ${slideDown};
    `}
`;

const Top = styled.header`
  padding: 10px 20px 20px;
  text-align: center;
`;

const Content = styled.div`
  flex: 1;
  padding: 0 15px 30px;
  overflow: scroll;
`;

const Bottom = styled.div`
  margin-top: auto;
  padding: 0 20px 30px;
  border-top: 1px solid #eee;
`;

const CloseButton = styled.button`
  position: absolute;
  left: 12px;
  top: 12px;
`;
