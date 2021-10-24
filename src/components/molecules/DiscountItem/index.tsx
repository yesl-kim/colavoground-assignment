import React, { useState } from 'react';
import styled from 'styled-components';

import { Span, Checkbox } from '../../atoms';

interface DiscountItemProps {
  discount: Discount;
}

export function DiscountItem({ discount }: DiscountItemProps) {
  const { name, rate } = discount;

  const [checked, setChecked] = useState(false);
  const onClick = () => {
    setChecked(!checked);
  };

  return (
    <Container onClick={onClick}>
      <Checkbox checked={checked} onChange={onClick} />
      <Label>
        <Span color="black" size={15}>
          {name}
        </Span>
        <Span color="point" size={14}>{`${Math.round(rate * 100)}%`}</Span>
      </Label>
    </Container>
  );
}

const Container = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px 0;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  padding: 0 10px;
`;
