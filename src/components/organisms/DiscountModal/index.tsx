import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../../store';
import { toggleDiscountModal } from '../../../store/modals';
import { Modal, DiscountItem, ModalTitle } from '../../molecules';
import { API } from '../../../config';

export function DiscountModal() {
  const visible = useSelector((state: RootState) => state.modals.discount);
  const dispatch = useDispatch();
  const onToggleModal = () => dispatch(toggleDiscountModal());

  const [discounts, setDiscounts] = useState<Discounts>([]);
  useEffect(() => {
    async function getItems() {
      const data = await fetch(API.CART);
      const dataJson = await data.json();
      const discountsObj = await dataJson.discounts;
      const discounts = Object.keys(discountsObj).reduce(
        (discount, id) => discount.concat({ ...discountsObj[id], id }),
        [],
      );
      setDiscounts(discounts);
    }

    getItems();
  }, []);

  return (
    <Modal visible={visible} onClose={onToggleModal}>
      <Container>
        <Top>
          <ModalTitle title="할인" />
        </Top>
        <Content>
          <ul>
            {discounts.map((discount) => (
              <DiscountItem key={discount.id} discount={discount} />
            ))}
          </ul>
        </Content>
        <Bottom>
          <Paragraph>서비스를 선택하세요 (여러 개 선택가능)</Paragraph>
          <NextButton>다음</NextButton>
        </Bottom>
      </Container>
    </Modal>
  );
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
