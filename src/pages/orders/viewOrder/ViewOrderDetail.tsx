/* eslint-disable react-hooks/exhaustive-deps */
import { CalendarMonth } from '@mui/icons-material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ContactPhoneIcon from '@mui/icons-material/ContactPhone'
import EmailIcon from '@mui/icons-material/Email'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PersonIcon from '@mui/icons-material/Person'
import ReceiptIcon from '@mui/icons-material/Receipt'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AgreeButton from '~/components/button/AgreeButton'
import CancelButton from '~/components/button/CancelButton'
import SecondaryButton from '~/components/button/SecondaryButton'
import Loading from '~/components/loading/Loading'
import { EMPTY } from '~/global/constants/constants'
import { OrderStatus, StaffRoles } from '~/global/enum'
import { IOrder } from '~/global/interfaces/ordersInterface'
import { notifyError } from '~/global/toastify'
import useOrdersApi from '~/hooks/api/useOrdersApi'
import { ButtonWrapper, TitleText } from '~/pages/categories/addCategory/AddCategory.styled'
import CancelOrderModal from '../components/CancelOrderModal'
import ConfirmOrderModal from '../components/ConfirmOrderModal'
import OrderListTable from '../table/OrderListTable'
import StatusTextDiv from '../table/StatusTextDiv'
import {
  CustomerInformation,
  IconWrapper,
  ListContent,
  NoteInformation,
  NoteWrapper,
  OrderContent,
  OrderInformation,
  OrderList,
  ShippingInformation,
  TextHeader,
  TextWrapper,
  TitleWrapper,
  TotalWrapper,
  Wrapper
} from './ViewOrderDetail.styled'
import CreateDeliveryModal from '~/pages/delivery/modal/CreateDeliveryModal'
import useStaffsApi from '~/hooks/api/useStaffsApi'
import { IUserInfoProps } from '~/global/interfaces/interface'
import useAuth from '~/hooks/useAuth'
import { Box, Button } from '@mui/material'
import useTasksApi from '~/hooks/api/useTasksApi'
import { formatCurrency } from '~/utils/format'

