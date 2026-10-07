import styled from 'styled-components'

interface ContentCardProps {
  status: boolean
}

export const CardWrapper = styled.div`
  flex: 1 1 calc(25% - 16px);
  min-width: 220px;
  height: 180px;
  background-color: var(--white-color);
  border-radius: 10px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;

  @media (max-width: 600px) {
    flex: 1 1 100%;
    min-width: 100%;
  }
`

export const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--primary-light-color);
  display: flex;
  justify-content: center;
  align-items: center;
`
export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
export const PercentWrapper = styled(TitleWrapper)<ContentCardProps>`
  justify-content: center;
  align-items: center;
  color: ${(props) => (props.status ? 'var(--green-color)' : 'var(--red-color)')};
`
