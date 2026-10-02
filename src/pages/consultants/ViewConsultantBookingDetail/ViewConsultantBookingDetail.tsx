import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SecondaryButton from '~/components/button/SecondaryButton'
import Loading from '~/components/loading/Loading'
import { ScreenPath } from '~/global/enum'
import { notifyError } from '~/global/toastify'
import { ButtonWrapper } from '~/pages/categories/addCategory/AddCategory.styled'
import {
  InformationContainer,
  TextLeft,
  TextRight,
  TextWrapper,
  TitleText,
  Wrapper
} from './ViewConsultantBookingDetail.styled'
import dayjs from 'dayjs'
import useConsultBookingsApi from '~/hooks/api/useConsultantBookingsApi'
import { IConsultantBookingsProps } from '~/global/interfaces/consultantBookingsInterface'
import { TextHeader } from '~/pages/orders/viewOrder/ViewOrderDetail.styled'
import { EMPTY } from '~/global/constants/constants'
import Chip from '~/components/chip/Chip'

const ViewConsultantBookingDetail = () => {
  const navigate = useNavigate()
  const params = useParams()
  const { getConsultantBookingById } = useConsultBookingsApi()
  const [consultantBookingData, setConsultantBookingData] = useState<IConsultantBookingsProps>()
  const [isLoading, setIsLoading] = useState(false)
  const consultantBookingId = params.consultantBookingId

  useEffect(() => {
    if (consultantBookingId) {
      getConsultantBookingDetail(consultantBookingId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getConsultantBookingDetail = async (consultantBookingId: string) => {
    setIsLoading(true)
    try {
      const data = await getConsultantBookingById(consultantBookingId)
      setConsultantBookingData(data)
    } catch (error) {
      notifyError('An error occurred')
    } finally {
      setIsLoading(false)
    }
  }
  const handleBackButton = () => {
    navigate(ScreenPath.CONSULTANT_BOOKING)
  }

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <ButtonWrapper>
        <SecondaryButton
          variant='contained'
          name='Back'
          color='var(--gray-light-color)'
          icon={<ArrowBackIcon />}
          onClick={handleBackButton}
          type='button'
        />
      </ButtonWrapper>
      <Wrapper>
        <InformationContainer>
          <TitleText>Design Consultation Booking Information</TitleText>
          <TextWrapper>
            <TextHeader>
              <strong>Booking Date:</strong>
            </TextHeader>
            {dayjs(consultantBookingData?.bookingDate).format('hh:mm DD/MM/YYYY')}
          </TextWrapper>
          <TextWrapper>
            <TextHeader>
              <strong>Status:</strong>
            </TextHeader>
            <Chip status={consultantBookingData?.bookingStatus || EMPTY} />
          </TextWrapper>
          <TextWrapper>
            <TextHeader>
              <strong>Interested Categories:</strong>
            </TextHeader>
            <TextRight>{consultantBookingData?.interestedCategories?.map((cate) => cate.name).join(', ')}</TextRight>
          </TextWrapper>
        </InformationContainer>
        <InformationContainer>
          <TitleText>Consultant Staff</TitleText>
          <TextWrapper>
            <TextHeader>
              <strong>Full Name:</strong>
            </TextHeader>
            {`${consultantBookingData?.consultant.lastName} ${consultantBookingData?.consultant.firstName}`}
          </TextWrapper>
          <TextWrapper>
            <TextHeader>
              <strong>Staff Code:</strong>
            </TextHeader>
            {consultantBookingData?.consultant.staffCode}
          </TextWrapper>
          <TextWrapper>
            <TextHeader>
              <strong>Email:</strong>
            </TextHeader>
            {consultantBookingData?.consultant.email}
          </TextWrapper>
        </InformationContainer>
        <InformationContainer>
          <TitleText>Customer</TitleText>
          <TextWrapper>
            <TextHeader>
              <strong>Full Name:</strong>
            </TextHeader>
            {`${consultantBookingData?.customer.lastName} ${consultantBookingData?.customer.firstName}`}
          </TextWrapper>
          <TextWrapper>
            <TextHeader>
              <strong>Email:</strong>
            </TextHeader>
            {consultantBookingData?.customer.email}
          </TextWrapper>
          <TextWrapper>
            <TextHeader>
              <strong>Phone:</strong>
            </TextHeader>
            {consultantBookingData?.customer.phone}
          </TextWrapper>
        </InformationContainer>
        <InformationContainer>
          <TitleText>Notes</TitleText>
          <TextWrapper>
            <TextLeft>{consultantBookingData?.notes}</TextLeft>
          </TextWrapper>
        </InformationContainer>
      </Wrapper>
    </>
  )
}

export default ViewConsultantBookingDetail
