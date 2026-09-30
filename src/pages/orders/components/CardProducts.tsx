import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'
import { ICardOrder } from '~/global/interfaces/ordersInterface'

const CardProducts = ({ image, name, variant }: ICardOrder) => {
  return (
    <Card sx={{ display: 'flex', height: '52px', width: '220px', boxShadow: 'none' }}>
      <CardMedia
        component='img'
        sx={{ width: 40, objectFit: 'scale-down', borderRadius: '10px' }}
        image={image}
        alt={name}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '52px' }}>
        <CardContent
          sx={{
            height: '52px',
            padding: '5px 0px 0px 15px'
          }}
        >
          <Typography sx={{ fontSize: 16 }}>{name}</Typography>
          <Typography sx={{ fontSize: 14 }} color='text.secondary' component='div'>
            {variant}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  )
}

export default CardProducts
