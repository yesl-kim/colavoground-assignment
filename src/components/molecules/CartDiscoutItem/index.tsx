import React from 'react';
import styled from 'styled-components';
import { IoIosArrowDown } from 'react-icons/io';

import { Span } from '../../atoms';

interface CartDiscountItemProps {
  discount: Discount;
}

export function CartDiscountItem({ discount }: CartDiscountItemProps) {
  const { name, rate } = discount;

  return (
    <Container>
      <LabelWrapper>
        <Span color="gray" size={14}>
          {name}
        </Span>
        <Span color="lightGray" size={13}>
          여성컷, 스타일링, 디지털펌, 전체염색
        </Span>
        <Span color="point" size={14} bold>
          {`-원 (${Math.round(rate * 100)}%)`}
        </Span>
      </LabelWrapper>
      <TooltipButton>
        <span>수정</span>
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
