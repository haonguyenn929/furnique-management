import { yupResolver } from '@hookform/resolvers/yup'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import BlockIcon from '@mui/icons-material/Block'
import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { v4 } from 'uuid'
import CancelButton from '~/components/button/CancelButton'
import PrimaryButton from '~/components/button/PrimaryButton'
import SecondaryButton from '~/components/button/SecondaryButton'
import InputRadioForm from '~/components/form/InputRadioForm'
import InputTextForm from '~/components/form/InputTextForm'
import Loading from '~/components/loading/Loading'
import { EMPTY } from '~/global/constants/constants'
import { ScreenPath, StaffRoles, StaffStatus } from '~/global/enum'
import { IStaffRows, IStaffsRequest } from '~/global/interfaces/staffsInterface'
import { notifyError, notifyInfo, notifySuccess } from '~/global/toastify'
import useCloudinaryApi from '~/hooks/api/useCloudinaryApi'
import useStaffsApi from '~/hooks/api/useStaffsApi'
import { Wrapper } from '~/pages/auth/Login.styled'
import { ButtonWrapper, InformationContainer, TitleText } from '~/pages/categories/addCategory/AddCategory.styled'
import { UpdateImage } from '~/pages/categories/updateCategory/UpdateCategory.styled'
import { DetailThumbnailContainer } from '~/pages/categories/viewCategory/ViewCategoryDetail.styled'
import { cloudinaryURLConvert } from '~/utils/common.utils'
import { InputWrapper } from '../addStaff/AddStaff.styled'
import { roleValues } from '../constants'
import { addStaffValidationSchema } from '../validation/AddStaffValidationSchema'
import DeactiveStaffModal from '../components/DeactiveStaffModal'
import { FileUpload } from 'react-material-file-upload'

