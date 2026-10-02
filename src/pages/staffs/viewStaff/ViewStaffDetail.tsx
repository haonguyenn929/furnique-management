import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import EditIcon from '@mui/icons-material/Edit'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PrimaryButton from '~/components/button/PrimaryButton'
import SecondaryButton from '~/components/button/SecondaryButton'
import Loading from '~/components/loading/Loading'
import { ScreenPath } from '~/global/enum'
import { IStaffRows } from '~/global/interfaces/staffsInterface'
import { notifyError } from '~/global/toastify'
import useStaffsApi from '~/hooks/api/useStaffsApi'
import { Wrapper } from '~/pages/auth/Login.styled'
import { ButtonWrapper, InformationContainer, TitleText } from '~/pages/categories/addCategory/AddCategory.styled'
import { DetailThumbnailContainer, Image, Text } from '~/pages/categories/viewCategory/ViewCategoryDetail.styled'
import { TextLeft, TextRight, TextWrapper } from './ViewStaffDetail.styled'
import dayjs from 'dayjs'

const ViewStaffDetail = () => {
  const navigate = useNavigate()
  const params = useParams()
  const { getStaffById } = useStaffsApi()
  const [staffData, setStaffData] = useState<IStaffRows>()
  const [isLoading, setIsLoading] = useState(false)
  const staffId = params.staffId

  useEffect(() => {
    if (staffId) {
      getStaffDetail(staffId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getStaffDetail = async (staffId: string) => {
    setIsLoading(true)
    try {
      const staffData = await getStaffById(staffId)
      setStaffData(staffData)
    } catch (error) {
      notifyError('An error occurred')
    } finally {
      setIsLoading(false)
    }
  }
  const handleBackButton = () => {
    navigate(ScreenPath.STAFFS)
  }
  const handleEditButton = (staffId: string) => {
    navigate(ScreenPath.UPDATE_STAFF.replace(':staffId', staffId))
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
        <PrimaryButton
          name='Edit'
          type='button'
          variant='contained'
          icon={<EditIcon />}
          onClick={() => staffId && handleEditButton(staffId)}
        />
      </ButtonWrapper>
      <Wrapper>
        <DetailThumbnailContainer>
          <TitleText>Avatar</TitleText>
          <Image src={staffData?.avatar} alt={staffData?.firstName} />
        </DetailThumbnailContainer>
        <InformationContainer>
          <TitleText>General Information</TitleText>
          <TextWrapper>
            <TextLeft>
              <Text>
                <strong>Full Name: </strong>
                {`${staffData?.lastName} ${staffData?.firstName}`}
              </Text>
              <Text>
                <strong>Email: </strong>
                {staffData?.email}
              </Text>
              <Text>
                <strong>Role: </strong>
                {staffData?.role}
              </Text>
              <Text>
                <strong>Created Date: </strong>
                {dayjs(staffData?.createdAt).format('hh:mm DD/MM/YYYY')}
              </Text>
            </TextLeft>
            <TextRight>
              <Text>
                <strong>Staff Code: </strong>
                {staffData?.staffCode}
              </Text>
              <Text>
                <strong>Phone Number: </strong>
                {staffData?.phone}
              </Text>
              <Text>
                <strong>Status: </strong>
                {staffData?.status}
              </Text>
              <Text>
                <strong>Updated Date: </strong>
                {dayjs(staffData?.updatedAt).format('hh:mm DD/MM/YYYY')}
              </Text>
            </TextRight>
          </TextWrapper>
        </InformationContainer>
      </Wrapper>
    </>
  )
}

export default ViewStaffDetail
