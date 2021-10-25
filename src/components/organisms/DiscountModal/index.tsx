import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../../store';
import { toggleDiscountModal } from '../../../store/modals';
import { selectDiscounts } from '../../../store/discounts';
import { Modal, DiscountItem, ModalTitle } from '../../molecules';
import { API } from '../../../config';

export function DiscountModal() {
  const dispatch = useDispatch();

  const discounts = useDiscounts();
  const selectedDiscounts = useSelector((state: RootState) => state.discounts);
  const [localSelectedDiscounts, setLocalSelectedDiscounts] = useState(
    useSelector((state: RootState) => state.discounts),
  );

  const visible = useSelector((state: RootState) => state.modals.discount);

  const toggleDiscount = useCallback(
    (discount: Discount) => {
      const isSelected = localSelectedDiscounts.findIndex(({ id }) => id === discount.id) !== -1;
      if (isSelected) {
        setLocalSelectedDiscounts((s) => s.filter(({ id }) => id !== discount.id));
      } else {
        setLocalSelectedDiscounts((s) => s.concat(discount));
      }
    },
    [localSelectedDiscounts],
  );

  const saveSelected = () => {
    dispatch(selectDiscounts(localSelectedDiscounts));
    dispatch(toggleDiscountModal());
  };

  const onClose = () => {
    setLocalSelectedDiscounts(selectedDiscounts);
    dispatch(toggleDiscountModal());
  };

  return (
    <Modal
      header={<ModalTitle title="할인" />}
      visible={visible}
      onClose={onClose}
      onConfirm={saveSelected}
    >
      <Content>
        <ul>
          {discounts.map((discount) => (
            <DiscountItem
              key={discount.id}
              discount={discount}
              selected={localSelectedDiscounts.findIndex(({ id }) => id === discount.id) !== -1}
              toggle={toggleDiscount}
            />
          ))}
        </ul>
      </Content>
    </Modal>
  );
}

function useDiscounts(): Discount[] {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  useEffect(() => {
    async function getDiscounts() {
      const data = await fetch(API.CART);
      const dataJson = await data.json();
      const discountsObj = dataJson.discounts;
      const totalDiscounts: Discount[] = Object.keys(discountsObj).reduce(
        (discount, id) => discount.concat({ ...discountsObj[id], id }),
        [],
      );
      setDiscounts(totalDiscounts);
    }
    getDiscounts();
  }, []);
  return discounts;
}

const Content = styled.div`
  padding: 0 15px 30px;
`;
