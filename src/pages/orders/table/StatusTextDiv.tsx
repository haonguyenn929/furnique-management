import { OrderStatus, TransactionStatus } from '~/global/enum'
import { StatusDiv } from './StatusDiv.style'

const StatusTextDiv = ({ status }: { status: string }) => {
  if (status === OrderStatus.CANCELED || status === TransactionStatus.CANCELED) {
    return <StatusDiv canceled={true}>Cancelled</StatusDiv>
  }
  if (status === TransactionStatus.ERROR) {
    return <StatusDiv canceled={true}>Error</StatusDiv>
  }
  if (status === TransactionStatus.REFUNDED) {
    return <StatusDiv canceled={true}>Refunded</StatusDiv>
  }
  if (status === TransactionStatus.CAPTURED) {
    return <StatusDiv completed={true}>Captured</StatusDiv>
  }
  if (status === OrderStatus.COMPLETED) {
    return <StatusDiv completed={true}>Completed</StatusDiv>
  }
  if (status === OrderStatus.DELETED || status === TransactionStatus.DELETED) {
    return <StatusDiv deleted={true}>Deleted</StatusDiv>
  }
  if (status === OrderStatus.DELIVERING) {
    return <StatusDiv delivering={true}>Delivering</StatusDiv>
  }
  if (status === OrderStatus.PENDING) {
    return <StatusDiv pending={true}>Pending</StatusDiv>
  }
  if (status === OrderStatus.CONFIRMED) {
    return <StatusDiv confirmed={true}>Confirmed</StatusDiv>
  }
  if (status === TransactionStatus.DRAFT) {
    return <StatusDiv draft={true}>Draft</StatusDiv>
  }
  return null
}

export default StatusTextDiv
