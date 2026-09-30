import { yupResolver } from '@hookform/resolvers/yup'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { v4 } from 'uuid'
import PrimaryButton from '~/components/button/PrimaryButton'
import SecondaryButton from '~/components/button/SecondaryButton'
import InputRadioForm from '~/components/form/InputRadioForm'
import InputTextForm from '~/components/form/InputTextForm'
import { EMPTY } from '~/global/constants/constants'
import { ScreenPath, StaffRoles } from '~/global/enum'
import { IStaffsRequest } from '~/global/interfaces/staffsInterface'
import { notifyError, notifySuccess } from '~/global/toastify'
import useCloudinaryApi from '~/hooks/api/useCloudinaryApi'
import useStaffsApi from '~/hooks/api/useStaffsApi'
import { Wrapper } from '~/pages/auth/Login.styled'
import {
  ButtonWrapper,
  InformationContainer,
  ThumbnailContainer,
  TitleText
} from '~/pages/categories/addCategory/AddCategory.styled'
import { cloudinaryURLConvert } from '~/utils/common.utils'
import { roleValues } from '../constants'
import { addStaffValidationSchema } from '../validation/AddStaffValidationSchema'
import { InputWrapper } from './AddStaff.styled'
import { FileUpload } from 'react-material-file-upload'

const AddStaff = () => {
  const navigate = useNavigate()
  const [files, setFiles] = useState<File[]>([])
  const { createStaff } = useStaffsApi()
  const { uploadCloudinary } = useCloudinaryApi()
  const [selectedValue, setSelectedValue] = useState(StaffRoles.STAFF)

  const defaultValues: IStaffsRequest = {
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

  const uploadImage = async (publicId: string) => {
    try {
      await uploadCloudinary(files, [publicId])
    } catch (error) {
      notifyError('Có lỗi xảy ra')
    }
  }

  const handleAddStaffButton = async (data: IStaffsRequest) => {
    if (files.length <= 0) {
      notifyError('Cần ít nhất một ảnh')
      return
    } else {
      const publicId = v4()
      const formData: IStaffsRequest = {
        ...data,
        avatar: cloudinaryURLConvert(publicId),
        role: selectedValue
      }

      const response = await createStaff(formData)
      if (response) {
        await uploadImage(publicId)
        notifySuccess('Thêm nhân viên mới thành công')
        reset()
        setFiles([])
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

  return (
    <form onSubmit={handleSubmit(handleAddStaffButton)}>
      <ButtonWrapper>
        <SecondaryButton
          variant='contained'
          name='Hủy'
          color='var(--gray-light-color)'
          icon={<CloseIcon />}
          onClick={handleCancelButton}
          type='button'
        />
        <PrimaryButton name='Thêm nhân viên' type='submit' variant='contained' icon={<AddIcon />} />
      </ButtonWrapper>
      <Wrapper>
        <ThumbnailContainer>
          <TitleText>Avatar</TitleText>
          <FileUpload
            sx={{
              width: '350px',
              height: '180px',
              border: '1px dashed',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              '.MuiButtonBase-root': {
                color: 'var(--primary-color)',
                backgroundColor: 'var(--primary-light-color)',
                '&:hover': {
                  color: 'var(--white-color)',
                  backgroundColor: 'var(--primary-color)'
                }
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
            title={`Kéo thả ảnh vào đây hoặc bấm thêm ảnh`}
            buttonText='Tải lên'
          />
        </ThumbnailContainer>
        <InformationContainer>
          <TitleText>Thông tin chung</TitleText>
          <InputWrapper>
            <InputTextForm
              control={control}
              name='lastName'
              label='Họ và tên đệm'
              sx={{ width: '22%', marginLeft: ' 20px' }}
              variant='outlined'
              error={errors.lastName?.message}
            />
            <InputTextForm
              control={control}
              name='firstName'
              label='Tên'
              sx={{ width: '22%', marginLeft: '20px' }}
              variant='outlined'
              error={errors.firstName?.message}
            />
            <InputTextForm
              control={control}
              name='staffCode'
              label='Mã nhân viên'
              sx={{ width: '22%', marginLeft: '20px' }}
              variant='outlined'
              error={errors.staffCode?.message}
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
            />
            <InputTextForm
              control={control}
              name='phone'
              label='Số điện thoại'
              sx={{ width: '34%', margin: '20px 0 0 20px' }}
              variant='outlined'
              error={errors.phone?.message}
            />
          </InputWrapper>
          <InputRadioForm
            label='Chức vụ'
            name='role'
            options={roleValues}
            defaultValue={selectedValue}
            sx={{ margin: '20px  0  0  20px' }}
            onChange={handleRadioChange}
          />
        </InformationContainer>
      </Wrapper>
    </form>
  )
}

export default AddStaff
