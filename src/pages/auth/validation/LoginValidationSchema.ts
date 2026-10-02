import { string, object } from 'yup'
export const loginValidationSchema = object().shape({
  email: string().required('Email is required'),
  password: string().required('Password is required')
})
