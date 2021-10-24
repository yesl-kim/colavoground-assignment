import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import { MenuItem } from '../index';

interface MenuListProps {
  items: Item[];
  selectedItems: Item[];
  save: (items: Item[]) => void;
}

export function MenuList({ items, selectedItems, save }: MenuListProps) {
  const [localItems, setLocalItems] = useState(items);

  useEffect(() => {
    const userItems = items.map((item) => {
      const selectedIdx = selectedItems.findIndex((selectedItem) => selectedItem.id === item.id);
      return selectedIdx === -1 ? item : selectedItems[selectedIdx];
    });
    setLocalItems(userItems);
  }, []);

  const selectItem = useCallback((id: string) => {
    setLocalItems((items) => items.map((item) => (item.id === id ? { ...item, count: 1 } : item)));
  }, []);

  const removeItem = useCallback((id: string) => {
    setLocalItems((items) => items.map((item) => (item.id === id ? { ...item, count: 0 } : item)));
  }, []);

  const modifyItemCount = useCallback((id: string, count: number) => {
    setLocalItems((items) => items.map((item) => (item.id === id ? { ...item, count } : item)));
  }, []);

  const complete = () => {
    const selectedItems = localItems.filter((item) => item.count > 0);
    save(selectedItems);
  };

  return (
    <>
      <Content>
        <ul>
          {localItems.map((item) => (
            <MenuItem key={item.id} item={item} select={selectItem} remove={removeItem} modifyCount={modifyItemCount} />
          ))}
        </ul>
      </Content>
      <Bottom>
        <Paragraph>서비스를 선택하세요 (여러 개 선택가능)</Paragraph>
        <NextButton onClick={complete}>완료</NextButton>
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
