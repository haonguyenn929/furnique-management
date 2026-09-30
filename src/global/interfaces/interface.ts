/* eslint-disable @typescript-eslint/no-explicit-any */
import { SxProps } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import React, { ChangeEvent, ReactNode } from 'react'
import { Control, FieldPath, FieldValues } from 'react-hook-form'
import { ILoginFormProps } from '~/pages/auth/types/LoginForm'
import { IVariant } from './productInterface'

export interface ILayoutProps {
  children: ReactNode
  title?: string
}

export interface IFormInputProps<TFieldValues extends FieldValues = any> {
  name: FieldPath<TFieldValues> | (string & {})
  label?: string
  control: Control<TFieldValues, any>
  error?: string
  type?: 'password' | 'date' | 'checkbox' | 'radio' | 'email' | 'hidden' | 'number' | 'text'
  sx?: SxProps
  variant?: 'outlined' | 'standard' | 'filled'
  multiline?: boolean
  rows?: number
  value?: string
  placeholder?: string
  defaultValues?: any
  disabled?: boolean
  required?: boolean
  startIcon?: ReactNode
  endIcon?: ReactNode
}
export interface IDropdownOption {
  label: string
  value: string
}

export interface IFormInputDropdownProps extends IFormInputProps {
  options: IDropdownOption[]
}

export interface ICheckboxOption {
  label: string
  value: any
}

export interface ICheckboxGroupProps<TFieldValues extends FieldValues = any> {
  name?: FieldPath<TFieldValues> | (string & {})
  label: string
  options: ICheckboxOption[]
  defaultValues?: any[]
  control?: Control<TFieldValues, any>
}

export interface IRadioGroupProps {
  name: string
  label: string
  options: {
    label: string
    value: string | number
  }[]
  defaultValue?: string | number
  onChange: (event: ChangeEvent<HTMLInputElement>, value: string | number) => void
  sx?: SxProps
  disabled?: boolean
}

export interface ICustomButtonProps {
  variant: 'contained' | 'outlined'
  name: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  icon?: React.ReactNode
  sx?: SxProps
  type: 'button' | 'submit' | 'reset'
  disable?: boolean
}

export interface IUserInfoProps {
  _id: string
  staffCode: string
  email: string
  password: string
  avatar: string
  role: string
  firstName: string
  lastName: string
}

export interface IUser {
  name: string
  sub: string
  role: string
  iat: number
  exp: number
}

export interface IAuthProviderProps {
  children: ReactNode
}
export interface IAuthContextProps {
  user: IUser | undefined
  idToken: string | null
  login: ({ email, password }: ILoginFormProps) => Promise<void>
  logout: () => Promise<void>
  refreshToken: () => Promise<void>
}

export interface IMainLayoutProps {
  Component: React.ComponentType
}

export interface ISidebarProps {
  mainContainerRef: React.RefObject<HTMLDivElement | null>
}

export interface IDataTableProps {
  rows: any[]
  columns: GridColDef[]
  totalRows?: number
  paginationMode?: 'client' | 'server'
  page?: number
  pageSize?: number
  onPageChange?: (newPage: number) => void
  onPageSizeChange?: (newPageSize: number) => void
  pageSizeOptions?: number[]
}

export interface IStatusCategoriesProps {
  outOfStock?: boolean
  published?: boolean
  draft?: boolean
}

export interface IStatusProductProps {
  active?: boolean
  outOfStock?: boolean
  published?: boolean
  draft?: boolean
}

export interface IStatusOrderProps {
  deleted?: boolean
  delivering?: boolean
  canceled?: boolean
  completed?: boolean
  pending?: boolean
  confirmed?: boolean
  draft?: boolean
}

export interface ICategoriesProps {
  _id?: string
  image?: string
  name: string
  description: string
}

export interface IUploadFileButtonProps {
  onFileChange: (fileUrl: string | null) => void
}

export interface IProductsProps {
  name: string
  description: string
  images: string[]
  modelUrl?: string
  arPlacement?: 'floor' | 'wall'
  brand: string
  variants: IVariant[]
  categories: string[]
}

export interface IAddProductProps {
  name: string
  description: string
  images: string[]
  modelUrl?: string
  brand: string
  variants: any
  categories: string[]
}

export interface ColumnProps {
  navigate: (path: string) => void
}

export interface IPagination<T> {
  docs: T[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number
  nextPage: number
}

export interface DashboardStatus {
  increase?: boolean
  decrease?: boolean
}

export interface CardDashboardProps {
  icon: ReactNode
  title: string
  numberReport: string
  percentage: number
  status: boolean
}

export interface TransactionStatus {
  error?: boolean
  captured?: boolean
  canceled?: boolean
  deleted?: boolean
  draft?: boolean
}
