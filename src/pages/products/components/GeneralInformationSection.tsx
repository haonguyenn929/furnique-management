/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, FieldErrors } from 'react-hook-form'
import InputTextForm from '~/components/form/InputTextForm'
import { IProductsProps } from '~/global/interfaces/interface'
import { InformationContainer, TitleText } from '../addProduct/AddProduct.styled'

interface GeneralInfoSectionProps {
  control: Control<IProductsProps>
  errors: FieldErrors<IProductsProps>
}

const GeneralInformationSection = ({ control, errors }: GeneralInfoSectionProps) => {
  return (
    <>
      <InformationContainer>
        <TitleText>Thông tin chung</TitleText>
        <InputTextForm
          control={control}
          name='name'
          label='Tên sản phẩm'
          sx={{ width: '44%', marginLeft: ' 20px' }}
          variant='outlined'
          error={errors.name?.message}
        />
        <InputTextForm
          control={control}
          name='brand'
          label='Thương hiệu'
          sx={{ width: '44%', marginLeft: ' 20px' }}
          variant='outlined'
          error={errors.brand?.message}
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
    </>
  )
}

export default GeneralInformationSection
