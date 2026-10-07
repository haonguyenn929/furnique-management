import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import CardProducts from '../components/CardProducts'

export const orderListColumns: GridColDef[] = [
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
    field: 'products',
    headerName: 'Product',
    flex: 3,
    minWidth: 260,
    renderCell: (param: GridRenderCellParams) => (
      <CardProducts name={param.row.products} image={param.row.image} variant={param.row.variant} />
    )
  },
  { field: 'sku', headerName: 'SKU', flex: 1, minWidth: 100, sortable: false },
  { field: 'orderDate', headerName: 'Order Date', flex: 1.2, minWidth: 130 },
  {
    field: 'quantity',
    headerName: 'Quantity',
    headerAlign: 'right',
    type: 'number',
    flex: 0.8,
    minWidth: 80,
    sortable: false
  },
  {
    field: 'price',
    headerName: 'Unit Price',
    headerAlign: 'right',
    type: 'number',
    flex: 1.2,
    minWidth: 110,
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
    headerName: 'Total',
    headerAlign: 'right',
    type: 'number',
    flex: 1.2,
    minWidth: 110,
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