const UpdateStaff = () => {
  const navigate = useNavigate()
  const params = useParams()
  const { uploadCloudinary } = useCloudinaryApi()
  const [files, setFiles] = useState<File[]>([])
  const [staffData, setStaffData] = useState<IStaffRows>()
  const [isLoading, setIsLoading] = useState(false)
  const { getStaffById, updateStaff } = useStaffsApi()
  const [selectedValue, setSelectedValue] = useState(StaffRoles.STAFF)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const staffId = params.staffId
  const defaultValues = {
    firstName: EMPTY,
    lastName: EMPTY,
    staffCode: EMPTY,
    phone: EMPTY,
    avatar: EMPTY,
    email: EMPTY,
    role: EMPTY
  }
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<IStaffsRequest>({
    defaultValues: defaultValues,
    resolver: yupResolver(addStaffValidationSchema)
  })

  useEffect(() => {
    if (staffId) {
      getStaffDetail(staffId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getStaffDetail = async (staffId: string) => {
    setIsLoading(true)
    try {
      const staffData = (await getStaffById(staffId)) as IStaffRows
      setStaffData(staffData)
      reset({
        firstName: staffData.firstName,
        lastName: staffData.lastName,
        staffCode: staffData.staffCode,
        phone: staffData.phone,
        avatar: staffData.avatar,
        email: staffData.email,
        role: staffData.role
      })
    } catch (error) {
      notifyError('An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const uploadImage = async (publicId: string) => {
    try {
      await uploadCloudinary(files, [publicId])
    } catch (error) {
      notifyError('An error occurred')
    }
  }

  const hasChanges = (): boolean => {
    const formValues = control._formValues
    const { firstName, lastName, phone } = formValues
    const hasNewAvatar = files.length > 0

    return (
      firstName !== staffData?.firstName ||
      lastName !== staffData?.lastName ||
      phone !== staffData?.phone ||
      hasNewAvatar
    )
  }

  const handleUpdateStaffButton = async () => {
    const publicId = v4()
    if (staffId) {
      if (!hasChanges()) {
        notifyInfo('No changes made')
        return
      }

      const response = await updateStaff(
        staffId,
        {
          firstName: control._formValues.firstName,
          lastName: control._formValues.lastName,
          staffCode: control._formValues.staffCode,
          phone: control._formValues.phone,
          email: control._formValues.email,
          role: selectedValue,
          avatar: files.length > 0 ? cloudinaryURLConvert(publicId) : staffData?.avatar ?? EMPTY
        },
        files.length > 0
      )
      if (response && files.length > 0) {
        await uploadImage(publicId)
        notifySuccess('Updated successfully')
        navigate(ScreenPath.STAFFS)
      } else if (response) {
        notifySuccess('Updated successfully')
        navigate(ScreenPath.STAFFS)
      }
    }
  }

  const handleCancelButton = () => {
    navigate(ScreenPath.STAFFS)
  }

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value as StaffRoles)
  }

  const handleDisableButton = () => {
    setIsModalOpen(true)
  }

  const handleClose = () => {
    setIsModalOpen(false)
  }

  return isLoading ? (
    <Loading />
  ) : (
    <form onSubmit={handleSubmit(handleUpdateStaffButton)}>
      <ButtonWrapper>
        <SecondaryButton
          variant='contained'
          name='Cancel'
          color='var(--gray-light-color)'
          icon={<CloseIcon />}
          onClick={handleCancelButton}
          type='button'
        />
        <CancelButton
          name='Deactivate'
          type='button'
          variant='contained'
          icon={<BlockIcon />}
          onClick={handleDisableButton}
          disable={staffData?.status === StaffStatus.INACTIVE}
        />
        <PrimaryButton
          name='Update'
          type='submit'
          variant='contained'
          icon={<EditIcon />}
          disable={staffData?.status === StaffStatus.INACTIVE}
        />
      </ButtonWrapper>
      <Wrapper>
        <DetailThumbnailContainer>
          <TitleText>Avatar</TitleText>
          <UpdateImage src={staffData?.avatar} />
          <FileUpload
            sx={{
              width: '300px',
              height: '20px',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              paddingLeft: '40px',
              '.MuiButtonBase-root': {
                color: 'var(--primary-color)',
                backgroundColor: 'var(--primary-light-color)',
                '&:hover': {
                  color: 'var(--white-color)',
                  backgroundColor: 'var(--primary-color)'
                }
              },
              '.MuiSvgIcon-root, .MuiTypography-root': {
                display: 'none'
              },
              '.MuiButtonBase-root.MuiChip-root': {
                backgroundColor: 'white',
                '&:hover': {
                  color: 'var(--gray-color)'
                }
              },
              '.MuiButtonBase-root.MuiChip-root .MuiChip-icon': {
                color: 'var(--primary-color)'
              }
            }}
            value={files}
            onChange={setFiles}
            maxFiles={1}
            maxSize={1024 * 1024 * 8}
            accept={{
              'image/png': ['.png'],
              'image/jpeg': ['.jpg', '.jpeg']
            }}
            buttonText='Change Image'
          />
        </DetailThumbnailContainer>
        <InformationContainer>
          <TitleText>General Information</TitleText>
          <InputWrapper>
            <InputTextForm
              control={control}
              name='lastName'
              label='Last Name & Middle Name'
              sx={{ width: '22%', marginLeft: ' 20px' }}
              variant='outlined'
              error={errors.lastName?.message}
            />
            <InputTextForm
              control={control}
              name='firstName'
              label='First Name'
              sx={{ width: '22%', marginLeft: '20px' }}
              variant='outlined'
              error={errors.firstName?.message}
            />
            <InputTextForm
              control={control}
              name='staffCode'
              label='Staff Code'
              sx={{ width: '22%', marginLeft: '20px' }}
              variant='outlined'
              error={errors.staffCode?.message}
              disabled
            />
          </InputWrapper>
          <InputWrapper>
            <InputTextForm
              control={control}
              name='email'
              label='Email'
              sx={{ width: '34%', margin: '20px 0 0 20px' }}
              variant='outlined'
              error={errors.email?.message}
              disabled
            />
            <InputTextForm
              control={control}
              name='phone'
              label='Phone Number'
              sx={{ width: '34%', margin: '20px 0 0 20px' }}
              variant='outlined'
              error={errors.phone?.message}
            />
          </InputWrapper>
          <InputRadioForm
            label='Role'
            name='role'
            options={roleValues}
            defaultValue={selectedValue}
            sx={{ margin: '20px  0  0  20px' }}
            onChange={handleRadioChange}
            disabled
          />
        </InformationContainer>
        {staffId && <DeactiveStaffModal open={isModalOpen} handleClose={handleClose} staffId={staffId} />}
      </Wrapper>
    </form>
  )
}

export default UpdateStaff
