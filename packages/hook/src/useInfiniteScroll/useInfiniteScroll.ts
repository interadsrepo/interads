import * as React from 'react'

export interface UseInfiniteScroll {}

function useInfiniteScroll(cb: () => void, isLoading = false) {
  const observer = React.useRef<IntersectionObserver>()
  return React.useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) {
        return
      }
      if (observer.current) {
        observer.current?.disconnect()
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          cb()
        }
      })

      if (node) {
        observer.current?.observe(node)
      }
    },
    [isLoading, cb],
  )
}

export default useInfiniteScroll
