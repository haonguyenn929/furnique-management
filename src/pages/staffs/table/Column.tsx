import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import ActionCell from '~/components/table/ActionCell'
import { ScreenPath } from '~/global/enum'
import { ColumnProps } from '~/global/interfaces/interface'

export const staffsColumn = ({ navigate }: ColumnProps): GridColDef[] => [
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
    field: 'staffCode',
    headerName: 'Staff Code',
    flex: 1,
    minWidth: 110,
    filterable: false,
    sortingOrder: ['asc', 'desc']
  },
  {
    field: 'lastName',
    headerName: 'Last Name',
    flex: 1.3,
    minWidth: 120,
    filterable: false,
    sortingOrder: ['asc', 'desc']
  },
  {
    field: 'firstName',
    headerName: 'First Name',
    flex: 1.3,
    minWidth: 120,
    filterable: false,
    sortingOrder: ['asc', 'desc']
  },
  { field: 'email', headerName: 'Email', flex: 1.8, minWidth: 180 },
  { field: 'phone', headerName: 'Phone Number', flex: 1.2, minWidth: 120 },
  { field: 'status', headerName: 'Status', flex: 1, minWidth: 110, headerAlign: 'center', align: 'center' },
  {
    field: 'role',
    headerName: 'Role',
    flex: 1,
    minWidth: 120
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 110,
    sortable: false,
    filterable: false,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: GridRenderCellParams) => {
      const handleViewButton = (staffId: string) => {
        navigate(ScreenPath.VIEW_STAFF.replace(':staffId', staffId))
      }
      const handleEditButton = (staffId: string) => {
        navigate(ScreenPath.UPDATE_STAFF.replace(':staffId', staffId))
      }
      return (
        <ActionCell
          id={params.row.id as number}
          buttons={[
            { icon: <EditIcon />, onClick: () => handleEditButton(params.row.id) },
            { icon: <VisibilityIcon />, onClick: () => handleViewButton(params.row.id) }
          ]}
        />
      )
    }
  }
]
