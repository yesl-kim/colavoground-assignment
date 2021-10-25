import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { HiPlusCircle } from 'react-icons/hi';

import { toggleMenuModal, toggleDiscountModal } from '../store/modals';
import { modifyItemCount, removeItem } from '../store/items';
import { removeDiscount } from '../store/discounts';
import { RootState } from '../store';
import { CartMenuItem, CartDiscountItem, ModalTitle } from '../components/molecules';
import { MenuModal, DiscountModal } from '../components/organisms';

export function Cart() {
  const selectedItems = useSelector((state: RootState) => state.items);
  const selectedDiscounts = useSelector((state: RootState) => state.discounts);

  const dispatch = useDispatch();
  const onToggleMenuModal = () => dispatch(toggleMenuModal());
  const onToggleDiscountModal = () => dispatch(toggleDiscountModal());

  const onModifyItemCount = (id: string, count: number) => dispatch(modifyItemCount({ id, count }));

  const onRemoveItem = (id: string) => dispatch(removeItem(id));
  const onRemoveDiscount = (id: string) => dispatch(removeDiscount(id));

  return (
    <>
      <Container>
        <Header>
          <ModalTitle title="고객님 이름" subTitle="결제 목록" />
        </Header>

        <Section>
          <ButtonWrapper>
            <GrayButton onClick={onToggleMenuModal}>
              <HiPlusCircle color="#999" size="15" /> <span>시술</span>
            </GrayButton>
            <GrayButton onClick={onToggleDiscountModal}>
              <HiPlusCircle color="#999" size="15" /> <span>할인</span>
            </GrayButton>
          </ButtonWrapper>
          <ul style={{ padding: '5px 0' }}>
            {selectedItems.map((item) => (
              <CartMenuItem key={item.id} item={item} modifyCount={onModifyItemCount} remove={onRemoveItem} />
            ))}
            {selectedDiscounts.map((discount) => (
              <CartDiscountItem key={discount.id} discount={discount} selectedItems={selectedItems} remove={onRemoveDiscount} />
            ))}
          </ul>
        </Section>

        <Footer>
          <ValueWrapper>
            <Detail>합계</Detail>
            <Value>169,000원</Value>
          </ValueWrapper>
          <NextButton>다음</NextButton>
        </Footer>
      </Container>
      <MenuModal />
      <DiscountModal />
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;
const Header = styled.header`
  padding: 10px 20px 20px;
`;

const Section = styled.section`
  flex: 1;
  padding: 0 20px 30px;
  overflow: scroll;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px dashed #eee;
`;

const GrayButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 0;
  width: 49%;
  border-radius: 12px;
  background-color: #eee;

  span {
    margin: 0 2px;
    font-size: 13px;
    line-height: 1.5;
    color: #666;
  }
`;

const Detail = styled.span`
  font-size: 13px;
  color: #999;
`;

const Footer = styled.footer`
  margin-top: auto;
  padding: 15px 20px 30px;
  border-top: 1px solid #eee;
`;

const ValueWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const Value = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: #000;
`;

const NextButton = styled(GrayButton)`
  width: 100%;
  background-color: royalblue;
  font-size: 15px;
  color: white;
  text-align: center;
`;
