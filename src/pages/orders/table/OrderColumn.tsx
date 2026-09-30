import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import CardProducts from '../components/CardProducts'

export const orderListColumns: GridColDef[] = [
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
    field: 'products',
    headerName: 'Sản phẩm',
    width: 250,
    renderCell: (param: GridRenderCellParams) => (
      <CardProducts name={param.row.products} image={param.row.image} variant={param.row.variant} />
    )
  },
  { field: 'sku', headerName: 'SKU', width: 110, sortable: false },
  { field: 'orderDate', headerName: 'Ngày đặt', width: 170 },
  {
    field: 'quantity',
    headerName: 'Số lượng',
    headerAlign: 'right',
    type: 'number',
    width: 80,
    sortable: false
  },
  {
    field: 'price',
    headerName: 'Giá tiền',
    headerAlign: 'right',
    type: 'number',
    width: 90,
    sortable: false,
    valueFormatter: (value: number) => {
      if (value == null) return ''
      const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      })
      return formatter.format(value)
    }
  },
  {
    field: 'totalAmount',
    headerName: 'Tổng cộng',
    headerAlign: 'right',
    type: 'number',
    width: 100,
    sortable: false,
    valueFormatter: (value: number) => {
      if (value == null) return ''
      const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      })
      return formatter.format(value)
    }
  }
]
