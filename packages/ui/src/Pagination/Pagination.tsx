import * as React from 'react'

import { PaginationProps } from './props'
import IAPagination from './css'

const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(function Pagination(
  props,
  ref,
) {
  const { palette = 'secondary', variant = 'normal', size = 'md' } = props
  return (
    <IAPagination ref={ref} palette={palette} variant={variant} size={size}>
      <p>hai</p>
    </IAPagination>
  )
})

export default Pagination
