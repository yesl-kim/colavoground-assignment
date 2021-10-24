import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../../store';
import { toggleMenuModal } from '../../../store/modals';
import { selectItems } from '../../../store/items';
import { Modal, MenuList, ModalTitle } from '../../molecules';
import { API } from '../../../config';

export function MenuModal() {
  const items = useItems();
  const selectedItems = useSelector((state: RootState) => state.items);
  const visible = useSelector((state: RootState) => state.modals.menu);

  const dispatch = useDispatch();
  const onToggleMenu = () => dispatch(toggleMenuModal());
  const save = (items: Item[]) => {
    dispatch(selectItems(items));
    onToggleMenu();
  };

  return (
    <Modal visible={visible} onClose={onToggleMenu}>
      <Container>
        <Top>
          <ModalTitle title="디자이너" subTitle="고객님 이름" />
        </Top>
        <MenuList items={items} selectedItems={selectedItems} save={save} />
      </Container>
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

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Top = styled.header`
  padding: 10px 20px 20px;
  text-align: center;
`;
