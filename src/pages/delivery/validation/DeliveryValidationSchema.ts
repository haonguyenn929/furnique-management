import { string, object } from 'yup'
export const deliveryValidationSchema = object().shape({
  title: string().trim().required('Title is required'),
  description: string().trim().required('Description is required'),
  startDate: string().trim().required('Start date is required'),
  dueDate: string().trim().required('Due date is required'),
  priority: string().trim().required('Priority is required'),
  assigneeId: string().trim().required('Staff is required')
})
