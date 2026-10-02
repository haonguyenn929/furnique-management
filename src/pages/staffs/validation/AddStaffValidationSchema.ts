import { object, string } from 'yup'
export const addStaffValidationSchema = object().shape({
  lastName: string().trim().required('Last name is required'),
  firstName: string().trim().required('First name is required'),
  staffCode: string().trim().required('Staff code is required'),
  phone: string()
    .trim()
    .required('Phone number is required')
    .matches(/^\d{10}$/, 'Phone number must be 10 digits'),
  email: string().trim().required('Email is required').email('Invalid email')
})
