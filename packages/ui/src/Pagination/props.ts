import { MaterialSize, PaletteType } from '../constant'

type PaginationSize = Exclude<MaterialSize, 'xs' | 'xl'>

export interface PaginationPage {
  page: number
  onChangePage: (page: number) => void
  perPage: number
  perPageOption?: number[]
  onChangePerPage?: (perPage: number) => void
}

export interface PaginationProps extends PaginationPage {
  palette?: PaletteType
  size?: PaginationSize
  variant?: 'normal' | 'outline' | String
}
