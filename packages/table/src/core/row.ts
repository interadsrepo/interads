import { Cell, Row, RowData } from '../global'

export interface CoreRow<T extends RowData> {
  id: string
  index: number
  original: T
  depth: number
  _valuesCache: Record<string, unknown>
  _uniqueValuesCache: Record<string, unknown>
  getValue: <V>(columnId: string) => V
  getUniqueValues: <V>(columnId: string) => V[]
  renderValue: <V>(columnId: string) => V
  subRows: Row<T>[]
  getLeafRows: () => Row<T>[]
  originalSubRows?: T[]
  getAllCells: () => Cell<T, unknown>[]
  _getAllCellsByColumnId: () => Record<string, Cell<T, unknown>>
}
