import React, { useState } from 'react';
import styled from 'styled-components';
import { BsCheckLg } from 'react-icons/bs';

import { Span } from '../../atoms';
import { Tooltip } from '../index';

interface CartDiscountItemProps {
  discount: Discount;
  selectedItems: Item[];
}

export function CartDiscountItem({ discount, selectedItems }: CartDiscountItemProps) {
  const { name, rate } = discount;

  const confirmCallback = () => {
    console.log('');
  };
  const cancelCallback = () => {
    console.log('d');
  };

  return (
    <Container>
      <Paragraph>
        <Span color="gray" size={14}>
          {name}
        </Span>
        <Span color="lightGray" size={13}>
          {selectedItems.map(({ name, count }) => (count > 1 ? `${name}x${count}` : name)).join(', ')}
        </Span>
        <Span color="point" size={14} bold>
          {`-원 (${Math.round(rate * 100)}%)`}
        </Span>
      </Paragraph>
      <Tooltip
        title={name}
        buttonLabel="수정"
        size="big"
        confirmCallback={confirmCallback}
        cancelCallback={cancelCallback}
      >
        <DiscountedList>
          {selectedItems.map((item) => (
            <DiscountedItem key={item.id}>
              <CheckboxWrapper>
                <Label>
                  <Span color="gray" size={14}>{`${item.name}x${item.count}`}</Span>
                  <Span size={14} bold>{`${item.price}원`}</Span>
                </Label>
                <Input type="checkbox" />
                <BsCheckLg size={16} color="#7027A0" />
              </CheckboxWrapper>
            </DiscountedItem>
          ))}
        </DiscountedList>
      </Tooltip>
    </Container>
  );
}

const Container = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
`;

const Paragraph = styled.p`
  display: flex;
  flex-direction: column;
`;

const DiscountedList = styled.ul`
  padding: 20px;
`;

const DiscountedItem = styled.li`
  margin-bottom: 20px;
`;

const CheckboxWrapper = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`;

const Input = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: polygon(0 0, 0 0, 0 0);
`;

const Label = styled.p`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
