import React, { useState } from 'react';
import styled from 'styled-components';

import { Span, Checkbox } from '../../atoms';
import { Tooltip, Counter } from '../index';

interface MenuItemProps {
  item: Item;
  select: (id: string) => void;
  remove: (id: string) => void;
  modifyCount: (id: string, count: number) => void;
}

function MenuItem({ item, select, remove, modifyCount }: MenuItemProps) {
  const { name, count, price, id } = item;
  const localPrice = price.toLocaleString();
  const selected = count > 0;

  const onChange: React.ChangeEventHandler<HTMLInputElement> = () => {
    if (selected) remove(id);
    else select(id);
  };

  const [localCount, setLocalCount] = useState(count);
  const onIncrease = () => {
    if (localCount >= 100) return;
    setLocalCount((prev) => prev + 1);
  };
  const onDecrease = () => {
    if (localCount <= 1) return;
    setLocalCount((prev) => prev - 1);
  };

  const confirmCallback = () => modifyCount(id, localCount);
  const cancelCallback = () => remove(id);

  return (
    <Container>
      <CheckboxWrapper>
        <Checkbox checked={selected} onChange={onChange} />
        <Label>
          <Span color="black" size={15}>
            {name}
          </Span>
          <Price>{`${localPrice}원, 1시간`}</Price>
        </Label>
      </CheckboxWrapper>
      {selected && (
        <Tooltip title="총수" buttonLabel={count} confirmCallback={confirmCallback} cancelCallback={cancelCallback}>
          <Counter count={localCount} onDecrease={onDecrease} onIncrease={onIncrease} />
        </Tooltip>
      )}
    </Container>
  );
}

export default React.memo(MenuItem);

const Container = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
`;

const CheckboxWrapper = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
`;

const Label = styled.p`
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  flex: 1;
`;

const Price = styled.span`
  position: relative;
  display: inline-block;
  padding-left: 10px;
  font-size: 14px;
  line-height: 1.5;
  color: #999;

  &::before {
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -3px;
    width: 5px;
    height: 5px;
    border-radius: 4px;
    background-color: #69dadb;
    content: '';
  }
`;
