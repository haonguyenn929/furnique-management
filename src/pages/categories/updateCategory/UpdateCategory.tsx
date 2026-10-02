import { yupResolver } from '@hookform/resolvers/yup'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import PrimaryButton from '~/components/button/PrimaryButton'
import SecondaryButton from '~/components/button/SecondaryButton'
import InputTextForm from '~/components/form/InputTextForm'
import Loading from '~/components/loading/Loading'
import { EMPTY, MAX_CATEGORY_IMAGE_FILES, MAX_CATEGORY_IMAGE_FILES_SIZE } from '~/global/constants/constants'
import { ScreenPath } from '~/global/enum'
import { ICategory, ICategoryDetails } from '~/global/interfaces/categoriesInterface'
import { ICategoriesProps } from '~/global/interfaces/interface'
import { notifyError, notifyInfo, notifySuccess } from '~/global/toastify'
import useCategoriesApi from '~/hooks/api/useCategoriesApi'
import { cloudinaryURLConvert } from '~/utils/common.utils'
import { ButtonWrapper, InformationContainer, TitleText, Wrapper } from '../addCategory/AddCategory.styled'
import { addCategoryValidationSchema } from '../validation/AddCategoryValidationSchema'
import { DetailThumbnailContainer } from '../viewCategory/ViewCategoryDetail.styled'
import { UpdateImage } from './UpdateCategory.styled'
import useCloudinaryApi from '~/hooks/api/useCloudinaryApi'
import { v4 } from 'uuid'
import { FileUpload } from 'react-material-file-upload'

const UpdateCategory = () => {
  const navigate = useNavigate()
  const params = useParams()
  const { getCategoryById, updateCategory } = useCategoriesApi()
  const [files, setFiles] = useState<File[]>([])
  const [categoryData, setCategoryData] = useState<ICategoryDetails>()
  const [isLoading, setIsLoading] = useState(false)
  const { uploadCloudinary } = useCloudinaryApi()

  const categoryId = params.categoryId
  const defaultValues = {
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

  useEffect(() => {
    if (categoryId) {
      getCategoryDetail(categoryId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getCategoryDetail = async (categoryId: string) => {
    setIsLoading(true)
    try {
      const categoryData = await getCategoryById(categoryId)
      setCategoryData(categoryData)
      reset({
        image: categoryData.image,
        name: categoryData.name,
        description: categoryData.description
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

  const handleUpdateCategoryButton = async (data: ICategoriesProps) => {
    if (!categoryId) return

    const hasChanges =
      categoryData?.name !== data.name || categoryData?.description !== data.description || files.length > 0
    if (!hasChanges) {
      notifyInfo('No changes made')
      return
    }

    const publicId = v4()
    const imageUrl = cloudinaryURLConvert(publicId)
    const formData: ICategory = {
      ...data,
      image: imageUrl
    }
    const response = await updateCategory(categoryId, formData)

    if (response) {
      await uploadImage(publicId)
      notifySuccess('Updated successfully')
      getCategoryById(categoryId)
      navigate(ScreenPath.CATEGORIES)
    }
  }
  const handleCancelButton = () => {
    navigate(ScreenPath.CATEGORIES)
  }
  return isLoading ? (
    <Loading />
  ) : (
    <form onSubmit={handleSubmit(handleUpdateCategoryButton)}>
      <ButtonWrapper>
        <SecondaryButton
          variant='contained'
          name='Cancel'
          color='var(--gray-light-color)'
          icon={<CloseIcon />}
          onClick={handleCancelButton}
          type='button'
        />
        <PrimaryButton name='Update' type='submit' variant='contained' icon={<EditIcon />} />
      </ButtonWrapper>
      <Wrapper>
        <DetailThumbnailContainer>
          <TitleText>Images</TitleText>
          <UpdateImage src={categoryData?.image} />
          <FileUpload
            sx={{
              width: '300px',
              height: '20px',
              border: 'none',
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
            maxFiles={MAX_CATEGORY_IMAGE_FILES}
            maxSize={MAX_CATEGORY_IMAGE_FILES_SIZE}
            accept={{ 'image/png': ['.png'], 'image/jpeg': ['.jpg', '.jpeg'] }}
            buttonText='Change Image'
          />
        </DetailThumbnailContainer>
        <InformationContainer>
          <TitleText>General Information</TitleText>
          <InputTextForm
            control={control}
            name='name'
            label='Category Name'
            sx={{ width: '90%', marginLeft: ' 20px' }}
            variant='outlined'
            error={errors.name?.message}
          />
          <InputTextForm
            control={control}
            name='description'
            label='Description'
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

export default UpdateCategory
