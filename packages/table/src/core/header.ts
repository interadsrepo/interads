import { Column, Header, HeaderGroup, RowData, Table } from '../global'

export interface CoreHeaderGroup<T extends RowData> {
  id: string
  depth: number
  headers: Header<T, unknown>[]
}

export interface CoreHeader<TData extends RowData, TValue> {
  id: string
  index: number
  depth: number
  column: Column<TData, TValue>
  headerGroup: HeaderGroup<TData>
  subHeaders: Header<TData, TValue>[]
  colSpan: number
  rowSpan: number
  getLeafHeaders: () => Header<TData, unknown>[]
  isPlaceholder: boolean
  placeholderId?: string
  getContext: () => HeaderContext<TData, TValue>
}

export interface HeaderContext<T, V> {
  table: Table<T>
  header: Header<T, V>
  column: Column<T, V>
}

export interface HeadersInstance<T extends RowData> {
  getHeaderGroups: () => HeaderGroup<T>[]
}
