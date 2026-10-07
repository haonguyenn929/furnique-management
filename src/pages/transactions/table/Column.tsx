import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import StatusTextDiv from '~/pages/orders/table/StatusTextDiv'

export const transactionsColumn: GridColDef[] = [
  {
    field: 'id',
    headerName: 'No.',
    width: 60,
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
    headerName: 'Transaction Details',
    flex: 2,
    minWidth: 220,
    filterable: false,
    valueGetter: (_value, row) => {
      if (row.transaction?.data?.orderCode) return row.transaction.data?.orderCode
      return row.transaction?.orderCode
    }
  },
  {
    field: 'paymentMethod',
    headerName: 'Payment Method',
    flex: 1.2,
    minWidth: 150,
    filterable: false,
    sortable: false
  },
  {
    field: 'amount',
    headerName: 'Amount',
    flex: 1.2,
    minWidth: 140,
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
    headerName: 'Transaction Status',
    flex: 1.2,
    minWidth: 150,
    headerAlign: 'center',
    align: 'center',
    display: 'flex',
    renderCell: (param: GridRenderCellParams) => (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
        <StatusTextDiv status={param.row.transactionStatus} />
      </div>
    )
  }
]
