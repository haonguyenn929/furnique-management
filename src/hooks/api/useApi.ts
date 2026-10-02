import { AxiosError, AxiosResponse } from 'axios'
import useAuth from '../useAuth'
import { notifyError } from '~/global/toastify'
import { useCallback } from 'react'
import { get, post, put, remove, patch } from '~/utils/apiCaller'

const useApi = () => {
  const { idToken, logout } = useAuth()

  const handleError = useCallback(
    async (error: unknown) => {
      let message = ''
      if (error instanceof AxiosError) {
        const errorStatusCode = error.response?.status
        if (errorStatusCode === 401) {
          await logout()
        }

        if (errorStatusCode === 403) {
          message = 'Access denied'
        }
      }
      if (message) {
        notifyError(message)
      }
    },
    [logout]
  )
  /**
   * Function Documentation: `callApi`
   *
   * The `callApi` function is an asynchronous function that provides a convenient way to make API calls using different HTTP methods (GET, POST, PUT, DELETE). It accepts several parameters to customize the request and returns the response data from the API.
   *
   * @param {string} method - The HTTP method to be used for the API call. It can be one of the following values: 'get', 'post', 'put', 'delete'.
   * @param {string} endpoint - The endpoint or URL where the API call should be made.
   * @param {object} headers - (optional) Additional headers to be included in the API request. Default is an empty object.
   * @param {object} params - (optional) Query parameters to be included in the API request. Default is an empty object.
   * @param {object} body - (optional) Request body data to be included in the API request. Default is an empty object.
   *
   * @returns {Promise<any>} - A promise that resolves to the response data from the API.
   * @throws {Error} - If an error occurs during the API call.
   */
  const callApi = useCallback(
    async (
      method: 'get' | 'post' | 'put' | 'delete' | 'patch',
      endpoint: string,
      headers: object = {},
      params: object = {},
      body: object = {}
    ) => {
      const headersDefault = { accept: 'application/json', Authorization: `Bearer ${idToken}` }
      Object.assign(headersDefault, headers)
      let response: AxiosResponse
      try {
        switch (method) {
          case 'get': {
            response = await get(endpoint, params, headersDefault)
            break
          }
          case 'post': {
            response = await post(endpoint, body, params, headersDefault)
            break
          }
          case 'put': {
            response = await put(endpoint, body, params, headersDefault)
            break
          }
          case 'delete': {
            response = await remove(endpoint, body, params, headersDefault)
            break
          }
          case 'patch': {
            response = await patch(endpoint, body, params, headersDefault)
            break
          }
        }
        return response.data
      } catch (error) {
        handleError(error)
      }
    },
    [handleError, idToken]
  )

  return callApi
}

export default useApi
