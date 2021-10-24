import React, { useState, useCallback, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { IoIosArrowDown } from 'react-icons/io';

import { Span } from '../../atoms';

interface TooltipProps {
  title: string;
  buttonLabel: string | number;
  deleteText?: string;
  confirmText?: string;
  children: React.ReactNode;
  confirmCallback: () => void;
  cancelCallback: () => void;
}

const defaultProps = {
  deleteText: '삭제',
  confirmText: '완료',
};

type Direction = 'top' | 'bottom';

interface TooltipBoxProps {
  direction: Direction;
  size?: 'regular' | 'big';
}

const tooltipBoxSizes = {
  regular: '250px',
  big: '300px',
};

function Tooltip({
  title,
  buttonLabel,
  deleteText,
  confirmText,
  children,
  confirmCallback,
  cancelCallback,
}: TooltipProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [direction, setDirection] = useState<Direction>('top');
  const windowHeight = useMemo(() => getWindowHeight(), []);

  const toggleTootip: React.MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    if (e.clientY > windowHeight / 2) setDirection('bottom');
    else setDirection('top');

    setIsOpened((prev) => !prev);
  }, []);

  const confirm: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (confirmCallback) confirmCallback();
    setIsOpened(false);
  };

  const cancel: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (cancelCallback) cancelCallback();
    setIsOpened(false);
  };

  return (
    <Container>
      <TooltipButton type="button" onClick={toggleTootip}>
        <Span color="#999" size={14}>
          {buttonLabel}
        </Span>
        <IoIosArrowDown color="#999" />
      </TooltipButton>
      {isOpened && (
        <TooltipBox direction={direction}>
          <Title>{title}</Title>
          <Content>{children}</Content>
          <ButtonWrapper>
            <Button type="button" dataRole="delete" onClick={cancel}>
              {deleteText}
            </Button>
            <Button type="button" dataRole="confirm" onClick={confirm}>
              {confirmText}
            </Button>
          </ButtonWrapper>
        </TooltipBox>
      )}
    </Container>
  );
}

export default React.memo(Tooltip);

Tooltip.defaultProps = defaultProps;

const getWindowHeight = () => {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight,
  );
};

const Container = styled.div`
  position: relative;
`;

const TooltipButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  border-radius: 15px;
  background-color: #f5f5f5;
  text-align: center;

  span {
    margin: 0 3px;
  }
`;

const TooltipBox = styled.div<TooltipBoxProps>`
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 250px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: #fff;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  overflow: hidden;
  z-index: 1000;

  ${({ direction, size = 'regular' }) =>
    css`
      ${direction}: calc(100% + 5px);
      width: ${tooltipBoxSizes[size]};
      height: ${tooltipBoxSizes[size]};
    `}
`;

const Title = styled.h4`
  width: 100%;
  padding: 20px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  color: #999;
  font-weight: bold;
`;

const Content = styled.div`
  flex: 1;
`;

const ButtonWrapper = styled.div`
  position: relative;
  display: flex;
  margin-top: auto;
  border-top: 1px solid #eee;

  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 90%;
    width: 1px;
    background-color: #eee;
    transform: translateY(-50%);
  }
`;

const Button = styled.button<{ dataRole: 'delete' | 'confirm' }>`
  padding: 20px 0;
  width: 50%;
  font-size: 14px;
  text-align: center;

  ${({ dataRole, theme }) => css`
    color: ${dataRole === 'delete' ? theme.palette.point : '#999'};
  `}
`;
