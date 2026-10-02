import { Visibility } from '@mui/icons-material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import Chip from '~/components/chip/Chip'
import ActionsCell from '~/components/table/ActionCell'
import { ScreenPath } from '~/global/enum'
import { ColumnProps } from '~/global/interfaces/interface'

export const deliveriesColumn = ({ navigate }: ColumnProps): GridColDef[] => [
  {
    field: 'id',
    headerName: 'No.',
    width: 80,
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
    field: 'title',
    headerName: 'Task Title',
    width: 210,
    filterable: false,
    sortingOrder: ['asc', 'desc']
  },
  {
    field: 'assignee',
    headerName: 'Assignee',
    width: 180,
    filterable: false,
    sortingOrder: ['asc', 'desc']
  },
  {
    field: 'reporter',
    headerName: 'Reporter',
    width: 200,
    filterable: false,
    sortingOrder: ['asc', 'desc']
  },
  {
    field: 'dueDate',
    headerName: 'Due Date',
    width: 175,
    filterable: false,
    sortingOrder: ['asc', 'desc']
  },
  {
    field: 'priority',
    headerName: 'Priority',
    width: 150,
    filterable: false,
    sortingOrder: ['asc', 'desc'],
    renderCell: (param: GridRenderCellParams) => <Chip status={param.row.priority} />
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 150,
    filterable: false,
    sortingOrder: ['asc', 'desc'],
    renderCell: (param: GridRenderCellParams) => <Chip status={param.row.status} />
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    sortable: false,
    filterable: false,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => {
      const handleViewButton = (orderId: string) => {
        navigate(ScreenPath.VIEW_ORDER.replace(':orderId', orderId))
      }
      return (
        <ActionsCell
          id={params.row.id as number}
          buttons={[{ icon: <Visibility />, onClick: () => handleViewButton(params.row.orderId) }]}
        />
      )
    }
  }
]
