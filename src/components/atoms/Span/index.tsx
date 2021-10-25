import styled, { css } from 'styled-components';

interface SpanProps {
  color?: 'black' | 'gray' | 'lightGray' | 'point' | string;
  size: number;
  children: string | number;
  bold?: boolean;
}

export const Span = styled.span<SpanProps>`
  line-height: 1.5;

  ${({ theme, color = 'black', size, bold = false }) => css`
    color: ${theme.palette[color] || color};
    font-size: ${size}px;
    font-weight: ${bold && 'bold'};
  `}
`;

// Span.defaultProps = {
//   color: 'black',
// };
