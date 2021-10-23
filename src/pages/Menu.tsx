import React from 'react';
import styled from 'styled-components';

import { Span } from '../components/atoms';
import { CartTemplate } from '../components/templates';

export function Menu() {
  const header = (
    <Span color="black" size={15}>
      시술 메뉴
    </Span>
  );

  const main = <div>main</div>;

  const footer = (
    <>
      <Paragraph>서비스를 선택하세요(여러 개 선택가능)</Paragraph>
      <NextButton>다음</NextButton>
    </>
  );
  return <CartTemplate header={header} main={main} footer={footer} />;
}

const TitleWrapper = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Paragraph = styled.p`
  color: '#bbb';
  font-size: 13px;
  line-height: 1.5;
  margin: 10px 0;
`;

const NextButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 0;
  width: 100%;
  background-color: royalblue;
  text-align: center;
  font-size: 15px;
  color: white;
`;
