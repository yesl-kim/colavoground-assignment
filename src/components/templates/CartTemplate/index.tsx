import React from 'react';
import styled from 'styled-components';

interface CartTemplateProps {
  header: React.ReactNode;
  children: React.ReactNode;
}

export function CartTemplate({ header, children }: CartTemplateProps) {
  return (
    <Container>
      <Header>{header}</Header>
      <Section>{children}</Section>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #fff;
`;

const Header = styled.header`
  padding: 10px 20px 20px;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`;
