import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
// import { ColumnProps } from '~/global/interfaces/interface'
import Chip from '../../../components/chip/Chip'

export const tasksColumn = (/* { navigate }: ColumnProps */): GridColDef[] => [
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
    field: 'title',
    headerName: 'Task Title',
    flex: 2,
    minWidth: 180,
    filterable: false,
    sortingOrder: ['asc', 'desc']
  },
  {
    field: 'assignee',
    headerName: 'Assignee',
    flex: 1.4,
    minWidth: 140,
    filterable: false,
    sortingOrder: ['asc', 'desc']
  },
  {
    field: 'reporter',
    headerName: 'Reporter',
    flex: 1.4,
    minWidth: 140,
    filterable: false,
    sortingOrder: ['asc', 'desc']
  },
  {
    field: 'dueDate',
    headerName: 'Due Date',
    flex: 1.2,
    minWidth: 120,
    filterable: false,
    sortingOrder: ['asc', 'desc']
  },
  {
    field: 'priority',
    headerName: 'Priority',
    flex: 1,
    minWidth: 120,
    filterable: false,
    sortingOrder: ['asc', 'desc'],
    headerAlign: 'center',
    align: 'center',
    display: 'flex',
    renderCell: (param: GridRenderCellParams) => (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
        <Chip status={param.row.priority} />
      </div>
    )
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    minWidth: 120,
    filterable: false,
    sortingOrder: ['asc', 'desc'],
    headerAlign: 'center',
    align: 'center',
    display: 'flex',
    renderCell: (param: GridRenderCellParams) => (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
        <Chip status={param.row.status} />
      </div>
    )
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
