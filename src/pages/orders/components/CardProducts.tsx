import { Box, CardMedia, Typography } from '@mui/material'
import { ICardOrder } from '~/global/interfaces/ordersInterface'

const CardProducts = ({ image, name, variant }: ICardOrder) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%', gap: '12px' }}>
      <CardMedia
        component='img'
        sx={{
          width: 50,
          height: 50,
          minWidth: 50,
          objectFit: 'cover',
          borderRadius: '8px',
          border: '1px solid #f0f0f0',
          backgroundColor: '#fafafa',
          flexShrink: 0
        }}
        image={image}
        alt={name}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0, overflow: 'hidden' }}>
        <Typography
          sx={{
            fontSize: '0.925rem',
            fontWeight: 600,
            lineHeight: 1.3,
            color: 'text.primary'
          }}
          title={name}
        >
          {name}
        </Typography>
        {variant && (
          <Typography
            sx={{
              fontSize: '0.8rem',
              color: 'text.secondary',
              lineHeight: 1.3,
              marginTop: '2px'
            }}
            title={variant}
          >
            {variant}
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default CardProducts
