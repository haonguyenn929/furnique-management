// import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { GridColDef } from '@mui/x-data-grid'
import ActionCell from '~/components/table/ActionCell'
import { ScreenPath } from '~/global/enum'
import { ColumnProps } from '~/global/interfaces/interface'

export const categoriesColumn = ({ navigate }: ColumnProps): GridColDef[] => [
  {
    field: 'id',
    headerName: 'No.',
    width: 70,
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
    field: 'name',
    headerName: 'Category Name',
    flex: 2,
    minWidth: 220,
    filterable: false,
    sortingOrder: ['asc', 'desc']
  },
  {
    field: 'description',
    headerName: 'Description',
    flex: 3,
    minWidth: 260,
    filterable: false
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 120,
    sortable: false,
    filterable: false,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => {
      const handleUpdateButton = (categoryId: string) => {
        navigate(ScreenPath.UPDATE_CATEGORY.replace(':categoryId', categoryId))
      }
      const handleViewButton = (categoryId: string) => {
        navigate(ScreenPath.VIEW_CATEGORY.replace(':categoryId', categoryId))
      }
      return (
        <ActionCell
          id={params.row.id as number}
          buttons={[
            { icon: <EditIcon />, onClick: () => handleUpdateButton(params.row.id) },
            { icon: <VisibilityIcon />, onClick: () => handleViewButton(params.row.id) }
          ]}
        />
      )
    }
  }
]
