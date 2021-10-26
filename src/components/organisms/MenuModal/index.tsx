import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../../store';
import { toggleMenuModal } from '../../../store/modals';
import { selectItems } from '../../../store/items';

import { Modal, ModalTitle, MenuItem } from '../../molecules';
import { API } from '../../../config';

export function MenuModal() {
  const dispatch = useDispatch();
  const [totalItems, setTotalItems] = useState<Item[]>([]);
  const selectedItems = useSelector((state: RootState) => state.items);

  const [items, setItems] = useState<Item[]>([]);

  const visible = useSelector((state: RootState) => state.modals.menu);
  const onToggleMenu = () => dispatch(toggleMenuModal());

  useEffect(() => {
    async function getItems() {
      const data = await fetch(API.CART);
      const dataJson = await data.json();
      const itemsObj = dataJson.items;
      const total =  Object.keys(itemsObj).reduce(
        (item, id) => item.concat({ ...itemsObj[id], id, count: 0 }),
        [],
      );
      setTotalItems(total);
    }
    getItems();
  }, [])

  useEffect(() => {
    const userItems = totalItems.map((item) => {
      const selectedIdx = selectedItems.findIndex(({id}) => id === item.id);
      return selectedIdx === -1 ? item : selectedItems[selectedIdx];
    });
    setItems(userItems);
  }, [totalItems, selectedItems]);

  const selectItem = useCallback((id: string) => {
    setItems((items) => items.map((item) => (item.id === id ? { ...item, count: 1 } : item)));
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((items) => items.map((item) => (item.id === id ? { ...item, count: 0 } : item)));
  }, []);

  const modifyItemCount = useCallback((id: string, count: number) => {
    setItems((items) => items.map((item) => (item.id === id ? { ...item, count } : item)));
  }, []);

  const onConfirm = () => {
    const selectedItems = items.filter((item) => item.count > 0);
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
          {items.map((item) => (
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

const Content = styled.div`
  padding: 0 15px 30px;
`;
