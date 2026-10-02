import { ScreenPath } from '~/global/enum'
import Login from '~/pages/auth/Login'
import AddCategory from '~/pages/categories/addCategory/AddCategory'
import Categories from '~/pages/categories/Categories'
import UpdateCategory from '~/pages/categories/updateCategory/UpdateCategory'
import ViewCategoryDetail from '~/pages/categories/viewCategory/ViewCategoryDetail'
import Consultant from '~/pages/consultants/Consultant'
import ViewConsultantBookingDetail from '~/pages/consultants/ViewConsultantBookingDetail/ViewConsultantBookingDetail'
import Dashboard from '~/pages/dashboard/Dashboard'
import Delivery from '~/pages/delivery/Delivery'
import Orders from '~/pages/orders/Orders'
import ViewOrderDetail from '~/pages/orders/viewOrder/ViewOrderDetail'
import AddProduct from '~/pages/products/addProduct/AddProduct'
import DeleteProduct from '~/pages/products/deleteProduct/DeleteProduct'
import ViewProductDetail from '~/pages/products/productDetail/ViewProductDetail'
import Products from '~/pages/products/Products'
import UpdateProduct from '~/pages/products/updateProduct/UpdateProduct'
import AddStaff from '~/pages/staffs/addStaff/AddStaff'
import Staffs from '~/pages/staffs/Staffs'
import UpdateStaff from '~/pages/staffs/updateStaff/UpdateStaff'
import ViewStaffDetail from '~/pages/staffs/viewStaff/ViewStaffDetail'
import Tasks from '~/pages/tasks/Tasks'
import Transactions from '~/pages/transactions/Transactions'
import VisitBooking from '~/pages/visit-booking/VisitBooking'

export const publicRoutes = [{ path: '/', component: Login }]

export const privateRoutes = [
  { path: ScreenPath.DASHBOARD, component: Dashboard, title: 'Dashboard' },
  {
    path: ScreenPath.CATEGORIES,
    component: Categories,
    title: 'Categories'
  },
  {
    path: ScreenPath.ADD_CATEGORIES,
    component: AddCategory,
    title: 'Categories'
  },
  {
    path: ScreenPath.VIEW_CATEGORY,
    component: ViewCategoryDetail,
    title: 'Categories'
  },
  {
    path: ScreenPath.UPDATE_CATEGORY,
    component: UpdateCategory,
    title: 'Categories'
  },
  {
    path: ScreenPath.PRODUCTS,
    component: Products,
    title: 'Products'
  },
  {
    path: ScreenPath.VIEW_PRODUCT,
    component: ViewProductDetail,
    title: 'Products'
  },
  {
    path: ScreenPath.ADD_PRODUCTS,
    component: AddProduct,
    title: 'Products'
  },
  {
    path: ScreenPath.UPDATE_PRODUCT,
    component: UpdateProduct,
    title: 'Products'
  },
  {
    path: ScreenPath.DELETE_PRODUCT,
    component: DeleteProduct,
    title: 'Products'
  },
  {
    path: ScreenPath.ORDERS,
    component: Orders,
    title: 'Orders'
  },
  {
    path: ScreenPath.VIEW_ORDER,
    component: ViewOrderDetail,
    title: 'Orders'
  },
  {
    path: ScreenPath.STAFFS,
    component: Staffs,
    title: 'Staff'
  },
  {
    path: ScreenPath.ADD_STAFF,
    component: AddStaff,
    title: 'Staff'
  },
  {
    path: ScreenPath.VIEW_STAFF,
    component: ViewStaffDetail,
    title: 'Staff'
  },
  {
    path: ScreenPath.TASKS,
    component: Tasks,
    title: 'Tasks'
  },
  {
    path: ScreenPath.UPDATE_STAFF,
    component: UpdateStaff,
    title: 'Staff'
  },
  {
    path: ScreenPath.DELIVERY,
    component: Delivery,
    title: 'Delivery'
  },
  {
    path: ScreenPath.TRANSACTIONS,
    component: Transactions,
    title: 'Transactions'
  },
  {
    path: ScreenPath.CONSULTANT_BOOKING,
    component: Consultant,
    title: 'Consultancy'
  },
  {
    path: ScreenPath.CONSULTANT_BOOKING_CUSTOMER_INFO,
    component: ViewConsultantBookingDetail,
    title: 'Consultancy'
  },
  {
    path: ScreenPath.VISIT_BOOKING,
    component: VisitBooking,
    title: 'Showroom Visits'
  }
]
