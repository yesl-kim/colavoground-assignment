import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../../store';
import { toggleMenuModal } from '../../../store/modals';
import { selectItems } from '../../../store/items';

import { Modal, ModalTitle, MenuItem } from '../../molecules';
import { API } from '../../../config';

export function MenuModal() {
  const dispatch = useDispatch();
  const items = useItems();
  const selectedItems = useSelector((state: RootState) => state.items);

  const visible = useSelector((state: RootState) => state.modals.menu);
  const onToggleMenu = () => dispatch(toggleMenuModal());

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

  const onConfirm = () => {
    const selectedItems = localItems.filter((item) => item.count > 0);
    dispatch(selectItems(selectedItems));
    onToggleMenu();
  };

  return (
    <Modal
      visible={visible}
      onClose={onToggleMenu}
      onConfirm={onConfirm}
      header={<ModalTitle title="디자이너" subTitle="고객님 이름" />}
    >
      <Content>
        <ul>
          {localItems.map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              select={selectItem}
              remove={removeItem}
              modifyCount={modifyItemCount}
            />
          ))}
        </ul>
      </Content>
    </Modal>
  );
}

function useItems(): Item[] {
  const [items, setItems] = useState<Item[]>([]);
  useEffect(() => {
    async function getItems() {
      const data = await fetch(API.CART);
      const dataJson = await data.json();
      const itemsObj = dataJson.items;
      const totalItems: Item[] = Object.keys(itemsObj).reduce(
        (item, id) => item.concat({ ...itemsObj[id], id, count: 0 }),
        [],
      );
      setItems(totalItems);
    }
    getItems();
  }, []);

  return items;
}

const Content = styled.div`
  padding: 0 15px 30px;
`;
