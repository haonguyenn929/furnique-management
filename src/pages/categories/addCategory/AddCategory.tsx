import { yupResolver } from '@hookform/resolvers/yup'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import PrimaryButton from '~/components/button/PrimaryButton'
import SecondaryButton from '~/components/button/SecondaryButton'
import InputTextForm from '~/components/form/InputTextForm'
import { EMPTY, MAX_CATEGORY_IMAGE_FILES, MAX_CATEGORY_IMAGE_FILES_SIZE } from '~/global/constants/constants'
import { ScreenPath } from '~/global/enum'
import { ICategoriesProps } from '~/global/interfaces/interface'
import { addCategoryValidationSchema } from '../validation/AddCategoryValidationSchema'
import { ButtonWrapper, InformationContainer, ThumbnailContainer, TitleText, Wrapper } from './AddCategory.styled'
import useCategoriesApi from '~/hooks/api/useCategoriesApi'
import { cloudinaryURLConvert } from '~/utils/common.utils'
import { notifyError, notifySuccess } from '~/global/toastify'
import useCloudinaryApi from '~/hooks/api/useCloudinaryApi'
import { v4 } from 'uuid'
import { FileUpload } from 'react-material-file-upload'
const AddCategory = () => {
  const navigate = useNavigate()
  const [files, setFiles] = useState<File[]>([])
  const { createCategory } = useCategoriesApi()
  const { uploadCloudinary } = useCloudinaryApi()

  const defaultValues: ICategoriesProps = {
    image: EMPTY,
    name: EMPTY,
    description: EMPTY
  }
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ICategoriesProps>({
    defaultValues: defaultValues,
    resolver: yupResolver(addCategoryValidationSchema)
  })

  const uploadImage = async (publicId: string) => {
    try {
      await uploadCloudinary(files, [publicId])
    } catch (error) {
      notifyError('Có lỗi xảy ra')
    }
  }

  const handleAddCategoryButton = async () => {
    if (files.length <= 0) {
      notifyError('Cần ít nhất một ảnh')
      return
    } else {
      const publicId = v4()
      const response = await createCategory({
        name: control._formValues.name,
        description: control._formValues.description,
        image: cloudinaryURLConvert(publicId)
      })
      if (response) {
        await uploadImage(publicId)
        reset()
        setFiles([])
        notifySuccess('Thêm thành công')
        navigate(ScreenPath.CATEGORIES)
      }
    }
  }

  const handleCancelButton = () => {
    navigate(ScreenPath.CATEGORIES)
  }
  return (
    <form onSubmit={handleSubmit(handleAddCategoryButton)}>
      <ButtonWrapper>
        <SecondaryButton
          variant='contained'
          name='Hủy'
          color='var(--gray-light-color)'
          icon={<CloseIcon />}
          onClick={handleCancelButton}
          type='button'
        />
        <PrimaryButton name='Thêm phân loại' type='submit' variant='contained' icon={<AddIcon />} />
      </ButtonWrapper>
      <Wrapper>
        <ThumbnailContainer>
          <TitleText>Hình ảnh</TitleText>
          <FileUpload
            sx={{
              width: '300px',
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
            maxFiles={MAX_CATEGORY_IMAGE_FILES}
            maxSize={MAX_CATEGORY_IMAGE_FILES_SIZE}
            accept={{ 'image/png': ['.png'], 'image/jpeg': ['.jpg', '.jpeg'] }}
            title={`Kéo thả ảnh vào đây hoặc bấm thêm ảnh`}
            buttonText='Tải lên'
          />
        </ThumbnailContainer>
        <InformationContainer>
          <TitleText>Thông tin chung</TitleText>
          <InputTextForm
            control={control}
            name='name'
            label='Tên phân loại'
            sx={{ width: '90%', marginLeft: ' 20px' }}
            variant='outlined'
            error={errors.name?.message}
          />
          <InputTextForm
            control={control}
            name='description'
            label='Mô tả'
            sx={{ width: '90%', margin: '20px 0 0 20px' }}
            variant='outlined'
            error={errors.description?.message}
            multiline
            rows={5}
          />
        </InformationContainer>
      </Wrapper>
    </form>
  )
}

export default AddCategory
