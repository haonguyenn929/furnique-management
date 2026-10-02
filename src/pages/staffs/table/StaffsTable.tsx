import { useEffect, useState } from 'react'
import Loading from '~/components/loading/Loading'
import CommonTable from '~/components/table/CommonTable'
import { staffsColumn } from './Column'
import { IStaffRows } from '~/global/interfaces/staffsInterface'
import useStaffsApi from '~/hooks/api/useStaffsApi'
import { notifyError } from '~/global/toastify'
import { useNavigate } from 'react-router-dom'

const StaffsTable = () => {
  const navigate = useNavigate()
  const { getAllStaffs } = useStaffsApi()
  const [isLoading, setIsLoading] = useState(false)
  const [staffsRows, setStaffsRow] = useState<IStaffRows[]>([])
  const [totalRows, setTotalRows] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize)
  }

  useEffect(() => {
    getStaffList(page, pageSize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize])

  const getStaffList = async (page: number, pageSize: number) => {
    try {
      setIsLoading(true)
      const staffsData = await getAllStaffs(page, pageSize)
      const staffsRows = staffsData.docs.map((staff: IStaffRows) => ({
        ...staff,
        id: staff._id
      }))
      setStaffsRow(staffsRows)
      setTotalRows(staffsData.totalDocs)
    } catch (error) {
      notifyError('An error occurred')
    } finally {
      setIsLoading(false)
    }
  }
  return isLoading ? (
    <Loading />
  ) : (
    <CommonTable
      columns={staffsColumn({ navigate })}
      rows={staffsRows}
      totalRows={totalRows}
      page={page}
      pageSize={pageSize}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
    />
  )
}

export default StaffsTable
