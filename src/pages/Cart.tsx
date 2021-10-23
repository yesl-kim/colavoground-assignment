import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { IoIosArrowDown } from 'react-icons/io';
import { HiPlusCircle } from 'react-icons/hi';

import { CartMenuItem, CartDiscountItem, Modal } from '../components/molecules';

export function Cart({ history }: RouteComponentProps) {
  const [menuModal, setMenuModal] = useState(false);

  const toMenu = () => history.push('/menu');

  return (
    <>
      <Container>
        <Header>
          <TitleWrapper>
            <span>고객님</span>
            <Detail>결제 목록</Detail>
          </TitleWrapper>
        </Header>

        <Section>
          <ButtonWrapper>
            <GrayButton onClick={() => setMenuModal(true)}>
              <HiPlusCircle color="#999" size="15" /> <span>시술</span>
            </GrayButton>
            <GrayButton>
              <HiPlusCircle color="#999" size="15" /> <span>할인</span>
            </GrayButton>
          </ButtonWrapper>
          <ul style={{ padding: '5px 0' }}>
            <CartMenuItem />
            <CartDiscountItem />
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
      <Modal
        title="시술 메뉴"
        content={<div>menu</div>}
        visible={menuModal}
        bottom={
          <button type="button" onClick={() => setMenuModal(false)}>
            닫기
          </button>
        }
      />
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

const TitleWrapper = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Detail = styled.span`
  font-size: 13px;
  color: #999;
`;

const Footer = styled.footer`
  margin-top: auto;
  padding: 0 20px 30px;
  border-top: 1px solid #eee;
`;

const ValueWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 15px 0;
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
