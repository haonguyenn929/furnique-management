export enum ScreenPath {
  DASHBOARD = '/dashboard',
  CATEGORIES = '/categories',
  ADD_CATEGORIES = '/categories/create',
  VIEW_CATEGORY = '/cateogies/detail/:categoryId',
  UPDATE_CATEGORY = '/categories/update/:categoryId',
  PRODUCTS = '/products',
  ADD_PRODUCTS = '/products/create',
  VIEW_PRODUCT = '/products/detail/:productId',
  ORDERS = '/orders',
  VIEW_ORDER = '/orders/detail/:orderId',
  STAFFS = '/staffs',
  ADD_STAFF = '/staffs/create',
  VIEW_STAFF = '/staff/detail/:staffId',
  UPDATE_STAFF = '/staff/update/:staffId',
  UPDATE_PRODUCT = '/products/update/:productId',
  DELETE_PRODUCT = '/products/delete/:productId',
  TASKS = '/tasks',
  DELIVERY = '/delivery',
  TRANSACTIONS = '/transactions',
  CONSULTANT_BOOKING = '/consultant-booking',
  CONSULTANT_BOOKING_CUSTOMER_INFO = '/consultant-booking/:consultantBookingId',
  VISIT_BOOKING = '/visit-showroom-booking'
}

export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED'
}

export enum OrderStatus {
  DELETED = 'DELETED',
  CANCELED = 'CANCELED',
  COMPLETED = 'COMPLETED',
  DELIVERING = 'DELIVERING',
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED'
}

export enum TransactionStatus {
  DRAFT = 'DRAFT',
  CAPTURED = 'CAPTURED',
  ERROR = 'ERROR',
  CANCELED = 'CANCELED',
  DELETED = 'DELETED',
  REFUNDED = 'REFUNDED'
}

export enum StaffRoles {
  STAFF = 'STAFF',
  CONSULTANT_STAFF = 'CONSULTANT_STAFF',
  DELIVERY_STAFF = 'DELIVERY_STAFF',
  ADMIN = 'ADMIN'
}


export enum Priority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW'
}

export enum TaskType {
  SHIPPING = 'SHIPPING',
  CONSULTANT = 'CONSULTANT',
  CHORE = 'CHORE'
}

export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  DELETED = 'DELETED'
}

export enum StaffStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export enum PeriodType {
  DAY = 'DAY',
  MONTH = 'MONTH',
  YEAR = 'YEAR'
}

export enum UserRole {
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
  DELIVERY_STAFF = 'DELIVERY_STAFF',
  CONSULTANT_STAFF = 'CONSULTANT_STAFF',
  CUSTOMER = 'CUSTOMER'
}
