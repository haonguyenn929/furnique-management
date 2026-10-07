import { useEffect, useState } from 'react'
import Loading from '~/components/loading/Loading'
import CommonTable from '~/components/table/CommonTable'
import { deliveriesColumn } from './Column'
import { useNavigate } from 'react-router-dom'
import { ITaskRows, ITasksProps } from '~/global/interfaces/tasksInterface'
import useTasksApi from '~/hooks/api/useTasksApi'
import moment from 'moment'
import useDefaultPageSize from '~/hooks/useDefaultPageSize'

const DeliveryTable = () => {
  const defaultPageSize = useDefaultPageSize()
  const [isLoading, setIsLoading] = useState(false)
  const [tasksRows, setTasksRows] = useState<ITaskRows[]>([])
  const [totalRows, setTotalRows] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(defaultPageSize)

  const { getAllTasksForDelivery } = useTasksApi()

  const navigate = useNavigate()

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize)
  }

  useEffect(() => {
    getTasksData(page, pageSize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize])

  const getTasksData = async (page: number, pageSize: number) => {
    try {
      setIsLoading(true)
      const tasksData = await getAllTasksForDelivery(page, pageSize)
      const tasksRows = tasksData.docs.map((row: ITasksProps) => ({
        ...row,
        assignee: `${row.assignee.firstName} ${row.assignee.lastName}`,
        reporter: `${row.reporter.firstName} ${row.reporter.lastName}`,
        dueDate: moment(row.dueDate).format('DD/MM/yyyy'),
        id: row._id
      }))
      setTasksRows(tasksRows)
      setTotalRows(tasksData.totalDocs)
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
      columns={deliveriesColumn({ navigate })}
      rows={tasksRows}
      totalRows={totalRows}
      page={page}
      pageSize={pageSize}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
    />
  )
}

export default DeliveryTable
