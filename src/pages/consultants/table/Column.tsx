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
    width: 150,
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
    width: 250,
    filterable: false,
    sortingOrder: ['asc', 'desc']
  },
  {
    field: 'customer',
    headerName: 'Customer',
    width: 250,
    filterable: false,
    sortingOrder: ['asc', 'desc']
  },
  {
    field: 'bookingDate',
    headerName: 'Booking Date',
    width: 250,
    filterable: false,
    sortingOrder: ['asc', 'desc']
  },
  {
    field: 'bookingStatus',
    headerName: 'Status',
    width: 180,
    filterable: false,
    sortingOrder: ['asc', 'desc'],
    renderCell: (param: GridRenderCellParams) => <Chip status={param.row.bookingStatus} />
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 180,
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
