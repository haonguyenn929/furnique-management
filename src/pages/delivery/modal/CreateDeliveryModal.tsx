/* eslint-disable @typescript-eslint/no-explicit-any */
import { LocalShipping } from '@mui/icons-material'
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, Typography } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import PrimaryButton from '~/components/button/PrimaryButton'
import InputTextForm from '~/components/form/InputTextForm'
import { Priority, ScreenPath } from '~/global/enum'
import { modalStyle } from '~/utils/common.utils'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { yupResolver } from '@hookform/resolvers/yup'
import { deliveryValidationSchema } from '../validation/DeliveryValidationSchema'
import useTasksApi from '~/hooks/api/useTasksApi'
import { useNavigate } from 'react-router-dom'
import dayjs, { Dayjs } from 'dayjs'

export interface ICreateDeliveryModal {
  deliveryStaffList: {
    id: string
    label: string
  }[]
  orderId: string
}

export interface IAssignDelivery {
  title: string
  description: string
  startDate: string
  dueDate: string
  priority: string
  assigneeId: string
  orderId?: string
}

const CreateDeliveryModal = ({ deliveryStaffList, orderId }: ICreateDeliveryModal) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setStartDate(null)
    reset(defaultValues)
  }
  const [startDate, setStartDate] = useState<Dayjs | null>(null)
  const navigate = useNavigate()
  const { createShippingTask } = useTasksApi()
  const defaultValues: IAssignDelivery = {
    assigneeId: '',
    description: '',
    dueDate: '',
    priority: '',
    startDate: '',
    title: ''
  }

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<IAssignDelivery>({
    defaultValues: defaultValues,
    resolver: yupResolver(deliveryValidationSchema)
  })

  const submit = async (data: IAssignDelivery) => {
    const requestBody: IAssignDelivery = {
      orderId: orderId,
      assigneeId: data.assigneeId,
      description: data.description,
      priority: data.priority,
      title: data.title,
      dueDate: new Date(data.dueDate).toISOString(),
      startDate: new Date(data.startDate).toISOString()
    }
    await createShippingTask(requestBody)
    setStartDate(null)
    reset(defaultValues)
    navigate(ScreenPath.ORDERS)
  }

  console.log(control._formValues.startDate)

  return (
    <>
      <PrimaryButton
        onClick={() => handleOpen()}
        name='Giao hàng'
        type='submit'
        variant='contained'
        icon={<LocalShipping />}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={modalStyle}>
          <Typography id='modal-modal-title' variant='h5' component='h2' sx={{ mb: 2 }}>
            Giao hàng
          </Typography>
          <form onSubmit={handleSubmit(submit)}>
            <InputTextForm required sx={{ my: 2 }} control={control} name='title' variant='standard' label='Tiêu đề' />
            <InputTextForm
              required
              rows={3}
              multiline
              sx={{ my: 1 }}
              control={control}
              name='description'
              variant='standard'
              label='Mô tả'
            />
            <Controller
              name='assigneeId'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <FormControl sx={{ my: 2 }} fullWidth>
                  <InputLabel id='assigneeId'>Nhân viên</InputLabel>
                  <Select
                    required
                    labelId='assigneeId'
                    id='assigneeId'
                    value={value}
                    label='Nhân viên'
                    onChange={onChange}
                    error={!!error}
                  >
                    {deliveryStaffList.map((value) => (
                      <MenuItem key={value.id} value={value.id}>
                        {value.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
            <Controller
              name='priority'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <FormControl sx={{ my: 2 }} fullWidth>
                  <InputLabel id='priority'>Độ ưu tiên</InputLabel>
                  <Select
                    required
                    labelId='priority'
                    id='priority'
                    value={value}
                    label='Độ ưu tiên'
                    onChange={onChange}
                    error={!!error}
                  >
                    {[Priority.HIGH, Priority.MEDIUM, Priority.LOW].map((value) => (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
            <Controller
              name='startDate'
              control={control}
              render={({ field: { onChange, value } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer sx={{ my: 2 }} components={['DatePicker']}>
                    <DatePicker
                      onChange={(val) => {
                        setStartDate(val)
                        onChange(val ? val.toISOString() : '')
                      }}
                      value={value ? dayjs(value) : null}
                      disablePast
                      sx={{ width: '100%' }}
                      label='Ngày bắt đầu'
                      slotProps={{
                        textField: {
                          helperText: errors.startDate?.message || ''
                        }
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              )}
            />
            <Controller
              name='dueDate'
              control={control}
              render={({ field: { onChange, value } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer sx={{ my: 2 }} components={['DatePicker']}>
                    <DatePicker
                      onChange={(val) => onChange(val ? val.toISOString() : '')}
                      value={value ? dayjs(value) : null}
                      disablePast
                      minDate={startDate ?? undefined}
                      sx={{ width: '100%' }}
                      label='Ngày kết thúc'
                      slotProps={{
                        textField: {
                          helperText: errors.dueDate?.message || ''
                        }
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              )}
            />
            <Button type='submit' variant='contained'>
              Tạo
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  )
}

export default CreateDeliveryModal
