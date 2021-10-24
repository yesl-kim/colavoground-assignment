import React, { useState } from 'react';
import styled from 'styled-components';

import { Span, Checkbox } from '../../atoms';

interface DiscountItemProps {
  discount: Discount;
  selected: boolean;
  toggle: (discount: Discount) => void;
}

function DiscountItem({ discount, selected, toggle }: DiscountItemProps) {
  const { name, rate } = discount;

  const onChange = () => toggle(discount);

  return (
    <Container>
      <CheckboxWrapper>
        <Checkbox checked={selected} onChange={onChange} />
        <Label>
          <Span color="black" size={15}>
            {name}
          </Span>
          <Span color="point" size={14}>{`${Math.round(rate * 100)}%`}</Span>
        </Label>
      </CheckboxWrapper>
    </Container>
  );
}

export default React.memo(DiscountItem);

const Container = styled.li`
  display: flex;
  align-items: center;
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
