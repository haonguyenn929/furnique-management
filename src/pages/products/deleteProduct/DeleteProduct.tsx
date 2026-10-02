/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '~/components/loading/Loading'
import { IProductsProps } from '~/global/interfaces/interface'
import { notifyError, notifySuccess } from '~/global/toastify'
import useProductsApi from '~/hooks/api/useProductsApi'

const DeleteProduct = () => {
  const param = useParams()
  const navigate = useNavigate()
  const productId = param.productId

  const [productData, setProductData] = useState<IProductsProps>()
  const [isLoading, setIsLoading] = useState(false)

  const { getProductById, deleteProductById } = useProductsApi()

  useEffect(() => {
    if (productId) {
      getProductDetail(productId)
    }
  }, [])

  const getProductDetail = async (productId: string) => {
    setIsLoading(true)
    try {
      const product = await getProductById(productId)
      setProductData(product)
    } catch (error) {
      notifyError('An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const deleteProduct = async (productId: string) => {
    setIsLoading(true)
    try {
      await deleteProductById(productId)
      notifySuccess('Deleted successfully')
    } catch (error) {
      notifyError('An error occurred')
    } finally {
      navigate(-1)
    }
  }

  return isLoading ? (
    <Loading />
  ) : (
    <Card
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 3
      }}
    >
      <Typography>Are you sure you want to delete product "{productData?.name}"?</Typography>
      <div>
        <Button
          sx={{
            mx: 1,
            my: 2
          }}
          variant='contained'
          color='error'
          onClick={() => {
            if (productId) deleteProduct(productId)
            else return
          }}
        >
          Confirm
        </Button>
        <Button
          sx={{
            mx: 1,
            my: 2
          }}
          variant='outlined'
          onClick={() => {
            navigate(-1)
          }}
        >
          Cancel
        </Button>
      </div>
    </Card>
  )
}

export default DeleteProduct
