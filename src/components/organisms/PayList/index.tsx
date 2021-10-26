import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { HiPlusCircle } from 'react-icons/hi';

import { toggleMenuModal, toggleDiscountModal } from '../../../store/modals';
import { modifyItemCount, removeItem } from '../../../store/items';
import { removeDiscount } from '../../../store/discounts';
import { RootState } from '../../../store';

import { Span } from '../../atoms';
import { CartMenuItem, CartDiscountItem } from '../../molecules';

export function PayList() {
  const dispatch = useDispatch();
  const selectedItems = useSelector((state: RootState) => state.items);
  const selectedDiscounts = useSelector((state: RootState) => state.discounts);

  const onToggleMenuModal = () => dispatch(toggleMenuModal());
  const onToggleDiscountModal = () => dispatch(toggleDiscountModal());
  const onModifyItemCount = (id: string, count: number) => dispatch(modifyItemCount({ id, count }));
  const onRemoveItem = (id: string) => dispatch(removeItem(id));
  const onRemoveDiscount = (id: string) => dispatch(removeDiscount(id));

  const [totalPrice, setTotalPrice] = useState(0);
  const applyDiscount = (discountedValue: number) => setTotalPrice(total => total + discountedValue);
  useEffect(() => {
    setTotalPrice(selectedItems.reduce((total, { price, count }) => total + (price * count), 0))
  }, [selectedItems])

  return (
    <>
      <Section>
        <ButtonWrapper>
          <Button label="시술" onClick={onToggleMenuModal} />
          <Button label="할인" onClick={onToggleDiscountModal} />
        </ButtonWrapper>
        <List>
          {selectedItems.map((item) => (
            <CartMenuItem
              key={item.id}
              item={item}
              modifyCount={onModifyItemCount}
              remove={onRemoveItem}
            />
          ))}
          {selectedDiscounts.map((discount) => (
            <CartDiscountItem
              key={discount.id}
              discount={discount}
              selectedItems={selectedItems}
              remove={onRemoveDiscount}
              applyDiscount={applyDiscount}
            />
          ))}
        </List>
      </Section>

      <Footer>
        <ValueWrapper>
          <Span color="lightGray" size={13}>
            합계
          </Span>
          <Span color="black" size={24} bold>
            {`${totalPrice.toLocaleString()}원`}
          </Span>
        </ValueWrapper>
        <NextButton>다음</NextButton>
      </Footer>
    </>
  );
}

interface ButtonProps {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function Button({ label, onClick }: ButtonProps) {
  return (
    <GrayButton onClick={onClick}>
      <HiPlusCircle color="#999" size="15" />
      <Span color="gray" size={13}>
        {label}
      </Span>
    </GrayButton>
  );
}

const Section = styled.div`
  flex: 1;
  padding: 0 20px 30px;
  overflow: scroll;
`;

const Footer = styled.div`
  padding: 15px 20px 30px;
  border-top: 1px solid #eee;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px dashed #eee;
`;

const List = styled.ul`
  padding: 5px 0;
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
  }
`;

const ValueWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const NextButton = styled(GrayButton)`
  width: 100%;
  background-color: royalblue;
  font-size: 15px;
  color: white;
  text-align: center;
`;
