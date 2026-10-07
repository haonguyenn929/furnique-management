import styled from 'styled-components'

export const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 50% 50%;
  @media (max-width: 1024px) {
    display: block;
  }
`

export const TitleText = styled.h3`
  font-weight: 600;
`

export const InformationContainer = styled.div`
  min-height: 200px;
  padding: 10px;
  background-color: var(--white-color);
  border-radius: 10px;
  margin: 10px;
`

export const TextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
  gap: 16px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`

export const TextLeft = styled.div`
  width: 38%;

  @media (max-width: 600px) {
    width: 100%;
  }
`

export const TextRight = styled.div`
  width: 38%;

  @media (max-width: 600px) {
    width: 100%;
  }
`
