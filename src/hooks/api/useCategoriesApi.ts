import { ICategory } from '~/global/interfaces/categoriesInterface'
import useApi from './useApi'
import { useCallback } from 'react'
import { notifyError, notifyLoading } from '~/global/toastify'

const useCategoriesApi = () => {
  const callApi = useApi()
  const rootEndpoint = 'categories/provider'

  const getAllCategories = useCallback(
    async (page = 1, pageSize = 10) => {
      const endpoint = `/${rootEndpoint}`
      try {
        const response = await callApi(
          'get',
          endpoint,
          {},
          {
            page,
            limit: pageSize
          }
        )
        return response.data
      } catch (error) {
        notifyError('An error occurred')
      }
    },
    [callApi]
  )

  const getAllCategoriesForCreateProduct = useCallback(async () => {
    const endpoint = `/${rootEndpoint}`
    try {
      const response = await callApi('get', endpoint)
      return response.data
    } catch (error) {
      notifyError('An error occurred')
    }
  }, [callApi])

  const getCategoryById = useCallback(
    async (categoryId: string) => {
      const endpoint = `/${rootEndpoint}/${categoryId}`
      try {
        const response = await callApi('get', endpoint)
        return response.data
      } catch (error) {
        notifyError('An error occurred')
      }
    },
    [callApi]
  )

  const createCategory = useCallback(
    async (data: ICategory) => {
      const endpoint = `/${rootEndpoint}`
      try {
        notifyLoading()
        const response = await callApi('post', endpoint, {}, {}, data)
        return response
      } catch (error) {
        notifyError('An error occurred')
      }
    },
    [callApi]
  )

  const updateCategory = useCallback(
    async (categoryId: string, data: ICategory) => {
      const endpoint = `/${rootEndpoint}/${categoryId}`
      try {
        notifyLoading()
        const response = await callApi('put', endpoint, {}, {}, data)
        return response
      } catch (error) {
        notifyError('An error occurred')
      }
    },
    [callApi]
  )

  return { getAllCategories, createCategory, updateCategory, getCategoryById, getAllCategoriesForCreateProduct }
}

export default useCategoriesApi
