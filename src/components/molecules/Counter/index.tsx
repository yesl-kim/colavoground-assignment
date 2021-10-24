import React from 'react';
import styled from 'styled-components';

import { Span } from '../../atoms';

interface CounterProps {
  count: number;
  onDecrease: React.MouseEventHandler<HTMLButtonElement>;
  onIncrease: React.MouseEventHandler<HTMLButtonElement>;
}

export function Counter({ count, onDecrease, onIncrease }: CounterProps) {
  return (
    <Container>
      <CountButton type="button" onClick={onDecrease}>
        -
      </CountButton>
      <Span color="black" size={24}>
        {count}
      </Span>
      <CountButton type="button" onClick={onIncrease}>
        +
      </CountButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 50px 0;
`;

const CountButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #bbb;
  font-size: 20px;
  color: #bbb;
`;
