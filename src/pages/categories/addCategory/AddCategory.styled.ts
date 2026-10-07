import styled from 'styled-components'

export const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  margin: 0.25rem 1rem;
  gap: 16px;

  @media (max-width: 900px) {
    flex-direction: column;
    margin: 0.25rem 0.5rem;
  }
`

export const ThumbnailContainer = styled.div`
  width: 25%;
  min-height: 20rem;
  height: fit-content;
  padding: 10px;
  background-color: var(--white-color);
  border-radius: 10px;
  box-sizing: border-box;

  @media (max-width: 900px) {
    width: 100%;
    min-height: auto;
  }
`

export const InformationContainer = styled.div`
  width: 70%;
  min-height: 20rem;
  height: fit-content;
  padding: 10px;
  background-color: var(--white-color);
  border-radius: 10px;
  box-sizing: border-box;

  @media (max-width: 900px) {
    width: 100%;
    min-height: auto;
  }
`

export const TitleText = styled.h3`
  font-weight: 600;
  padding-left: 20px;
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0.25rem;
  flex-wrap: wrap;
  gap: 8px;
`
