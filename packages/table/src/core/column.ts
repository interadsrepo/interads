import { AccessorFn, Column, ColumnDef, RowData } from '../global'

export interface CoreColumn<TData extends RowData, TValue> {
  id: string
  depth: number
  accessorFn?: AccessorFn<TData, TValue>
  columnDef: ColumnDef<TData, TValue>
  columns: Column<TData, TValue>[]
  parent?: Column<TData, TValue>
  getFlatColumns: () => Column<TData, TValue>[]
  getLeafColumns: () => Column<TData, TValue>[]
}
