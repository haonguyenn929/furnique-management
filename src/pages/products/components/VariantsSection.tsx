import CloseIcon from '@mui/icons-material/Close'
import { Control, FieldArrayWithId, FieldErrors } from 'react-hook-form'
import PrimaryButton from '~/components/button/PrimaryButton'
import InputTextForm from '~/components/form/InputTextForm'
import { ONE, ZERO } from '~/global/constants/numbers'
import { IProductsProps } from '~/global/interfaces/interface'
import { HeaderWrapper, InformationContainer, TitleText } from '../addProduct/AddProduct.styled'

interface VariantsSectionProps {
  control: Control<IProductsProps>
  errors: FieldErrors<IProductsProps>
  fields: FieldArrayWithId<IProductsProps, 'variants', 'id'>[]
  handleAddKeyButton: (index: number) => void
  handleAddVariantsButton: () => void
  handleRemoveVariantButton: (index: number) => void
  handleRemoveKeyButton: (index: number) => void
}

const VariantsSection = ({
  control,
  errors,
  fields,
  handleAddKeyButton,
  handleAddVariantsButton,
  handleRemoveKeyButton,
  handleRemoveVariantButton
}: VariantsSectionProps) => {
  return (
    <>
      <InformationContainer>
        <TitleText>Variants</TitleText>
        {fields.map((variant, variantIndex) => {
          const keyValueCount = Object.keys(variant.keyValue).length
          return (
            <div key={variantIndex}>
              <HeaderWrapper>
                <h4 style={{ paddingLeft: '20px', margin: ZERO }}>Variant {variantIndex + ONE}</h4>
                {variantIndex >= 1 && <CloseIcon onClick={() => handleRemoveVariantButton(variantIndex)} />}
              </HeaderWrapper>
              <div key={variantIndex} style={{ marginBottom: '20px' }}>
                <InputTextForm
                  control={control}
                  name={`variants[${variantIndex}].sku`}
                  label={`SKU ${variantIndex + ONE}`}
                  sx={{ width: '30%', margin: '20px 0 0 20px' }}
                  variant='outlined'
                  error={errors.variants?.[variantIndex]?.sku?.message}
                />
                <InputTextForm
                  control={control}
                  name={`variants[${variantIndex}].price`}
                  label={`Price ${variantIndex + ONE} (VND)`}
                  sx={{ width: '30%', margin: '20px 0 0 20px' }}
                  variant='outlined'
                  error={errors.variants?.[variantIndex]?.price?.message}
                />
                <InputTextForm
                  control={control}
                  name={`variants[${variantIndex}].quantity`}
                  label={`Quantity ${variantIndex + ONE} (Pcs)`}
                  sx={{ width: '30%', margin: '20px 0 0 20px' }}
                  variant='outlined'
                  error={errors.variants?.[variantIndex]?.quantity?.message}
                />
                <InputTextForm
                  control={control}
                  name={`variants[${variantIndex}].dimensions.height`}
                  label={`Height ${variantIndex + ONE} (cm)`}
                  sx={{ width: '30%', margin: '20px 0 0 20px' }}
                  variant='outlined'
                  error={errors.variants?.[variantIndex]?.dimensions?.height?.message}
                />
                <InputTextForm
                  control={control}
                  name={`variants[${variantIndex}].dimensions.width`}
                  label={`Width ${variantIndex + ONE} (cm)`}
                  sx={{ width: '30%', margin: '20px 0 0 20px' }}
                  variant='outlined'
                  error={errors.variants?.[variantIndex]?.dimensions?.width?.message}
                />
                <InputTextForm
                  control={control}
                  name={`variants[${variantIndex}].dimensions.length`}
                  label={`Length ${variantIndex + ONE} (cm)`}
                  sx={{ width: '30%', margin: '20px 0 0 20px' }}
                  variant='outlined'
                  error={errors.variants?.[variantIndex]?.dimensions?.length?.message}
                />
                {keyValueCount < 2 && (
                  <PrimaryButton
                    variant='outlined'
                    name='Add Attribute'
                    type='button'
                    onClick={() => handleAddKeyButton(variantIndex)}
                  />
                )}
                {Array.from({ length: keyValueCount }).map((_, keyValueIndex) => (
                  <div key={keyValueIndex} style={{ display: 'flex', alignItems: 'center' }}>
                    <InputTextForm
                      control={control}
                      name={`variants[${variantIndex}].keyValue[${keyValueIndex}].key`}
                      label={`Attribute ${keyValueIndex + ONE}`}
                      sx={{ width: '40%', margin: '10px 0 0 20px' }}
                      variant='outlined'
                      placeholder='Color, material...'
                    />
                    <InputTextForm
                      control={control}
                      name={`variants[${variantIndex}].keyValue[${keyValueIndex}].value`}
                      label='Value'
                      variant={'outlined'}
                      sx={{ width: '40%', margin: '10px 0 0 20px' }}
                    />
                    {keyValueIndex >= 1 && (
                      <CloseIcon
                        onClick={() => handleRemoveKeyButton(variantIndex)}
                        sx={{ padding: '10px 0 0 20px' }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
        {fields.length < 2 && (
          <PrimaryButton
            variant={'outlined'}
            name={'Add Variant'}
            type={'button'}
            onClick={handleAddVariantsButton}
          />
        )}
      </InformationContainer>
    </>
  )
}

export default VariantsSection
