import { Visibility } from '@mui/icons-material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import Chip from '~/components/chip/Chip'
import ActionsCell from '~/components/table/ActionCell'
import { ScreenPath } from '~/global/enum'
import { ColumnProps } from '~/global/interfaces/interface'

export const consultantsColumn = ({ navigate }: ColumnProps): GridColDef[] => [
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
    field: 'consultant',
    headerName: 'Consultant',
    flex: 1.8,
    minWidth: 160,
    filterable: false,
    sortingOrder: ['asc', 'desc']
  },
  {
    field: 'customer',
    headerName: 'Customer',
    flex: 1.8,
    minWidth: 160,
    filterable: false,
    sortingOrder: ['asc', 'desc']
  },
  {
    field: 'bookingDate',
    headerName: 'Booking Date',
    flex: 1.2,
    minWidth: 130,
    filterable: false,
    sortingOrder: ['asc', 'desc']
  },
  {
    field: 'bookingStatus',
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
        <Chip status={param.row.bookingStatus} />
      </div>
    )
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 100,
    sortable: false,
    filterable: false,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => {
      const handleViewButton = () => {
        navigate(ScreenPath.CONSULTANT_BOOKING_CUSTOMER_INFO.replace(':consultantBookingId', params.row.id.toString()))
      }
      return (
        <ActionsCell
          id={params.row.id as number}
          buttons={[{ icon: <Visibility />, onClick: () => handleViewButton() }]}
        />
      )
    }
  }
]
