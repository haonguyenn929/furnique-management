import styled from 'styled-components'
import { TextWrapper } from '../orders/viewOrder/ViewOrderDetail.styled'

export const AnalyticsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`

export const ChartWrapper = styled.div`
  flex: 2;
  min-width: 300px;
  border-radius: 10px;
  background-color: var(--white-color);
  padding: 24px;
  min-height: 400px;
  box-sizing: border-box;

  @media (max-width: 900px) {
    width: 100%;
    flex: 1 1 100%;
    min-height: 320px;
  }
`

export const DailyWrapper = styled.div`
  flex: 1;
  min-width: 280px;
  border-radius: 10px;
  padding: 24px;
  background-color: var(--white-color);
  box-sizing: border-box;

  @media (max-width: 900px) {
    width: 100%;
    flex: 1 1 100%;
  }
`

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
`

export const DailyCardWrapper = styled(TextWrapper)`
  margin: 30px 0 0 0;
  border-bottom: 2px solid var(--gray-light-color);
  padding-bottom: 30px;
  &.last-daily-card {
    border-bottom: none;
  }
`