const ViewOrderDetail = () => {
  const params = useParams()
  const navigate = useNavigate()
  const orderId = params.orderId
  const { user } = useAuth()
  const { getOrderById } = useOrdersApi()
  const { getDeliveryStaffs } = useStaffsApi()
  const { changeShippingProgress, changeShippingComplete } = useTasksApi()
  const [isLoading, setIsLoading] = useState(false)
  const [orderData, setOrderData] = useState<IOrder>()
  const [deliveryStaffList, setDeliveryStaffList] = useState<
    {
      id: string
      label: string
    }[]
  >([])
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  useEffect(() => {
    if (orderId) {
      getOrderDetail(orderId)
    }
  }, [])
  useEffect(() => {
    if (user?.role !== StaffRoles.DELIVERY_STAFF) {
      getDeliveryStaffList()
    }
  }, [])
  const getOrderDetail = async (orderId: string) => {
    try {
      setIsLoading(true)
      const orderDetailData = await getOrderById(orderId, user?.role || '')
      setOrderData(orderDetailData)
    } catch (error) {
      notifyError('An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const getDeliveryStaffList = async () => {
    try {
      setIsLoading(true)
      const staffList = await getDeliveryStaffs()
      const data = staffList.docs.map((value: IUserInfoProps) => {
        return {
          id: value._id,
          label: `${value.firstName} ${value.lastName}`
        }
      })
      setDeliveryStaffList(data)
    } catch (error) {
      notifyError('An error occurred!')
    } finally {
      setIsLoading(false)
    }
  }

  const handleOrderNumber = (orderId: string) => {
    return orderId.slice(-6)
  }
  const handleCancelButton = () => {
    setIsCancelModalOpen(true)
  }
  const handleClose = () => {
    setIsCancelModalOpen(false)
    setIsConfirmModalOpen(false)
  }
  const handleConfirmButton = () => {
    setIsConfirmModalOpen(true)
  }
  const handleBackButton = () => {
    navigate(-1)
  }

  const handleProgressButton = async () => {
    if (orderId) {
      await changeShippingProgress(orderId)
      navigate(-1)
    }
  }
  const handleCompleteButton = async () => {
    if (orderId) {
      await changeShippingComplete(orderId)
      navigate(-1)
    }
  }
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Wrapper>
          <ButtonWrapper>
            {orderData?.orderStatus === OrderStatus.CONFIRMED && !orderData.isDeliveryAssigned ? (
              <CreateDeliveryModal orderId={orderData._id} deliveryStaffList={deliveryStaffList} />
            ) : null}
            <SecondaryButton
              variant='contained'
              name='Back'
              color='var(--gray-light-color)'
              icon={<ArrowBackIcon />}
              onClick={handleBackButton}
              type='button'
            />
          </ButtonWrapper>
          <OrderInformation>
            <OrderContent>
              <TitleWrapper>
                <TitleText>Order #{orderData && handleOrderNumber(orderData?._id)}</TitleText>
                {orderData?.orderStatus === OrderStatus.COMPLETED ? null : (
                  <>
                    {user?.role === StaffRoles.DELIVERY_STAFF ? (
                      <Box sx={{ display: 'flex' }}>
                        <Button
                          type='button'
                          sx={{ height: '30px', marginRight: '10px' }}
                          onClick={handleProgressButton}
                          disabled={orderData?.orderStatus === OrderStatus.DELIVERING}
                        >
                          Deliver
                        </Button>
                        <Button
                          type='button'
                          color='success'
                          sx={{ height: '30px', marginRight: '10px' }}
                          onClick={handleCompleteButton}
                          disabled={orderData?.orderStatus === OrderStatus.CONFIRMED}
                        >
                          Complete
                        </Button>
                      </Box>
                    ) : (
                      <Box sx={{ display: 'flex', gap: '8px' }}>
                        <CancelButton
                          variant='contained'
                          name='Cancel'
                          type='button'
                          sx={{ height: '30px' }}
                          onClick={handleCancelButton}
                          disable={
                            orderData?.orderStatus !== OrderStatus.PENDING &&
                            orderData?.orderStatus !== OrderStatus.CONFIRMED
                          }
                        />
                        <AgreeButton
                          variant='contained'
                          name='Confirm'
                          type='button'
                          sx={{ height: '30px' }}
                          onClick={handleConfirmButton}
                          disable={
                            orderData?.orderStatus === OrderStatus.CANCELED ||
                            orderData?.orderStatus === OrderStatus.CONFIRMED
                          }
                        />
                      </Box>
                    )}
                  </>
                )}
              </TitleWrapper>
              <TextWrapper>
                <TextHeader>
                  <IconWrapper>
                    <CalendarMonth sx={{ color: 'var(--primary-color)' }} />
                  </IconWrapper>
                  <strong>Created Date</strong>
                </TextHeader>
                <span style={{ fontWeight: 500 }}>
                  {dayjs(orderData?.orderDate).format('hh:mm:ss DD/MM/YYYY')}
                </span>
              </TextWrapper>
              <TextWrapper>
                <TextHeader>
                  <IconWrapper>
                    <LocalMallIcon sx={{ color: 'var(--primary-color)' }} />
                  </IconWrapper>
                  <strong>Order Status</strong>
                </TextHeader>
                <StatusTextDiv status={orderData?.orderStatus || EMPTY} />
              </TextWrapper>
              <TextWrapper>
                <TextHeader>
                  <IconWrapper>
                    <ReceiptIcon sx={{ color: 'var(--primary-color)' }} />
                  </IconWrapper>
                  <strong>Transaction Status</strong>
                </TextHeader>
                <StatusTextDiv status={orderData?.transactionStatus || EMPTY} />
              </TextWrapper>
            </OrderContent>
            <CustomerInformation>
              <TitleText>Customer</TitleText>
              <TextWrapper>
                <TextHeader>
                  <IconWrapper>
                    <PersonIcon sx={{ color: 'var(--primary-color)' }} />
                  </IconWrapper>
                  <strong>Full Name</strong>
                </TextHeader>
                {`${orderData?.customer.firstName} ${orderData?.customer.lastName}`}
              </TextWrapper>
              <TextWrapper>
                <TextHeader>
                  <IconWrapper>
                    <EmailIcon sx={{ color: 'var(--primary-color)' }} />
                  </IconWrapper>
                  <strong>Email</strong>
                </TextHeader>
                {orderData?.customer.email}
              </TextWrapper>
              <TextWrapper>
                <TextHeader>
                  <IconWrapper>
                    <ContactPhoneIcon sx={{ color: 'var(--primary-color)' }} />
                  </IconWrapper>
                  <strong>Phone</strong>
                </TextHeader>
                {orderData?.customer.phone}
              </TextWrapper>
            </CustomerInformation>
            <ShippingInformation>
              <TitleText>Shipping</TitleText>
              <TextWrapper>
                <IconWrapper>
                  <LocationOnIcon sx={{ color: 'var(--primary-color)' }} />
                </IconWrapper>
                <div style={{ display: 'flex', flexDirection: 'column', width: 'calc(100% - 40px)' }}>
                  <strong>Sender Address</strong>
                  Lot E2a-7, D1 Street, Long Thanh My Ward, Thu Duc City, Ho Chi Minh City
                </div>
              </TextWrapper>
              <TextWrapper>
                <IconWrapper>
                  <LocationOnIcon sx={{ color: 'var(--primary-color)' }} />
                </IconWrapper>
                <div style={{ display: 'flex', flexDirection: 'column', width: 'calc(100% - 40px)' }}>
                  <strong>Delivery Address</strong>
                  {orderData?.customer.shippingAddress}
                </div>
              </TextWrapper>
            </ShippingInformation>
          </OrderInformation>
          <OrderList>
            <ListContent>
              <TitleText>Order Items</TitleText>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <OrderListTable />
                <TotalWrapper>
                  <TextWrapper>
                    <strong>Total</strong>
                    <strong>{formatCurrency(orderData?.totalAmount ?? 0)}</strong>
                  </TextWrapper>
                </TotalWrapper>
              </div>
            </ListContent>
            <NoteWrapper>
              <NoteInformation>
                <TitleText>Notes</TitleText>
                <TextWrapper> {orderData?.notes}</TextWrapper>
              </NoteInformation>
              {orderData?.orderStatus === OrderStatus.CANCELED && (
                <NoteInformation>
                  <TitleText>Cancellation Reason</TitleText>
                  <TextWrapper> {orderData?.reason}</TextWrapper>
                </NoteInformation>
              )}
            </NoteWrapper>
          </OrderList>
          {orderId && (
            <>
              <CancelOrderModal open={isCancelModalOpen} orderId={orderId} handleClose={handleClose} />
              <ConfirmOrderModal open={isConfirmModalOpen} handleClose={handleClose} orderId={orderId} />
            </>
          )}
        </Wrapper>
      )}
    </>
  )
}

export default ViewOrderDetail
