/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Paper, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import CarouselImport from 'react-material-ui-carousel'
import type { ComponentProps, ComponentType } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '~/components/loading/Loading'
import { ScreenPath } from '~/global/enum'
import { IProductDetail, IVariantDetail } from '~/global/interfaces/productInterface'
import { notifyError } from '~/global/toastify'
import useProductsApi from '~/hooks/api/useProductsApi'
import { ButtonWrapper, Image, Item } from './ViewProductDetail.styled'
import { ArrowBack, Edit } from '@mui/icons-material'
import SecondaryButton from '~/components/button/SecondaryButton'
import PrimaryButton from '~/components/button/PrimaryButton'

type CarouselProps = ComponentProps<typeof CarouselImport>

const Carousel =
  typeof CarouselImport === 'function'
    ? CarouselImport
    : (
        CarouselImport as unknown as {
          default: ComponentType<CarouselProps>
        }
      ).default

const ViewProductDetail = () => {
  const navigate = useNavigate()
  const params = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [productData, setProductData] = useState<IProductDetail>()
  const { getProductById } = useProductsApi()
  const productId = params.productId

  const getProductDetail = async (productId: string) => {
    setIsLoading(true)
    try {
      const productData = await getProductById(productId)
      setProductData(productData)
    } catch (error) {
      notifyError('An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (productId) getProductDetail(productId)

    return () => {}
  }, [])

  const handleBackButton = () => {
    navigate(ScreenPath.PRODUCTS)
  }

  const handleEditButton = () => {
    productId ? navigate(ScreenPath.UPDATE_PRODUCT.replace(':productId', productId)) : navigate(ScreenPath.PRODUCTS)
  }

  console.log('Carousel:', typeof Carousel, Carousel)

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <Paper
        sx={{
          boxShadow: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'center',
          justifyContent: 'center'
        }}
      >
        <ButtonWrapper>
          <SecondaryButton
            variant='contained'
            name='Back'
            color='var(--gray-light-color)'
            icon={<ArrowBack />}
            onClick={handleBackButton}
            type='button'
          />
          <PrimaryButton
            name='Edit'
            type='button'
            variant='contained'
            icon={<Edit />}
            onClick={handleEditButton}
          />
        </ButtonWrapper>
        <Typography variant='h3' sx={{ mt: 3, fontWeight: 'bold', textAlign: 'center' }}>
          {productData?.name}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'center', md: 'flex-start' } }}>
          <Carousel
            navButtonsAlwaysVisible
            autoPlay={false}
            sx={{
              width: { xs: '100%', sm: '80%', md: '30%' },
              m: '0 auto'
            }}
          >
            {(productData?.images ?? []).map((src: string) => (
              <Item key={src}>
                <Image src={src} />
              </Item>
            ))}
          </Carousel>
          <Box sx={{ width: { xs: '100%', md: '65%' }, p: { xs: 2, sm: 3 }, boxSizing: 'border-box' }}>
            <Typography variant='h5' sx={{ my: 2, fontWeight: 'bold' }}>
              General Information
            </Typography>
            <Typography sx={{ my: 1 }} variant='body1'>
              Description: {productData?.description}
            </Typography>
            <Typography sx={{ my: 1 }} variant='body1'>
              Brand: {productData?.brand}
            </Typography>
            <Typography sx={{ my: 1 }} variant='body1'>
              AR: {productData?.arPlacement}
            </Typography>
            {/* <Typography sx={{ my: 1 }} variant='body1'>
              Created Date: {productData?.createdAt}
            </Typography>
            <Typography sx={{ my: 1 }} variant='body1'>
              Updated Date: {productData?.updatedAt}
            </Typography> */}
            {productData?.variants.map((value: IVariantDetail, index: number) => (
              <>
                <Box>
                  <Typography variant='h5' sx={{ my: 2, fontWeight: 'bold' }}>
                    Variant {index + 1}
                  </Typography>
                  <Typography sx={{ my: 1 }} variant='body1'>
                    SKU: {value.sku}
                  </Typography>
                  <Typography sx={{ my: 1 }} variant='body1'>
                    Quantity: {value.quantity}
                  </Typography>
                  <Typography sx={{ my: 1 }} variant='body1'>
                    Price: {value.price.toLocaleString()} VND
                  </Typography>
                  <Typography sx={{ my: 1 }} variant='body1'>
                    Dimensions: {value.dimensions.length}cm x {value.dimensions.width}cm x {value.dimensions.height}cm
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start' }}>
                    <Box>
                      {Object.keys(value.keyValue).map((value) => (
                        <Typography sx={{ my: 1 }} variant='body1'>
                          {value}:
                        </Typography>
                      ))}
                    </Box>
                    <Box>
                      {Object.values(value.keyValue).map((value) => (
                        <Typography sx={{ my: 1 }} variant='body1'>
                          &nbsp;{value}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </>
            ))}
          </Box>
        </Box>
      </Paper>
    </>
  )
}

export default ViewProductDetail
