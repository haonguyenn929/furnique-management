import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import MailOutlineRounded from '@mui/icons-material/MailOutlineRounded'
import LockOutlined from '@mui/icons-material/LockOutlined'
import PrimaryButton from '~/components/button/PrimaryButton'
import { EMPTY } from '~/global/constants/constants'
import { ScreenPath, UserRole } from '~/global/enum'
import useAuth from '~/hooks/useAuth'
import InputTextForm from '../../components/form/InputTextForm'
import { FormWrapper } from './Login.styled'
import { ILoginFormProps } from './types/LoginForm'
import { loginValidationSchema } from './validation/LoginValidationSchema'

const LoginForm = () => {
  const defaultValues: ILoginFormProps = {
    email: EMPTY,
    password: EMPTY
  }
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ILoginFormProps>({
    defaultValues: defaultValues,
    resolver: yupResolver(loginValidationSchema)
  })
  const { idToken, login, user } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (user?.role === UserRole.ADMIN || user?.role === UserRole.STAFF) {
      navigate(ScreenPath.DASHBOARD)
    } else if (user?.role === UserRole.DELIVERY_STAFF) {
      navigate(ScreenPath.DELIVERY)
    } else if (user?.role === UserRole.CONSULTANT_STAFF) {
      navigate(ScreenPath.CONSULTANT_BOOKING)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idToken])
  return (
    <FormWrapper onSubmit={handleSubmit(login)}>
      <InputTextForm
        control={control}
        name='email'
        label='Email'
        type='email'
        placeholder='example@furnique.com'
        startIcon={<MailOutlineRounded fontSize='small' />}
        error={errors.email?.message}
        variant='outlined'
        sx={{ mb: 2 }}
      />
      <InputTextForm
        control={control}
        name='password'
        label='Password'
        type='password'
        placeholder='••••••••'
        startIcon={<LockOutlined fontSize='small' />}
        error={errors.password?.message}
        variant='outlined'
        sx={{ mb: 2.5 }}
      />
      <PrimaryButton
        type='submit'
        name='Login'
        variant='contained'
        sx={{
          width: '100%',
          py: 1.2,
          fontSize: '15px',
          fontWeight: 600,
          borderRadius: '10px',
          backgroundColor: 'var(--primary-color)',
          color: '#ffffff',
          boxShadow: '0 4px 14px rgba(227, 150, 74, 0.35)',
          '&:hover': {
            backgroundColor: 'var(--primary-dark-color)',
            boxShadow: '0 6px 20px rgba(227, 150, 74, 0.45)'
          }
        }}
      />
    </FormWrapper>
  )
}

export default LoginForm
