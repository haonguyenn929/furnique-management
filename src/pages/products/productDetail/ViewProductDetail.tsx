/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Paper, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
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
      notifyError('Có lỗi xảy ra')
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
            name='Trở về'
            color='var(--gray-light-color)'
            icon={<ArrowBack />}
            onClick={handleBackButton}
            type='button'
          />
          <PrimaryButton
            name='Chỉnh sửa'
            type='button'
            variant='contained'
            icon={<Edit />}
            onClick={handleEditButton}
          />
        </ButtonWrapper>
        <Typography variant='h3' sx={{ mt: 3, fontWeight: 'bold', textAlign: 'center' }}>
          {productData?.name}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Carousel
            navButtonsAlwaysVisible
            autoPlay={false}
            sx={{
              width: '30%',
              m: '0 auto'
            }}
          >
            {productData?.images.map((value: string) => (
              <Item>
                <Image key={value} src={value} />
              </Item>
            ))}
          </Carousel>
          <Box sx={{ width: '65%', p: 3 }}>
            <Typography variant='h5' sx={{ my: 2, fontWeight: 'bold' }}>
              Thông tin chung
            </Typography>
            <Typography sx={{ my: 1 }} variant='body1'>
              Mô tả: {productData?.description}
            </Typography>
            <Typography sx={{ my: 1 }} variant='body1'>
              Thương hiệu: {productData?.brand}
            </Typography>
            <Typography sx={{ my: 1 }} variant='body1'>
              AR: {productData?.arPlacement}
            </Typography>
            {/* <Typography sx={{ my: 1 }} variant='body1'>
              Ngày tạo: {productData?.createdAt}
            </Typography>
            <Typography sx={{ my: 1 }} variant='body1'>
              Ngày cập nhật: {productData?.updatedAt}
            </Typography> */}
            {productData?.variants.map((value: IVariantDetail, index: number) => (
              <>
                <Box>
                  <Typography variant='h5' sx={{ my: 2, fontWeight: 'bold' }}>
                    Phân loại {index + 1}
                  </Typography>
                  <Typography sx={{ my: 1 }} variant='body1'>
                    SKU: {value.sku}
                  </Typography>
                  <Typography sx={{ my: 1 }} variant='body1'>
                    Số lượng: {value.quantity}
                  </Typography>
                  <Typography sx={{ my: 1 }} variant='body1'>
                    Giá: {value.price.toLocaleString()}đ
                  </Typography>
                  <Typography sx={{ my: 1 }} variant='body1'>
                    Kích thước: {value.dimensions.length}cm x {value.dimensions.width}cm x {value.dimensions.height}cm
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
