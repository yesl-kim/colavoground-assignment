import React from 'react';
import styled, { css } from 'styled-components';

type Color = 'blue' | 'lighterGray' | string;

interface ButtonProps {
  children: string;
  color: Color;
  size: 'large' | 'medium';
}

// const buttonColor = (color: Color) => css`
//   color: ;
// `;

export const Button = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 0;
  border-radius: 12px;
  background-color: #eee;

  /* ${({ color, size, theme }) => css`
    color: ;
  `} */
`;
