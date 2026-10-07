import { useEffect, useState } from 'react'
import Loading from '~/components/loading/Loading'
import CommonTable from '~/components/table/CommonTable'
import { IOrder, IOrdersRows } from '~/global/interfaces/ordersInterface'
import useOrdersApi from '~/hooks/api/useOrdersApi'
import { ordersColumn } from './Column'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import useDefaultPageSize from '~/hooks/useDefaultPageSize'

const OrdersTable = () => {
  const { getAllOrders } = useOrdersApi()
  const navigate = useNavigate()
  const defaultPageSize = useDefaultPageSize()
  const [isLoading, setIsLoading] = useState(false)
  const [ordersRows, setOrdersRows] = useState<IOrdersRows[]>([])
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
    getOrdersData(page, pageSize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize])
  const getOrdersData = async (page: number, pageSize: number) => {
    try {
      setIsLoading(true)
      const ordersData = await getAllOrders(page, pageSize)
      const ordersRows = ordersData.docs.map((order: IOrder) => ({
        ...order,
        id: order._id,
        orderDate: dayjs(order.orderDate).format('DD/MM/YYYY'),
        customer: `${order.customer.firstName} ${order.customer.lastName}`
      }))
      setOrdersRows(ordersRows)
      setTotalRows(ordersData.totalDocs)
    } catch (error) {
      console.error()
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <CommonTable
          columns={ordersColumn({ navigate })}
          rows={ordersRows}
          totalRows={totalRows}
          page={page}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </>
  )
}

export default OrdersTable
