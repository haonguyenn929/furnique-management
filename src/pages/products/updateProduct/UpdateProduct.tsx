import { yupResolver } from '@hookform/resolvers/yup'
import CloseIcon from '@mui/icons-material/Close'
import { useEffect, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import PrimaryButton from '~/components/button/PrimaryButton'
import SecondaryButton from '~/components/button/SecondaryButton'
import Loading from '~/components/loading/Loading'
import {
  EMPTY,
  MAX_PRODUCT_IMAGE_FILES,
  MAX_PRODUCT_IMAGE_FILES_3D,
  MAX_PRODUCT_IMAGE_FILES_SIZE,
  MAX_PRODUCT_IMAGE_FILES_SIZE_3D
} from '~/global/constants/constants'
import { ScreenPath } from '~/global/enum'
import { ICheckboxOption, IProductsProps } from '~/global/interfaces/interface'
import { notifyError, notifyLoading, notifySuccess } from '~/global/toastify'
import useCategoriesApi from '~/hooks/api/useCategoriesApi'

import useCloudinaryApi from '~/hooks/api/useCloudinaryApi'
import { ButtonWrapper, GeneralContainer, Image, Items, Wrapper } from './UpdateProduct.styled'
import GeneralInformationSection from '../components/GeneralInformationSection'
import FileUploadSection from '../components/FileUploadSection'
import CategoriesSection from '../components/CategoriesSection'
import VariantsSection from '../components/VariantsSection'
import { updateProductValidationSchema } from '../validation/UpdateProductValidationSchema'
import { Edit } from '@mui/icons-material'
import { TWO, ZERO } from '~/global/constants/numbers'
import useProductsApi from '~/hooks/api/useProductsApi'
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  ImageList,
  ImageListItem,
  Radio,
  RadioGroup
} from '@mui/material'
import { IVariant } from '~/global/interfaces/productInterface'
import { v4 } from 'uuid'
import { cloudinaryURLConvert } from '~/utils/common.utils'

