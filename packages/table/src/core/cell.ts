import { Cell, Column, Getter, Row, RowData, Table } from '../global'

export interface CellContext<T extends RowData, V> {
  table: Table<T>
  column: Column<T, V>
  row: Row<T>
  cell: Cell<T, V>
  getValue: Getter<V>
  renderValue: Getter<V | null>
}

export interface CoreCell<T extends RowData, V> {
  id: string
  getValue: CellContext<T, V>['getValue']
  renderValue: CellContext<T, V>['renderValue']
  row: Row<T>
  column: Column<T, V>
  getContext: () => CellContext<T, V>
}
