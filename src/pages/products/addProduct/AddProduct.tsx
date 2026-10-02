import { yupResolver } from '@hookform/resolvers/yup'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import { useEffect, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import PrimaryButton from '~/components/button/PrimaryButton'
import SecondaryButton from '~/components/button/SecondaryButton'
import {
  EMPTY,
  MAX_PRODUCT_IMAGE_FILES,
  MAX_PRODUCT_IMAGE_FILES_3D,
  MAX_PRODUCT_IMAGE_FILES_SIZE,
  MAX_PRODUCT_IMAGE_FILES_SIZE_3D
} from '~/global/constants/constants'
import { TWO, ZERO } from '~/global/constants/numbers'
import { ScreenPath } from '~/global/enum'
import { ICheckboxOption, IProductsProps } from '~/global/interfaces/interface'
import { notifyError, notifyLoading, notifySuccess } from '~/global/toastify'
import useCategoriesApi from '~/hooks/api/useCategoriesApi'
import useCloudinaryApi from '~/hooks/api/useCloudinaryApi'
import useProductsApi from '~/hooks/api/useProductsApi'
import { cloudinaryURLConvert } from '~/utils/common.utils'
import CategoriesSection from '../components/CategoriesSection'
import FileUploadSection from '../components/FileUploadSection'
import GeneralInformationSection from '../components/GeneralInformationSection'
import VariantsSection from '../components/VariantsSection'
import { addProductValidationSchema } from '../validation/AddProductValidationSchema'
import { ButtonWrapper, GeneralContainer, Wrapper } from './AddProduct.styled'
import { v4 } from 'uuid'
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'

const AddProduct = () => {
  const navigate = useNavigate()
  const [files, setFiles] = useState<File[]>([])
  const [files3D, setFiles3D] = useState<File[]>([])

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const { uploadCloudinary } = useCloudinaryApi()
  const { createProduct } = useProductsApi()
  const { getAllCategoriesForCreateProduct } = useCategoriesApi()
  const [categoriesList, setCategoriesList] = useState<ICheckboxOption[]>([])

  const defaultValues: IProductsProps = {
    name: EMPTY,
    description: EMPTY,
    images: [],
    modelUrl: EMPTY,
    brand: EMPTY,
    variants: [
      {
        sku: EMPTY,
        price: ZERO,
        quantity: ZERO,
        dimensions: {
          height: ZERO,
          width: ZERO,
          length: ZERO
        },
        keyValue: {
          '0': {
            key: EMPTY,
            value: EMPTY
          }
        }
      }
    ],
    categories: []
  }

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    clearErrors
  } = useForm<IProductsProps>({
    defaultValues: defaultValues,
    resolver: yupResolver(addProductValidationSchema)
  })

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'variants'
  })

  useEffect(() => {
    getCategoriesData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getCategoriesData = async () => {
    try {
      const categoriesData = await getAllCategoriesForCreateProduct()
      const categoriesList: ICheckboxOption[] = categoriesData.docs.map((value: { name: unknown; _id: unknown }) => {
        return {
          label: value.name,
          value: value._id
        }
      })
      setCategoriesList(categoriesList)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCategoriesSelect = (selectedCategories: string[]) => {
    setSelectedCategories(selectedCategories)
    if (selectedCategories.length > 0) {
      clearErrors('categories')
    }
  }

  const uploadImage = async (files: File[], publicIds: string[]) => {
    try {
      await uploadCloudinary(files, publicIds)
    } catch (error) {
      notifyError('An error occurred')
    }
  }

  const handleAddProductButton = async (data: IProductsProps) => {
    if (selectedCategories.length === 0) {
      notifyError('Please select at least 1 category for the product')
      return
    }

    if (files.length <= 0) {
      notifyError('At least one image is required')
      return
    } else {
      const imageList: string[] = []
      const imageURL: string[] = []
      for (let i = 0; i < files.length; i++) {
        const publicId = v4()
        imageList.push(publicId)
        imageURL.push(cloudinaryURLConvert(publicId))
      }
      let formData: IProductsProps
      const publicId3d = v4()
      if (files3D) {
        const modelUrl = cloudinaryURLConvert(publicId3d, true)
        formData = {
          ...data,
          categories: selectedCategories,
          images: imageURL,
          modelUrl: modelUrl
        }
      } else {
        formData = {
          ...data,
          categories: selectedCategories,
          images: imageURL
        }
      }

      try {
        notifyLoading()
        const response = await createProduct(formData)
        if (response) {
          await uploadImage(files, imageList)
          if (files3D) await uploadImage(files3D, [publicId3d])
          reset()
          setFiles([])
          setSelectedCategories([])
          notifySuccess('Added successfully')
          navigate(ScreenPath.PRODUCTS)
        }
      } catch (error) {
        notifyError('An error occurred while adding product')
      }
    }
  }

  const handleCancelButton = () => {
    navigate(ScreenPath.PRODUCTS)
  }

  const handleAddKeyButton = (variantIndex: number) => {
    const variantField = fields[variantIndex]
    const keyValueFieldCount = Object.keys(variantField.keyValue).length

    if (keyValueFieldCount < TWO) {
      update(variantIndex, {
        ...variantField,
        keyValue: { ...variantField.keyValue, [`${keyValueFieldCount}`]: { key: EMPTY, value: EMPTY } }
      })
    }
  }

  const handleAddVariantsButton = () => {
    if (fields.length < TWO) {
      append({
        sku: EMPTY,
        price: ZERO,
        quantity: ZERO,
        dimensions: {
          height: ZERO,
          width: ZERO,
          length: ZERO
        },
        keyValue: {
          [`${fields.length - 1}`]: {
            key: EMPTY,
            value: EMPTY
          }
        }
      })
    }
  }

  const handleRemoveKeyButton = (variantIndex: number) => {
    const variantField = fields[variantIndex]
    const keyValueFields = variantField.keyValue
    delete keyValueFields[Object.keys(keyValueFields).pop()!]
    update(variantIndex, { ...variantField, keyValue: keyValueFields })
  }

  const handleRemoveVariantButton = (index: number) => {
    remove(index)
  }

  return (
    <form onSubmit={handleSubmit(handleAddProductButton)}>
      <ButtonWrapper>
        <SecondaryButton
          variant='contained'
          name='Cancel'
          color='var(--gray-light-color)'
          icon={<CloseIcon />}
          onClick={handleCancelButton}
          type='button'
        />
        <PrimaryButton name='Add Product' type='submit' variant='contained' icon={<AddIcon />} />
      </ButtonWrapper>
      <Wrapper>
        <GeneralContainer>
          <GeneralInformationSection control={control} errors={errors} />
          <FileUploadSection
            files={files}
            setFiles={setFiles}
            maxFiles={MAX_PRODUCT_IMAGE_FILES}
            maxSize={MAX_PRODUCT_IMAGE_FILES_SIZE}
          />
          <FileUploadSection
            is3D
            files={files3D}
            setFiles={setFiles3D}
            maxFiles={MAX_PRODUCT_IMAGE_FILES_3D}
            maxSize={MAX_PRODUCT_IMAGE_FILES_SIZE_3D}
          />
          <Controller
            control={control}
            name='arPlacement'
            render={({ field }) => (
              <FormControl {...field} sx={{ ml: 4 }}>
                <FormLabel>Model Type</FormLabel>
                <RadioGroup
                  aria-labelledby='demo-radio-buttons-group-label'
                  defaultValue='female'
                  name='radio-buttons-group'
                >
                  <FormControlLabel value='floor' control={<Radio />} label='Floor' />
                  <FormControlLabel value='wall' control={<Radio />} label='Wall' />
                </RadioGroup>
              </FormControl>
            )}
          />
          <VariantsSection
            control={control}
            errors={errors}
            fields={fields}
            handleAddKeyButton={handleAddKeyButton}
            handleAddVariantsButton={handleAddVariantsButton}
            handleRemoveKeyButton={handleRemoveKeyButton}
            handleRemoveVariantButton={handleRemoveVariantButton}
          />
        </GeneralContainer>
        <CategoriesSection
          categoriesOptions={categoriesList}
          control={control}
          onCategoriesSelect={handleCategoriesSelect}
          errors={errors}
        />
      </Wrapper>
    </form>
  )
}

export default AddProduct
