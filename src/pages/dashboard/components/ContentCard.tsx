import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded'
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded'
import { Typography } from '@mui/material'
import { CardDashboardProps } from '~/global/interfaces/interface'
import { CardWrapper, IconWrapper, PercentWrapper, TitleWrapper } from './ContentCard.styled'
const ContentCard = ({ icon, title, percentage, numberReport, status }: CardDashboardProps) => {
  const iconStatus = status ? <ArrowUpwardRoundedIcon /> : <ArrowDownwardRoundedIcon />
  return (
    <CardWrapper>
      <IconWrapper>{icon}</IconWrapper>
      <Typography sx={{ fontSize: '40px' }}>{numberReport}</Typography>
      <TitleWrapper>
        <Typography variant='subtitle1' sx={{ color: 'var(--gray-color)' }}>
          {title}
        </Typography>
        <PercentWrapper status={status}>
          <Typography variant='h6'>{percentage}%</Typography>
          {iconStatus}
        </PercentWrapper>
      </TitleWrapper>
    </CardWrapper>
  )
}

export default ContentCard
