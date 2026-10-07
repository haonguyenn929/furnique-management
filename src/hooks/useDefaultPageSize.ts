import { useState } from 'react'

/**
 * Returns default page size based on screen size:
 * - 20 for extra large / desktop screens (e.g. >= 1600px width, or >= 1500px width and >= 850px height)
 * - 10 for standard / smaller screens
 */
export const getDefaultPageSize = (): number => {
  if (typeof window === 'undefined') return 10
  const isLargeScreen =
    window.innerWidth >= 1600 || (window.innerWidth >= 1500 && window.innerHeight >= 850)
  return isLargeScreen ? 20 : 10
}

export const useDefaultPageSize = (): number => {
  const [defaultPageSize] = useState<number>(() => getDefaultPageSize())
  return defaultPageSize
}

export default useDefaultPageSize
