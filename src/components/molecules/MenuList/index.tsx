import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import { MenuItem } from '../index';

interface MenuListProps {
  items: Item[];
  selectedItems: Item[];
  save: (items: Item[]) => void;
}

export function MenuList({ items, selectedItems, save }: MenuListProps) {
  const [localSelectedItems, setLocalSelectedItems] = useState(selectedItems);

  const selectItem = useCallback((item: Item) => setLocalSelectedItems((prev) => prev.concat(item)), []);
  const removeItem = useCallback(
    (id: string) => setLocalSelectedItems((prev) => prev.filter((item) => item.id !== id)),
    [],
  );
  const modifyItemCount = useCallback((id: string, count: number) => {
    const newItem = localSelectedItems.map((item) => (item.id === id ? { ...item, count } : item));
    setLocalSelectedItems(newItem);
  }, []);

  const list = items.map((item) => {
    const selected = localSelectedItems.findIndex(({ id }) => id === item.id) !== -1;
    return (
      <MenuItem
        key={item.id}
        item={item}
        selected={selected}
        select={selectItem}
        remove={removeItem}
        modify={modifyItemCount}
      />
    );
  });

  return (
    <>
      <Content>
        <ul>{list}</ul>
      </Content>
      <Bottom>
        <Paragraph>서비스를 선택하세요 (여러 개 선택가능)</Paragraph>
        <NextButton onClick={() => save(localSelectedItems)}>완료</NextButton>
      </Bottom>
    </>
  );
}

const Content = styled.div`
  flex: 1;
  padding: 0 15px 30px;
  overflow: scroll;
`;

const Bottom = styled.div`
  margin-top: auto;
  padding: 15px 20px 30px;
  border-top: 1px solid #eee;
`;

const NextButton = styled.button`
  padding: 15px 0;
  width: 100%;
  border-radius: 12px;
  background-color: royalblue;
  font-size: 15px;
  color: white;
  text-align: center;
`;

const Paragraph = styled.p`
  margin-bottom: 15px;
  font-size: 12px;
  color: ${({ theme }) => theme.palette.lightGray};
`;
