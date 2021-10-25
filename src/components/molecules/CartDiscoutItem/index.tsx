import React, { useState } from 'react';
import styled from 'styled-components';
import { BsCheckLg } from 'react-icons/bs';

import { Span } from '../../atoms';
import { Tooltip } from '../index';

interface CartDiscountItemProps {
  discount: Discount;
  selectedItems: Item[];
  remove: (id: string) => void;
}

export function CartDiscountItem({ discount, selectedItems, remove }: CartDiscountItemProps) {
  const { name, rate, id } = discount;
  const [notDiscoutedIds, setNotDiscountedIds] = useState<string[]>([]);
  const [localCheck, setLocalCheck] = useState<string[]>([]);

  const discountedItems = selectedItems.filter(({id}) => !notDiscoutedIds.includes(id)).map(({ name, count }) => (count > 1 ? `${name}x${count}` : name)).join(', ');

  const toggleDiscount:React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const {name: id} = e.target;
    if(localCheck.includes(id)) setLocalCheck(local => local.filter(localId => localId !== id));
    else setLocalCheck(local => local.concat(id))
  }

  const confirmCallback = () => {
    setNotDiscountedIds(localCheck);
  };
  const cancelCallback = () => {
    setNotDiscountedIds(ids => ids.concat(id));
    remove(id);
  };

  return (
    <Container>
      <Paragraph>
        <Span color="gray" size={14}>
          {name}
        </Span>
        <Span color="lightGray" size={13}>
          {discountedItems}
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
          {selectedItems.map((item) => {
            const checked = !localCheck.includes(item.id)
            return (
            <DiscountedItem key={item.id}>
              <CheckboxWrapper>
                <Label>
                  <Span color="gray" size={14}>{`${item.name}x${item.count}`}</Span>
                  <Span size={14} bold>{`${item.price}원`}</Span>
                </Label>
                <Input type="checkbox" checked={checked} name={item.id} onChange={toggleDiscount} />
                {checked && <BsCheckLg size={16} color="#7027A0" />}
              </CheckboxWrapper>
            </DiscountedItem>
          )})}
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
