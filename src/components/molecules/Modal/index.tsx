import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes, css } from 'styled-components';
import { IoClose } from 'react-icons/io5';

interface ModalProps {
  visible: boolean;
  header: React.ReactNode;
  children: React.ReactNode;
  onClose: React.MouseEventHandler<HTMLButtonElement>;
  onConfirm: React.MouseEventHandler<HTMLButtonElement>;
}

const el: Element = document.querySelector('#modal')!;

export function Modal({ visible, header, children, onClose, onConfirm }: ModalProps) {
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
        <Header>{header}</Header>
        <Content>{children}</Content>
        <Footer>
          <Paragraph>서비스를 선택하세요 (여러 개 선택가능)</Paragraph>
          <ConfirmButton onClick={onConfirm}>다음</ConfirmButton>
        </Footer>
        <CloseButton onClick={onClose}>
          <IoClose color="#666" size={25} />
        </CloseButton>
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

const Header = styled.header`
  padding: 10px 20px 20px;
  text-align: center;
`;

const Content = styled.div`
  flex: 1;
  overflow: scroll;
`;

const Footer = styled.footer`
  margin-top: auto;
  padding: 15px 20px 30px;
  border-top: 1px solid #eee;
`;

const CloseButton = styled.button`
  position: absolute;
  left: 12px;
  top: 12px;
`;

const ConfirmButton = styled.button`
  padding: 15px 0;
  width: 100%;
  border-radius: 12px;
  background-color: royalblue;
  font-size: 15px;
  color: white;
  text-align: center;
`;

const Paragraph = styled.p`
  margin-bottom: 15px;
  font-size: 12px;
  color: ${({ theme }) => theme.palette.lightGray};
`;
