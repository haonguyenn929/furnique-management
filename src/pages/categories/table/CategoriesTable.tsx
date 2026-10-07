import CommonTable from '~/components/table/CommonTable'
import { categoriesColumn } from './Column'
import useCategoriesApi from '~/hooks/api/useCategoriesApi'
import { useEffect, useState } from 'react'
import { ICategoryRows } from '~/global/interfaces/categoriesInterface'
import { ICategoriesProps } from '~/global/interfaces/interface'
import Loading from '~/components/loading/Loading'
import { useNavigate } from 'react-router-dom'
import useDefaultPageSize from '~/hooks/useDefaultPageSize'

const CategoriesTable = () => {
  const { getAllCategories } = useCategoriesApi()
  const defaultPageSize = useDefaultPageSize()
  const [isLoading, setIsLoading] = useState(false)
  const [categoriesRows, setCategoriesRows] = useState<ICategoryRows[]>([])
  const [totalRows, setTotalRows] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(defaultPageSize)

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize)
  }

  const navigate = useNavigate()
  useEffect(() => {
    getCategoriesData(page, pageSize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize])
  const getCategoriesData = async (page: number, pageSize: number) => {
    try {
      setIsLoading(true)
      const categoriesData = await getAllCategories(page, pageSize)
      const categoriesRows = categoriesData.docs.map((row: ICategoriesProps) => ({
        ...row,
        id: row._id
      }))
      setCategoriesRows(categoriesRows)
      setTotalRows(categoriesData.totalDocs)
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
      columns={categoriesColumn({ navigate })}
      rows={categoriesRows}
      totalRows={totalRows}
      page={page}
      pageSize={pageSize}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
    />
  )
}

export default CategoriesTable
