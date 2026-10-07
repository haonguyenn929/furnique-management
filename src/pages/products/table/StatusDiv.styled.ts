import styled from 'styled-components'
import { IStatusProductProps } from '~/global/interfaces/interface'

export const StatusDiv = styled.div<IStatusProductProps>`
  width: 100px;
  min-width: 100px;
  max-width: 100px;
  height: 26px;
  box-sizing: border-box;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 0 8px;
  font-weight: 500;
  margin: 0;
  ${({ active }) =>
    active &&
    `
    background-color: var(--green-light-color);
    color: var(--green-color)
    `};
  ${({ outOfStock }) =>
    outOfStock &&
    `
    background-color: var(--red-light-color);
    color: var(--red-color)
    `};
`
