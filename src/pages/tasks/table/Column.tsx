import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
// import { ColumnProps } from '~/global/interfaces/interface'
import Chip from '../../../components/chip/Chip'

export const tasksColumn = (/* { navigate }: ColumnProps */): GridColDef[] => [
  {
    field: 'id',
    headerName: 'No.',
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
    field: 'title',
    headerName: 'Task Title',
    width: 250,
    filterable: false,
    sortingOrder: ['asc', 'desc']
  },
  {
    field: 'assignee',
    headerName: 'Assignee',
    width: 200,
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
    width: 200,
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
    width: 180,
    filterable: false,
    sortingOrder: ['asc', 'desc'],
    renderCell: (param: GridRenderCellParams) => <Chip status={param.row.status} />
  }
  // {
  //   field: 'actions',
  //   headerName: 'Actions',
  //   width: 180,
  //   sortable: false,
  //   filterable: false,
  //   headerAlign: 'center',
  //   align: 'center',
  //   renderCell: (params) => {
  //     const handleViewButton = (taskId: string) => {
  //       navigate(taskId)
  //     }
  //     return (
  //       <ActionsCell
  //         id={params.row.id as number}
  //         buttons={[
  //           // { icon: <Edit />, onClick: () => handleViewButton(params.row.id) },
  //           { icon: <Visibility />, onClick: () => handleViewButton(params.row.id) }
  //         ]}
  //       />
  //     )
  //   }
  // }
]
