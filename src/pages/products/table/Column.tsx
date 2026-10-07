// import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import ActionCell from '~/components/table/ActionCell'
import StatusTextDiv from './StatusTextDiv'
import { ScreenPath } from '~/global/enum'
import { ColumnProps } from '~/global/interfaces/interface'

export const productsColumn = ({ navigate }: ColumnProps): GridColDef[] => [
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
    field: 'name',
    headerName: 'Product',
    flex: 2,
    minWidth: 200,
    filterable: false,
    sortingOrder: ['asc', 'desc']
  },
  { field: 'categories', headerName: 'Category', flex: 1.2, minWidth: 150 },
  { field: 'description', headerName: 'Description', flex: 1.8, minWidth: 180 },
  {
    field: 'brand',
    headerName: 'Brand',
    flex: 0.9,
    minWidth: 100
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    minWidth: 120,
    headerAlign: 'center',
    align: 'center',
    display: 'flex',
    renderCell: (param: GridRenderCellParams) => (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
        <StatusTextDiv status={param.row.status} />
      </div>
    )
  },
  {
    field: 'createdAt',
    headerName: 'Created Date',
    type: 'date',
    flex: 1,
    minWidth: 120,
    valueGetter: (value) => {
      if (!value) return null

      const date = new Date(value)
      return Number.isNaN(date.getTime()) ? null : date
    }
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
      const handleViewButton = (productId: string) => {
        navigate(ScreenPath.VIEW_PRODUCT.replace(':productId', productId))
      }
      const handleUpdateButton = (productId: string) => {
        navigate(ScreenPath.UPDATE_PRODUCT.replace(':productId', productId))
      }
      /* const handleDeleteButton = (productId: string) => {
        navigate(ScreenPath.DELETE_PRODUCT.replace(':productId', productId))
      } */
      return (
        <ActionCell
          id={params.row.id as number}
          buttons={[
            { icon: <EditIcon />, onClick: () => handleUpdateButton(params.row.id) },
            { icon: <VisibilityIcon />, onClick: () => handleViewButton(params.row.id) } /* ,
            {
              icon: <DeleteIcon sx={{ color: 'var(--red-color)' }} />,
              onClick: () => handleDeleteButton(params.row.id)
            } */
          ]}
        />
      )
    }
  }
]
