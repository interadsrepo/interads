import * as React from 'react'

export interface UseDebounce {}
export type UseDebounceReturn = (args: React.ChangeEvent<HTMLInputElement>) => void

function useDebounce(
  callback: (evt: React.ChangeEvent<HTMLInputElement>) => void,
  time = 1000,
): UseDebounceReturn {
  const debounce = React.useCallback(
    (cb: (e: React.ChangeEvent<HTMLInputElement>) => void, delay = 1000) => {
      let timeout: NodeJS.Timeout

      return (args: React.ChangeEvent<HTMLInputElement>) => {
        clearTimeout(timeout)

        timeout = setTimeout(() => {
          cb(args)
        }, delay)
      }
    },
    [],
  )

  return debounce(callback, time)
}

export default useDebounce
