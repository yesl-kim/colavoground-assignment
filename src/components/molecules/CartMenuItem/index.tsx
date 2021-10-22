import React from 'react';
import styled from 'styled-components';
import { IoIosArrowDown } from 'react-icons/io';

import { Span } from '../../atoms';

export function CartMenuItem() {
  return (
    <Container>
      <LabelWrapper>
        <Span color="gray" size={14}>
          스타일링
        </Span>
        <Span color="black" size={14} bold>
          60,000원
        </Span>
      </LabelWrapper>
      <TooltipButton>
        <span>3</span>
        <IoIosArrowDown />
      </TooltipButton>
    </Container>
  );
}

const Container = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
`;

const LabelWrapper = styled.p`
  display: flex;
  flex-direction: column;
`;

const TooltipButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  border-radius: 15px;
  background-color: #f5f5f5;
  text-align: center;
  color: #999;

  span {
    margin: 0 3px;
    line-height: 1.5;
  }
`;
