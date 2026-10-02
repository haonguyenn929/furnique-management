import { EventAvailable, GridViewOutlined, LocalShipping, SupportAgent, Task } from '@mui/icons-material'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import CategoryIcon from '@mui/icons-material/Category'
import InventoryIcon from '@mui/icons-material/Inventory'
import ListAltIcon from '@mui/icons-material/ListAlt'
import PeopleIcon from '@mui/icons-material/People'
import { UserRole } from '~/global/enum'
// export const optionsSidebar = [{ id: 1, text: 'Dashboard', link: 'dashboard', icon: GridViewOutlined }]
//TODO: make consultant route
const adminSidebar = [
  { id: 1, text: 'Dashboard', link: 'dashboard', icon: GridViewOutlined },
  { id: 2, text: 'Categories', link: 'categories', icon: CategoryIcon },
  { id: 3, text: 'Products', link: 'products', icon: InventoryIcon },
  { id: 4, text: 'Orders', link: 'orders', icon: ListAltIcon },
  { id: 5, text: 'Staff', link: 'staffs', icon: PeopleIcon },
  { id: 6, text: 'Tasks', link: 'tasks', icon: Task },
  { id: 7, text: 'Transactions', link: 'transactions', icon: AccountBalanceWalletIcon },
  { id: 8, text: 'Delivery', link: 'delivery', icon: LocalShipping },
  { id: 9, text: 'Consultancy', link: 'consultant-booking', icon: SupportAgent },
  { id: 10, text: 'Showroom Visits', link: 'visit-showroom-booking', icon: EventAvailable }
]

const staffSidebar = [
  { id: 1, text: 'Categories', link: 'categories', icon: CategoryIcon },
  { id: 2, text: 'Products', link: 'products', icon: InventoryIcon },
  { id: 3, text: 'Orders', link: 'orders', icon: ListAltIcon },
  { id: 4, text: 'Tasks', link: 'tasks', icon: Task },
  { id: 5, text: 'Delivery', link: 'delivery', icon: LocalShipping },
  { id: 6, text: 'Consultancy', link: 'consultant-booking', icon: SupportAgent }
]

const deliverySidebar = [{ id: 1, text: 'Delivery', link: 'delivery', icon: LocalShipping }]

const consultantSidebar = [{ id: 1, text: 'Consultancy', link: 'consultant-booking', icon: SupportAgent }]

export const optionSidebarAuth = (role: string | undefined) => {
  switch (role) {
    case UserRole.ADMIN:
      return adminSidebar
    case UserRole.DELIVERY_STAFF:
      return deliverySidebar
    case UserRole.CONSULTANT_STAFF:
      return consultantSidebar
    case UserRole.STAFF:
      return staffSidebar
    default:
      return []
  }
}
