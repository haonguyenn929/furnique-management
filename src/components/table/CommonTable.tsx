import { DataGrid } from '@mui/x-data-grid'
import { IDataTableProps } from '~/global/interfaces/interface'
import useDefaultPageSize from '~/hooks/useDefaultPageSize'

const CommonTable = ({
  paginationMode = 'server',
  rows,
  totalRows,
  columns,
  page = 1,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20],
  rowHeight
}: IDataTableProps) => {
  const defaultPageSize = useDefaultPageSize()
  const currentSize = pageSize ?? defaultPageSize

  return (
    <div style={{ width: '100%', maxWidth: '100%', overflowX: 'auto' }}>
      <DataGrid
        rowHeight={rowHeight}
        paginationMode={paginationMode}
        rows={rows}
        rowCount={totalRows}
        columns={columns}
        paginationModel={
          onPageChange && onPageSizeChange
            ? { page: page - 1, pageSize: currentSize }
            : undefined
        }
        initialState={{
          pagination: {
            paginationModel: { page: page - 1, pageSize: currentSize }
          }
        }}
        pageSizeOptions={pageSizeOptions}
        onPaginationModelChange={
          onPageChange && onPageSizeChange
            ? (model) => {
                onPageChange(model.page + 1)
                onPageSizeChange(model.pageSize)
              }
            : undefined
        }
        disableColumnMenu
        sx={{
          backgroundColor: 'var(--white-color)',
          width: '100%',
          minWidth: 600,
          '& .MuiDataGrid-cell--textCenter': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          },
          '& .MuiDataGrid-columnHeader--last .MuiDataGrid-columnSeparator': {
            display: 'none'
          },
          '& .MuiDataGrid-filler': {
            display: 'none'
          }
        }}
      />
    </div>
  )
}

export default CommonTable
