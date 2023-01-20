import styled from 'styled-components'
import { PaginationProps } from './props'

type IAPaginationProps = Required<Pick<PaginationProps, 'palette' | 'size' | 'variant'>>
const IAPagination = styled('div')<IAPaginationProps>``

export default IAPagination
