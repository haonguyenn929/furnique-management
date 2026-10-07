import styled from 'styled-components'
import { ContentWrapper } from '~/pages/categories/viewCategory/ViewCategoryDetail.styled'

export const TextWrapper = styled(ContentWrapper)`
  display: flex;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const TextLeft = styled.div`
  width: 38%;

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const TextRight = styled.div`
  width: 38%;

  @media (max-width: 768px) {
    width: 100%;
  }
`
