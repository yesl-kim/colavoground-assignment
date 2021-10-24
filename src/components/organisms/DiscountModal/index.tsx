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

  const visible = useSelector((state: RootState) => state.modals.discount);
  const onClose = () => {
    setLocalSelectedDiscounts(selectedDiscounts);
    dispatch(toggleDiscountModal());
  };

  return (
    <Modal visible={visible} onClose={onClose}>
      <Container>
        <Top>
          <ModalTitle title="할인" />
        </Top>
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
        <Bottom>
          <Paragraph>서비스를 선택하세요 (여러 개 선택가능)</Paragraph>
          <NextButton onClick={saveSelected}>다음</NextButton>
        </Bottom>
      </Container>
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
