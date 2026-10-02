import { Priority, TaskStatus } from '~/global/enum'
import { StatusDiv } from './Chip.styled'

const Chip = ({ status }: { status: string }) => {
  switch (status) {
    case Priority.HIGH:
      return <StatusDiv danger={true}>High</StatusDiv>
    case Priority.MEDIUM:
      return <StatusDiv warning={true}>Med</StatusDiv>
    case Priority.LOW:
      return <StatusDiv primary={true}>Low</StatusDiv>
    case TaskStatus.COMPLETED:
      return <StatusDiv success={true}>Completed</StatusDiv>
    case TaskStatus.DELETED:
      return <StatusDiv danger={true}>Deleted</StatusDiv>
    case TaskStatus.IN_PROGRESS:
      return <StatusDiv warning={true}>In Progress</StatusDiv>
    case TaskStatus.PENDING:
      return <StatusDiv primary={true}>Pending</StatusDiv>
    default:
      break
  }
}

export default Chip
