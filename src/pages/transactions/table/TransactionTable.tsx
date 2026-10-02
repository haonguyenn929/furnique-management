import { useEffect, useState } from 'react'
import Loading from '~/components/loading/Loading'
import CommonTable from '~/components/table/CommonTable'
import { ITransaction } from '~/global/interfaces/transactionInterface'
import { notifyError } from '~/global/toastify'
import useTransactionApi from '~/hooks/api/useTransactionApi'
import { transactionsColumn } from './Column'

const TransactionTable = () => {
  const [transactionsRows, setTransactionsRows] = useState<ITransaction[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const { getAllTransactions } = useTransactionApi()

  useEffect(() => {
    getTransactionList(page, pageSize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize)
  }

  const getTransactionList = async (page: number, pageSize: number) => {
    try {
      setIsLoading(true)
      const transactionData = await getAllTransactions(page, pageSize)
      const transactionsRows = transactionData.docs.map((transaction: ITransaction) => ({
        ...transaction,
        id: transaction._id
      }))
      setTransactionsRows(transactionsRows)
      setTotalRows(transactionsRows.totalDocs)
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
      columns={transactionsColumn}
      rows={transactionsRows}
      totalRows={totalRows}
      page={page}
      pageSize={pageSize}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
    />
  )
}

export default TransactionTable