const UpdateProduct = () => {
  const defaultValues: IProductsProps = {
    name: EMPTY,
    description: EMPTY,
    images: [],
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
        keyValue: {}
      }
    ],
    categories: []
  }

  const navigate = useNavigate()
  const params = useParams()
  const [files, setFiles] = useState<File[]>([])
  const [files3D, setFiles3D] = useState<File[]>([])
  const [productData, setProductData] = useState<IProductsProps>(defaultValues)
  const [isLoading, setIsLoading] = useState(false)
  // const [keyValueCounts, setKeyValueCounts] = useState<Record<number, number>>({})

  const [categoriesList, setCategoriesList] = useState<ICheckboxOption[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const { getAllCategoriesForCreateProduct } = useCategoriesApi()
  const { uploadCloudinary } = useCloudinaryApi()
  const { updateProduct, getProductById } = useProductsApi()

  const productId = params.productId

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    clearErrors
  } = useForm<IProductsProps>({
    defaultValues: defaultValues,
    resolver: yupResolver(updateProductValidationSchema)
  })

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'variants'
  })

  //#region (Category fetch)
  const handleCategoriesSelect = (selectedCategories: string[]) => {
    setSelectedCategories(selectedCategories)
    if (selectedCategories.length > 0) {
      clearErrors('categories')
    }
  }

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
  //#endregion

  useEffect(() => {
    if (productId) {
      getProductDetail(productId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getProductDetail = async (productId: string) => {
    setIsLoading(true)
    try {
      const product = await getProductById(productId)
      const transformedProduct: IProductsProps = {
        name: product.name,
        brand: product.brand,
        description: product.description,
        arPlacement: product.arPlacement,
        modelUrl: product.modelUrl,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        variants: product.variants.map((variant: any) => {
          const transformedVariant: IVariant = {
            sku: variant.sku,
            price: variant.price,
            quantity: variant.quantity,
            dimensions: {
              height: variant.dimensions.height,
              width: variant.dimensions.width,
              length: variant.dimensions.length
            },
            keyValue: {}
          }

          Object.keys(variant.keyValue).forEach((key, index) => {
            transformedVariant.keyValue[index] = {
              key: key,
              value: variant.keyValue[key]
            }
          })

          return transformedVariant
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        categories: product.categories.map((category: any) => category._id),
        images: product.images
      }
      setProductData(transformedProduct)
      setSelectedCategories(transformedProduct.categories)

      reset(transformedProduct)
    } catch (error) {
      notifyError('An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const uploadImage = async (files: File[], publicIds: string[]) => {
    try {
      await uploadCloudinary(files, publicIds)
    } catch (error) {
      notifyError('An error occurred')
    }
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

  const handleUpdateProductButton = async (data: IProductsProps) => {
    if (!productId) return
    if (selectedCategories.length === 0) {
      notifyError('Please select at least 1 category for the product')
      return
    }
    if (files.length + data.images.length <= 0) {
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
          images: [...productData.images, ...imageURL],
          modelUrl: modelUrl
        }
      } else {
        formData = {
          ...data,
          categories: selectedCategories,
          images: [...productData.images, ...imageURL]
        }
      }

      try {
        notifyLoading()
        const response = await updateProduct(productId, formData)
        if (response) {
          await uploadImage(files, imageList)
          if (files3D) await uploadImage(files3D, [publicId3d])
          reset()
          setFiles([])
          setSelectedCategories([])
          notifySuccess('Updated successfully')
          navigate(ScreenPath.PRODUCTS)
        }
      } catch (error) {
        notifyError('An error occurred while updating product')
      }
    }
  }

  const handleCancelButton = () => {
    navigate(ScreenPath.PRODUCTS)
  }

  return isLoading ? (
    <Loading />
  ) : (
    <form onSubmit={handleSubmit(handleUpdateProductButton)}>
      <ButtonWrapper>
        <SecondaryButton
          variant='contained'
          name='Cancel'
          color='var(--gray-light-color)'
          icon={<CloseIcon />}
          onClick={handleCancelButton}
          type='button'
        />
        <PrimaryButton name='Update' type='submit' variant='contained' icon={<Edit />} />
      </ButtonWrapper>
      <Wrapper>
        <GeneralContainer>
          <GeneralInformationSection control={control} errors={errors} />
          {MAX_PRODUCT_IMAGE_FILES - productData.images.length !== 0 && (
            <FileUploadSection
              maxFiles={5 - productData.images.length}
              files={files}
              setFiles={setFiles}
              maxSize={MAX_PRODUCT_IMAGE_FILES_SIZE}
            />
          )}
          <ImageList cols={5}>
            {productData?.images.map((value: string, i: number) => (
              <ImageListItem key={i}>
                <Items>
                  <Image src={value} />
                  <Button
                    sx={{
                      my: 2
                    }}
                    size='small'
                    color='error'
                    variant='contained'
                    onClick={() => {
                      setProductData({
                        ...productData,
                        images: productData?.images.filter((img) => img !== value)
                      })
                    }}
                  >
                    Delete Image
                  </Button>
                </Items>
              </ImageListItem>
            ))}
          </ImageList>
          {productData.modelUrl ? (
            <Button
              sx={{
                my: 2
              }}
              size='small'
              color='error'
              variant='contained'
              onClick={() => {
                setProductData({
                  ...productData,
                  modelUrl: undefined
                })
              }}
            >
              Delete 3D Model
            </Button>
          ) : null}
          <Controller
            control={control}
            name='arPlacement'
            render={({ field }) => (
              <FormControl {...field} sx={{ ml: 4 }}>
                <FormLabel>Model Type</FormLabel>
                <RadioGroup
                  aria-labelledby='demo-radio-buttons-group-label'
                  defaultValue={control._defaultValues.arPlacement}
                  name='radio-buttons-group'
                >
                  <FormControlLabel value='floor' control={<Radio />} label='Floor' />
                  <FormControlLabel value='wall' control={<Radio />} label='Wall' />
                </RadioGroup>
              </FormControl>
            )}
          />
          {!productData.modelUrl ? (
            <FileUploadSection
              is3D
              files={files3D}
              setFiles={setFiles3D}
              maxFiles={MAX_PRODUCT_IMAGE_FILES_3D}
              maxSize={MAX_PRODUCT_IMAGE_FILES_SIZE_3D}
            />
          ) : null}
          <VariantsSection
            control={control}
            errors={errors}
            fields={fields}
            handleAddKeyButton={handleAddKeyButton}
            handleAddVariantsButton={handleAddVariantsButton}
            // keyValueCounts={keyValueCounts}
            handleRemoveKeyButton={handleRemoveKeyButton}
            handleRemoveVariantButton={handleRemoveVariantButton}
          />
        </GeneralContainer>
        <CategoriesSection
          categoriesOptions={categoriesList}
          control={control}
          onCategoriesSelect={handleCategoriesSelect}
          errors={errors}
          defaultValues={selectedCategories}
        />
      </Wrapper>
    </form>
  )
}

export default UpdateProduct
