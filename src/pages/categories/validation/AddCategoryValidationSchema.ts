import { string, object } from 'yup'
export const addCategoryValidationSchema = object().shape({
  name: string().trim().required('Category name is required'),
  description: string().trim().required('Description is required')
})
