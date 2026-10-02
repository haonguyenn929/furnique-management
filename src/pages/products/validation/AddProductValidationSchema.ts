import { array, lazy, number, object, string } from 'yup'

const variantSchema = object().shape({
  sku: string().required('SKU is required'),
  price: number()
    .typeError('Price must be a number')
    .positive('Price must be greater than 0')
    .max(999999999, 'Price cannot exceed 999,999,999')
    .required('Price is required'),
  quantity: number()
    .typeError('Quantity must be a number')
    .positive('Quantity must be greater than 0')
    .required('Quantity is required'),
  dimensions: object()
    .shape({
      length: number().typeError('Length must be a number').positive('Length must be greater than 0').required(),
      height: number().typeError('Height must be a number').positive('Height must be greater than 0').required(),
      width: number().typeError('Width must be a number').positive('Width must be greater than 0').required()
    })
    .required(),
  keyValue: lazy((obj) =>
    object().shape(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Object.keys(obj).reduce((acc: Record<string, any>, key: string) => {
        acc[key] = object().shape({
          key: string().trim().required('Attribute is required'),
          value: string().trim().required('Attribute value is required')
        })
        return acc
      }, {})
    )
  )
})

export const addProductValidationSchema = object().shape({
  name: string().trim().required('Product name is required'),
  description: string().trim().required('Description is required'),
  images: array().of(string().required()).required('At least 1 image is required'),
  brand: string().trim().required('Brand is required'),
  variants: array().of(variantSchema).required('Variant is required'),
  categories: array().required('Please select a category for the product')
})
