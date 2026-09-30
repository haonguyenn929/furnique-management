import { yupResolver } from '@hookform/resolvers/yup'
import { Backdrop, Box, Fade, Modal, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import CancelButton from '~/components/button/CancelButton'
import SecondaryButton from '~/components/button/SecondaryButton'
import InputTextForm from '~/components/form/InputTextForm'
import { EMPTY } from '~/global/constants/constants'
import { ICancelOrderProps, OrderModalProps } from '~/global/interfaces/ordersInterface'
import { notifyError, notifySuccess } from '~/global/toastify'
import useOrdersApi from '~/hooks/api/useOrdersApi'
import { reasonSchema } from '../validation/CancelOrderValidationSchema'
import { useNavigate } from 'react-router-dom'
import { ScreenPath } from '~/global/enum'

const CancelOrderModal = ({ open, handleClose, orderId }: OrderModalProps) => {
  const { cancelOrder } = useOrdersApi()
  const navigate = useNavigate()
  const style = {
    position: 'absolute',
    borderRadius: '5px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4
  }
  const defaultValues: ICancelOrderProps = {
    reason: EMPTY
  }
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ICancelOrderProps>({
    defaultValues: defaultValues,
    resolver: yupResolver(reasonSchema)
  })
  const handleCancelButton = (orderId: string) => async (data: ICancelOrderProps) => {
    try {
      await cancelOrder(orderId, data)
      notifySuccess('Hủy đơn hàng thành công')
      navigate(ScreenPath.ORDERS)
    } catch (error) {
      notifyError('Có lỗi xảy ra')
    } finally {
      handleClose()
    }
  }
  const handleBackButton = () => {
    handleClose()
  }
  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500
        }
      }}
    >
      <form onSubmit={handleSubmit(handleCancelButton(orderId))}>
        <Fade in={open}>
          <Box sx={style}>
            <Typography id='transition-modal-title' variant='h6' component='h2' sx={{ marginBottom: '20px' }}>
              Bạn có chắc chắn muốn hủy đơn hàng này?
            </Typography>
            <InputTextForm
              control={control}
              name='reason'
              label='Lý do hủy đơn hàng'
              multiline
              rows={4}
              variant='outlined'
              error={errors.reason?.message}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <SecondaryButton
                variant='contained'
                name='Hủy'
                color='var(--gray-light-color)'
                onClick={handleBackButton}
                type='button'
              />
              <CancelButton variant='outlined' name='Đồng ý' type='submit' />
            </div>
          </Box>
        </Fade>
      </form>
    </Modal>
  )
}

export default CancelOrderModal
