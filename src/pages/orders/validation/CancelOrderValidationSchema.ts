import * as Yup from 'yup'

export const reasonSchema = Yup.object().shape({
  reason: Yup.string()
    .required('Cancellation reason cannot be empty')
    .min(10, 'Cancellation reason must be at least 10 characters')
})
