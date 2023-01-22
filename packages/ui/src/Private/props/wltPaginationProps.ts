import { PaletteType } from '../../constant'

export interface WLTPaginationPage {
  total: number
  page: number
  onChangePage: (page: number) => void
  perPage: number
}

export interface WLTPaginationProps extends WLTPaginationPage {
  palette?: PaletteType
  className?: string
}
