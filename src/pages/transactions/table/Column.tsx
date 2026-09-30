import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import StatusTextDiv from '~/pages/orders/table/StatusTextDiv'

export const transactionsColumn: GridColDef[] = [
  {
    field: 'id',
    headerName: 'STT',
    width: 100,
    filterable: false,
    sortable: false,
    valueGetter: (_value, row, _column, apiRef) => {
      if (!apiRef?.current) return 0
      const page = apiRef.current.state.pagination?.paginationModel?.page ?? 0
      const pageSize = apiRef.current.state.pagination?.paginationModel?.pageSize ?? 10
      const rowIndex = apiRef.current.getRowIndexRelativeToVisibleRows(row.id) ?? 0
      return page * pageSize + rowIndex + 1
    }
  },
  {
    field: 'orderInfo',
    headerName: 'Tên giao dịch',
    width: 450,
    filterable: false,
    valueGetter: (_value, row) => {
      if (row.transaction?.data?.orderCode) return row.transaction.data?.orderCode
      return row.transaction?.orderCode
    }
  },
  {
    field: 'paymentMethod',
    headerName: 'Phương thức thanh toán',
    width: 300,
    filterable: false,
    sortable: false
  },
  {
    field: 'amount',
    headerName: 'Số tiền',
    width: 250,
    filterable: false,
    sortingOrder: ['asc', 'desc'],
    valueFormatter: (value) => {
      const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      })
      return formatter.format(value)
    }
  },
  {
    field: 'transactionStatus',
    headerName: 'Trạng thái giao dịch',
    width: 300,
    renderCell: (param: GridRenderCellParams) => <StatusTextDiv status={param.row.transactionStatus} />
  }
]
