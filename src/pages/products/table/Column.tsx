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
    headerName: 'STT',
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
  {
    field: 'name',
    headerName: 'Sản phẩm',
    width: 220,
    filterable: false,
    sortingOrder: ['asc', 'desc']
  },
  { field: 'categories', headerName: 'Phân loại', width: 180 },
  { field: 'description', headerName: 'Mô tả', width: 280 },
  {
    field: 'brand',
    headerName: 'Hãng',
    width: 100
  },
  {
    field: 'status',
    headerName: 'Trạng thái',
    width: 150,
    renderCell: (param: GridRenderCellParams) => <StatusTextDiv status={param.row.status} />
  },
  {
    field: 'createdAt',
    headerName: 'Ngày nhập',
    type: 'date',
    width: 120
  },
  {
    field: 'actions',
    headerName: 'Thao tác',
    width: 200,
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
