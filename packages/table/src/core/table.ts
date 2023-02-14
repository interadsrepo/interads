import {
  Column,
  ColumnDef,
  InitialTableState,
  RequiredKeys,
  Row,
  RowData,
  RowModel,
  Table,
  TableMeta,
  TableOptions,
  TableOptionsResolved,
  TableState,
  Updater,
} from '../global'

export interface CoreTableState {}

export interface TableFeature {
  getDefaultOptions?: (table: any) => any
  getInitialState?: (initialState?: InitialTableState) => any
  createTable?: (table: any) => any
  getDefaultColumnDef?: () => any
  createColumn?: (column: any, table: any) => any
  createHeader?: (column: any, table: any) => any
  createCell?: (cell: any, column: any, row: any, table: any) => any
  createRow?: (row: any, table: any) => any
}

export interface CoreInstance<T extends RowData> {
  initialState: TableState
  reset: () => void
  options: RequiredKeys<TableOptionsResolved<T>, 'state'>
  setOptions: (newOptions: Updater<TableOptionsResolved<T>>) => void
  getState: () => TableState
  setState: (updater: Updater<TableState>) => void
  _features: readonly TableFeature[]
  _queue: (cb: () => void) => void
  _getRowId: (_: T, index: number, parent?: Row<T>) => string
  getCoreRowModel: () => RowModel<T>
  _getCoreRowModel?: () => RowModel<T>
  getRowModel: () => RowModel<T>
  getRow: (id: string) => Row<T>
  _getDefaultColumnDef: () => Partial<ColumnDef<T, unknown>>
  _getColumnDefs: () => ColumnDef<T, unknown>[]
  _getAllFlatColumnsById: () => Record<string, Column<T, unknown>>
  getAllColumns: () => Column<T, unknown>[]
  getAllFlatColumns: () => Column<T, unknown>[]
  getAllLeafColumns: () => Column<T, unknown>[]
  getColumn: (columnId: string) => Column<T, unknown> | undefined
}

export interface CoreOptions<T extends RowData> {
  data: T[]
  state: Partial<TableState>
  onStateChange: (updater: Updater<TableState>) => void
  debugAll?: boolean
  debugTable?: boolean
  debugHeaders?: boolean
  debugColumns?: boolean
  debugRows?: boolean
  initialState?: InitialTableState
  autoResetAll?: boolean
  mergeOptions?: (
    defaultOptions: TableOptions<T>,
    options: Partial<TableOptions<T>>,
  ) => TableOptions<T>
  meta?: TableMeta
  getCoreRowModel: (table: Table<any>) => () => RowModel<any>
  getSubRows?: (originalRow: T, index: number) => undefined | T[]
  getRowId?: (originalRow: T, index: number, parent?: Row<T>) => string
  columns: ColumnDef<T, any>[]
  defaultColumn?: Partial<ColumnDef<T, unknown>>
  renderFallbackValue: any
}
