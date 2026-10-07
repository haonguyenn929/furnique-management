import styled from 'styled-components'
import { IStatusOrderProps } from '~/global/interfaces/interface'

export const StatusDiv = styled.div<IStatusOrderProps>`
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
  ${({ canceled }) =>
    canceled &&
    `
    background-color: var(--primary-light-color);
    color: var(--primary-color)
    `};
  ${({ completed }) =>
    completed &&
    `
    background-color: var(--green-light-color);
    color: var(--green-color)
  `}
  ${({ deleted }) =>
    deleted &&
    `
    background-color: var(--red-light-color);
    color: var(--red-color)
  `}
   ${({ delivering }) =>
    delivering &&
    `
    background-color: var(--cyan-light-color);
    color: var(--cyan-color)
  `}
  ${({ pending }) =>
    pending &&
    `
    background-color: var(--purple-light-color);
    color: var(--purple-color)
  `}
  ${({ confirmed }) =>
    confirmed &&
    `
    background-color: var(--blue-light-color);
    color: var(--blue-color)
  `}
  ${({ draft }) =>
    draft &&
    `
    background-color: var(--gray-light-color);
    color: var(--gray-color)
  `}
`
