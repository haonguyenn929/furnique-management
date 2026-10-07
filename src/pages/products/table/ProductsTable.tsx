import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import Loading from '~/components/loading/Loading'
import CommonTable from '~/components/table/CommonTable'
import { IProduct, IProductRows } from '~/global/interfaces/productInterface'
import useProductsApi from '~/hooks/api/useProductsApi'
import { productsColumn } from './Column'
import { useNavigate } from 'react-router-dom'

import useDefaultPageSize from '~/hooks/useDefaultPageSize'

const ProductsTable = () => {
  const { getAllProducts } = useProductsApi()
  const navigate = useNavigate()
  const defaultPageSize = useDefaultPageSize()
  const [isLoading, setIsLoading] = useState(false)
  const [productRows, setProductRows] = useState<IProductRows[]>([])
  const [totalRows, setTotalRows] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(defaultPageSize)

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize)
  }
  useEffect(() => {
    getProductsData(page, pageSize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize])
  const getProductsData = async (page: number, pageSize: number) => {
    try {
      setIsLoading(true)
      const productsData = await getAllProducts(page, pageSize)
      const productRows = productsData.docs.map((product: IProduct) => ({
        ...product,
        id: product._id,
        categories: product.categories?.length > 0 ? product.categories[0].name : '',
        createdAt: dayjs(product.createdAt).format('DD/MM/YYYY')
      }))

      setProductRows(productRows)
      setTotalRows(productsData.totalDocs)
    } catch (error) {
      console.error()
    } finally {
      setIsLoading(false)
    }
  }

  return isLoading ? (
    <Loading />
  ) : (
    <CommonTable
      columns={productsColumn({ navigate })}
      rows={productRows}
      totalRows={totalRows}
      page={page}
      pageSize={pageSize}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
      pageSizeOptions={[10, 20]}
    />
  )
}

export default ProductsTable
