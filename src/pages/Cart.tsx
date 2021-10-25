import React from 'react';

import { ModalTitle } from '../components/molecules';
import { MenuModal, DiscountModal, PayList } from '../components/organisms';
import { CartTemplate } from '../components/templates';

export function Cart() {
  return (
    <>
      <CartTemplate header={<ModalTitle title="고객님 이름" subTitle="결제 목록" />}>
        <PayList />
      </CartTemplate>
      <MenuModal />
      <DiscountModal />
    </>
  );
}
