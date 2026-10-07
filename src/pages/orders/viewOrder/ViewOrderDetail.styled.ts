import styled from 'styled-components'

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 1rem;
  justify-content: space-between;

  @media (max-width: 600px) {
    margin: 0.25rem 0.5rem;
  }
`
export const OrderInformation = styled.div`
  display: flex;
  min-height: 15rem;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 900px) {
    flex-direction: column;
    min-height: auto;
  }
`
export const OrderContent = styled.div`
  width: 36%;
  background-color: var(--white-color);
  border-radius: 10px;
  box-sizing: border-box;

  @media (max-width: 900px) {
    width: 100%;
  }
`

export const CustomerInformation = styled.div`
  width: 30%;
  background-color: var(--white-color);
  border-radius: 10px;
  box-sizing: border-box;

  @media (max-width: 900px) {
    width: 100%;
  }
`

export const ShippingInformation = styled.div`
  width: 30%;
  background-color: var(--white-color);
  border-radius: 10px;
  box-sizing: border-box;

  @media (max-width: 900px) {
    width: 100%;
  }
`

export const OrderList = styled.div`
  display: flex;
  margin-top: 1rem;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`

export const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 20px;
  padding-bottom: 12px;

  & > :last-child {
    margin-left: auto;
  }
`

export const TextHeader = styled.div`
  display: flex;
  align-items: center;
`

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--primary-light-color);
  margin-right: 10px;
`
export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
`

export const ListContent = styled.div`
  width: 68%;
  background-color: var(--white-color);
  border-radius: 10px;
  box-sizing: border-box;

  @media (max-width: 900px) {
    width: 100%;
  }
`
export const NoteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  box-sizing: border-box;

  @media (max-width: 900px) {
    width: 100%;
  }
`
export const NoteInformation = styled.div`
  background-color: var(--white-color);
  border-radius: 10px;
  height: 10rem;
  margin-bottom: 10px;
`
export const TotalWrapper = styled.div`
  padding: 20px 0;
  width: 300px;
  max-width: 100%;
`
