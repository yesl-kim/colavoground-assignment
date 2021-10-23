import React, { useState } from 'react';
import styled from 'styled-components';
import { BsCheckSquareFill, BsSquare } from 'react-icons/bs';
import { IoIosArrowDown } from 'react-icons/io';

import { Span, Checkbox } from '../../atoms';

export function MenuItem() {
  const [checked, setChecked] = useState(false);
  const onClick = () => {
    setChecked(!checked);
  };

  return (
    <Container>
      <CheckboxWrapper onClick={onClick}>
        <Checkbox checked={checked} />
        <Label>
          <Span color="black" size={15}>
            남성컷
          </Span>
          <Price>15,000원, 1시간</Price>
        </Label>
      </CheckboxWrapper>
      {checked && (
        <TooltipButton>
          <span>1</span>
          <IoIosArrowDown />
        </TooltipButton>
      )}
    </Container>
  );
}

const Container = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
`;

const CheckboxWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  padding: 0 10px;
`;

const Price = styled.span`
  position: relative;
  display: inline-block;
  padding-left: 10px;
  font-size: 14px;
  line-height: 1.5;
  color: #999;

  &::before {
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -3px;
    width: 5px;
    height: 5px;
    border-radius: 4px;
    background-color: #69dadb;
    content: '';
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-left: auto;
`;

const TooltipButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  border-radius: 15px;
  background-color: #f5f5f5;
  text-align: center;
  color: #999;

  span {
    margin: 0 3px;
    line-height: 1.5;
  }
`;
