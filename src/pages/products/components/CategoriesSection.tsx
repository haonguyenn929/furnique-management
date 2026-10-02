import { Control, FieldErrors } from 'react-hook-form'
import InputCheckboxForm from '~/components/form/InputCheckboxForm'
import { ICheckboxOption, IProductsProps } from '~/global/interfaces/interface'
import { CategoryContainer, ErrorText, TitleText } from '../addProduct/AddProduct.styled'

interface CategoriesSectionProps {
  control: Control<IProductsProps>
  onCategoriesSelect: (selectedCategories: string[]) => void
  categoriesOptions: ICheckboxOption[]
  errors: FieldErrors
  defaultValues?: unknown[]
}

const CategoriesSection = ({
  control,
  onCategoriesSelect,
  categoriesOptions,
  errors,
  defaultValues
}: CategoriesSectionProps) => {
  const handleCategoriesSelect = (selectedCategories: string[]) => {
    onCategoriesSelect(selectedCategories)
  }

  return (
    <>
      <CategoryContainer>
        <TitleText>Categories</TitleText>
        <InputCheckboxForm
          control={control}
          name='categories'
          options={categoriesOptions}
          label='Product Category'
          onSelectionChange={handleCategoriesSelect}
          defaultValues={defaultValues}
        />
        {errors.categories && <ErrorText>{errors.categories.message as string}</ErrorText>}
      </CategoryContainer>
    </>
  )
}

export default CategoriesSection
