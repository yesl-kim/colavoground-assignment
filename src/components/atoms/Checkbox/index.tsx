import React from 'react';
import styled from 'styled-components';
import { BsCheckSquareFill, BsSquare } from 'react-icons/bs';

interface CheckboxProps {
  checked: boolean;
}

export function Checkbox({ checked }: CheckboxProps) {
  return (
    <>
      <Input type="checkbox" checked={checked} />
      {checked ? <BsCheckSquareFill color="royalblue" size={15} /> : <BsSquare color="#bbb" size={15} />}
    </>
  );
}

const Input = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: polygon(0 0, 0 0, 0 0);
`;
