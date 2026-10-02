import VisibilityIcon from '@mui/icons-material/Visibility'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import ActionCell from '~/components/table/ActionCell'
import { ScreenPath } from '~/global/enum'
import { ColumnProps } from '~/global/interfaces/interface'
import StatusTextDiv from './StatusTextDiv'

export const ordersColumn = ({ navigate }: ColumnProps): GridColDef[] => [
  {
    field: 'id',
    headerName: 'No.',
    width: 50,
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
  { field: 'customer', headerName: 'Customer', width: 180 },
  {
    field: 'orderDate',
    headerName: 'Order Date',
    type: 'date',
    width: 130,
    valueGetter: (value) => {
      if (!value) return null

      const date = new Date(value)
      return Number.isNaN(date.getTime()) ? null : date
    }
  },
  {
    field: 'totalAmount',
    headerName: 'Total Amount',
    headerAlign: 'right',
    type: 'number',
    width: 180
  },
  {
    field: 'transactionStatus',
    headerName: 'Transaction Status',
    width: 180,
    headerAlign: 'center',
    align: 'center',
    renderCell: (param: GridRenderCellParams) => <StatusTextDiv status={param.row.transactionStatus} />
  },
  {
    field: 'orderStatus',
    headerName: 'Order Status',
    width: 180,
    headerAlign: 'center',
    align: 'center',
    renderCell: (param: GridRenderCellParams) => <StatusTextDiv status={param.row.orderStatus} />
  },
  {
    field: 'notes',
    headerName: 'Notes',
    width: 280,
    filterable: false
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 100,
    sortable: false,
    filterable: false,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: GridRenderCellParams) => {
      const handleViewButton = (orderId: string) => {
        navigate(ScreenPath.VIEW_ORDER.replace(':orderId', orderId))
      }
      return (
        <ActionCell
          id={params.row.id as number}
          buttons={[{ icon: <VisibilityIcon />, onClick: () => handleViewButton(params.row.id) }]}
        />
      )
    }
  }
]
