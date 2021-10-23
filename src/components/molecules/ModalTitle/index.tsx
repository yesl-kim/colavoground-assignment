import React from 'react';
import styled from 'styled-components';

import { Span } from '../../atoms';

interface ModalTitle {
  title: string;
  subTitle?: string;
}

export function ModalTitle({ title, subTitle }: ModalTitle) {
  return (
    <Container>
      {subTitle ? (
        <>
          <Span color="black" size={14}>
            {title}
          </Span>
          <Span color="lightGray" size={13}>
            {subTitle}
          </Span>
        </>
      ) : (
        <Span color="black" size={16}>
          {title}
        </Span>
      )}
    </Container>
  );
}

const Container = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

ModalTitle.defaultProps = {
  subTitle: '',
};
