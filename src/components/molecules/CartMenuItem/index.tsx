import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';

import { Span } from '../../atoms';
import { Tooltip, Counter } from '../index';

interface CartMenuItemProps {
  item: Item;
  modifyCount: (id: string, count: number) => void;
  remove: (id: string) => void;
}

function CartMenuItem({ item, modifyCount, remove }: CartMenuItemProps) {
  const { name, count, price, id } = item;

  const totalPrice = useMemo(() => price * count, [price, count]);
  const localPrice = useMemo(() => totalPrice.toLocaleString(), [totalPrice]);

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

  useEffect(() => {
    if (count === localCount) return;
    setLocalCount(count);
  }, []);

  return (
    <Container>
      <LabelWrapper>
        <Span color="gray" size={14}>
          {name}
        </Span>
        <Span color="black" size={14} bold>
          {`${localPrice}원`}
        </Span>
      </LabelWrapper>
      <Tooltip
        title={name}
        buttonLabel={count}
        confirmCallback={confirmCallback}
        cancelCallback={cancelCallback}
      >
        <Counter count={localCount} onDecrease={onDecrease} onIncrease={onIncrease} />
      </Tooltip>
    </Container>
  );
}

export default React.memo(CartMenuItem);

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
