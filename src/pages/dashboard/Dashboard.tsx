import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded'
import SellRoundedIcon from '@mui/icons-material/SellRounded'
import ShoppingBasketRoundedIcon from '@mui/icons-material/ShoppingBasketRounded'
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded'
import { Typography } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import type { Dayjs } from 'dayjs'
import { useEffect, useState } from 'react'
import Loading from '~/components/loading/Loading'
import { PeriodType } from '~/global/enum'
import { AnalyticsRespose } from '~/global/interfaces/dashboardInterface'
import { notifyError } from '~/global/toastify'
import useDashboardApi from '~/hooks/api/useDashboardApi'
import { formatCurrency, formatNumber } from '~/utils/format'
import { AnalyticsWrapper, ChartWrapper, DailyCardWrapper, DailyWrapper, TitleWrapper } from './Dashboard.styled'
import RevenueChart from './components/Chart'
import ContentCard from './components/ContentCard'
import { IconWrapper } from './components/ContentCard.styled'

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [orderData, setOrderData] = useState<AnalyticsRespose>()
  const [dailyOrderData, setDailyOrderData] = useState<AnalyticsRespose>()
  const [customerData, setCustomerData] = useState<AnalyticsRespose>()
  const [saleData, setSaleData] = useState<AnalyticsRespose>()
  const [dailySaleData, setDailySaleData] = useState<AnalyticsRespose>()
  const [productData, setProductData] = useState<AnalyticsRespose>()
  const [selectedYear, setSelectedYear] = useState<number>(2024)

  const [revenueData, setRevenueData] = useState([{ name: 'Tổng doanh thu', color: 'var(--primary-color)', value: [] }])

  const { getOrderNumber, getSaleNumber, getCustomerNumber, getProductNumber, getSaleStatistic } = useDashboardApi()

  useEffect(() => {
    getOrderData()
    getCustomerData()
    getSaleData()
    getProductData()
    getDailyOrderData()
    getDailySaleData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    getRevenueData(selectedYear)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYear])

  const getOrderData = async () => {
    setIsLoading(true)
    try {
      const orderNumber = await getOrderNumber(PeriodType.MONTH)
      setOrderData(orderNumber)
    } catch (error) {
      notifyError('Có lỗi xảy ra')
    } finally {
      setIsLoading(false)
    }
  }

  const getDailyOrderData = async () => {
    setIsLoading(true)
    try {
      const orderNumber = await getOrderNumber(PeriodType.DAY)
      setDailyOrderData(orderNumber)
    } catch (error) {
      notifyError('Có lỗi xảy ra')
    } finally {
      setIsLoading(false)
    }
  }

  const getCustomerData = async () => {
    setIsLoading(true)
    try {
      const customerData = await getCustomerNumber(PeriodType.MONTH)
      setCustomerData(customerData)
    } catch (error) {
      notifyError('Có lỗi xảy ra')
    } finally {
      setIsLoading(false)
    }
  }

  const getSaleData = async () => {
    setIsLoading(true)
    try {
      const saleData = await getSaleNumber(PeriodType.MONTH)
      setSaleData(saleData)
    } catch (error) {
      notifyError('Có lỗi xảy ra')
    } finally {
      setIsLoading(false)
    }
  }

  const getDailySaleData = async () => {
    setIsLoading(true)
    try {
      const saleNumber = await getSaleNumber(PeriodType.DAY)
      setDailySaleData(saleNumber)
    } catch (error) {
      notifyError('Có lỗi xảy ra')
    } finally {
      setIsLoading(false)
    }
  }

  const getProductData = async () => {
    setIsLoading(true)
    try {
      const productData = await getProductNumber(PeriodType.MONTH)
      setProductData(productData)
    } catch (error) {
      notifyError('Có lỗi xảy ra')
    } finally {
      setIsLoading(false)
    }
  }

  const getRevenueData = async (year: number) => {
    const response = await getSaleStatistic(year)
    setRevenueData([{ name: 'Doanh thu', color: 'var(--primary-color)', value: response.statistic }])
  }

  const handleYearChange = (value: Dayjs | null) => {
    if (value) {
      setSelectedYear(value.year())
    }
  }

  const shouldDisableYear = (date: Dayjs) => {
    return date.year() < 2024
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <AnalyticsWrapper>
            <ContentCard
              icon={<ShoppingBasketRoundedIcon sx={{ color: 'var(--primary-color)', fontSize: '30px' }} />}
              title='Tổng đơn hàng'
              percentage={orderData?.percent ?? 0}
              numberReport={formatNumber(orderData?.total ?? 0)}
              status={(orderData && orderData?.percent > 0) ?? false}
            />
            <ContentCard
              icon={<ShoppingCartRoundedIcon sx={{ color: 'var(--primary-color)', fontSize: '30px' }} />}
              title='Tổng doanh thu'
              percentage={saleData?.percent ?? 0}
              numberReport={formatCurrency(saleData?.total ?? 0)}
              status={(saleData && saleData?.percent > 0) ?? false}
            />
            <ContentCard
              icon={<SellRoundedIcon sx={{ color: 'var(--primary-color)', fontSize: '30px' }} />}
              title='Tổng sản phẩm'
              percentage={productData?.percent ?? 0}
              numberReport={formatNumber(productData?.total ?? 0)}
              status={(productData && productData?.percent > 0) ?? false}
            />
            <ContentCard
              icon={<PeopleAltRoundedIcon sx={{ color: 'var(--primary-color)', fontSize: '30px' }} />}
              title='Tổng khách hàng'
              percentage={customerData?.percent ?? 0}
              numberReport={formatNumber(customerData?.total ?? 0)}
              status={(customerData && customerData?.percent > 0) ?? false}
            />
          </AnalyticsWrapper>
          <AnalyticsWrapper>
            <ChartWrapper>
              <TitleWrapper>
                <Typography variant='h5'>Doanh thu</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    views={['year']}
                    yearsPerRow={3}
                    shouldDisableYear={shouldDisableYear}
                    onChange={handleYearChange}
                  />
                </LocalizationProvider>
              </TitleWrapper>
              <RevenueChart items={revenueData} />
            </ChartWrapper>
            <DailyWrapper>
              <Typography variant='h5'>Hôm nay</Typography>
              <DailyCardWrapper>
                <IconWrapper>
                  <ShoppingBasketRoundedIcon sx={{ color: 'var(--primary-color)', fontSize: '30px' }} />
                </IconWrapper>
                <div style={{ display: 'flex', flexDirection: 'column', width: 'calc(100% - 80px)' }}>
                  <Typography variant='h6' sx={{ fontWeight: 500 }}>
                    Tổng đơn hàng
                  </Typography>
                  {dailyOrderData?.total}
                </div>
              </DailyCardWrapper>
              <DailyCardWrapper className='last-daily-card'>
                <IconWrapper>
                  <ShoppingCartRoundedIcon sx={{ color: 'var(--primary-color)', fontSize: '30px' }} />
                </IconWrapper>
                <div style={{ display: 'flex', flexDirection: 'column', width: 'calc(100% - 80px)' }}>
                  <Typography variant='h6' sx={{ fontWeight: 500 }}>
                    Tổng doanh thu
                  </Typography>
                  {formatCurrency(dailySaleData?.total ?? 0)}
                </div>
              </DailyCardWrapper>
            </DailyWrapper>
          </AnalyticsWrapper>
        </>
      )}
    </>
  )
}

export default Dashboard
