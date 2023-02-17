import type { CoreCell, CellContext } from './core/cell'
import type { CoreColumn } from './core/column'
import type { CoreHeader, CoreHeaderGroup, HeadersInstance, HeaderContext } from './core/header'
import type { CoreRow } from './core/row'
import type { CoreInstance, CoreOptions, CoreTableState } from './core/table'
import type { GroupingTableState, GroupingOptions } from './features/grouping'
import type {
  ColumnOrderInstance,
  ColumnOrderTableState,
  ColumnOrderOptions,
} from './features/ordering'

interface CompleteInitialTableState extends CoreTableState {}

export interface RowModel<T extends RowData> {
  rows: Row<T>[]
  flatRows: Row<T>[]
  rowsById: Record<string, Row<T>>
}
export interface AggregationFns {}

export interface TableMeta {}
export interface InitialTableState extends Partial<CompleteInitialTableState> {}
export interface TableState extends CoreTableState, ColumnOrderTableState, GroupingTableState {}
export interface Table<T extends RowData>
  extends CoreInstance<T>,
    HeadersInstance<T>,
    ColumnOrderInstance<T> {}

export type PartialKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>
export type Overwrite<T, U extends { [TKey in keyof T]?: any }> = Omit<T, keyof U> & U
export type NoInfer<T> = [T][T extends any ? 0 : never]
export type Getter<V> = <TValue = V>() => NoInfer<TValue>

export interface Cell<T extends RowData, V> extends CoreCell<T, V> {}
export interface Row<T extends RowData> extends CoreRow<T> {}

export type Updater<T> = T | ((old: T) => T)
export type OnChangeFn<T> = (updaterOrValue: Updater<T>) => void
export type RowData = unknown | object | any[]

export interface FeatureOptions extends ColumnOrderOptions, GroupingOptions {}

export type TableOptionsResolved<T extends RowData> = CoreOptions<T> & FeatureOptions

export interface TableOptions<T extends RowData>
  extends PartialKeys<TableOptionsResolved<T>, 'state' | 'onStateChange' | 'renderFallbackValue'> {}

export interface Column<T extends RowData, V = unknown> extends CoreColumn<T, V> {}

export interface Header<T extends RowData, V> extends CoreHeader<T, V> {}

export interface HeaderGroup<T extends RowData> extends CoreHeaderGroup<T> {}

export type ColumnDef<T extends RowData, V = unknown> =
  | DisplayColumnDef<T, V>
  | GroupColumnDef<T, V>
  | AccessorColumnDef<T, V>

export type AccessorFn<T extends RowData, V = unknown> = (originalRow: T, index: number) => V

export type DisplayColumnDef<T extends RowData, V = unknown> = ColumnDefBase<T, V> &
  ColumnIdentifiers<T, V>

interface GroupColumnDefBase<T extends RowData, V = unknown> extends ColumnDefBase<T, V> {
  columns?: ColumnDef<T, any>[]
}

export type GroupColumnDef<T extends RowData, V = unknown> = GroupColumnDefBase<T, V> &
  ColumnIdentifiers<T, V>

interface AccessorKeyColumnDefBase<T extends RowData, V = unknown> extends ColumnDefBase<T, V> {
  id?: string
  accessorKey: (string & {}) | keyof T
}

export type AccessorKeyColumnDef<T extends RowData, V = unknown> = AccessorKeyColumnDefBase<T, V> &
  Partial<ColumnIdentifiers<T, V>>
export type AccessorColumnDef<T extends RowData, V = unknown> =
  | AccessorKeyColumnDef<T, V>
  | AccessorFnColumnDef<T, V>

export interface ColumnDefBase<T extends RowData, V = unknown> extends ColumnDefExtensions {
  getUniqueValues?: AccessorFn<T, unknown[]>
  footer?: ColumnDefTemplate<HeaderContext<T, V>>
  cell?: ColumnDefTemplate<CellContext<T, V>>
  meta?: ColumnMeta
}

interface AccessorFnColumnDefBase<T extends RowData, V = unknown> extends ColumnDefBase<T, V> {
  accessorFn: AccessorFn<T, V>
}

export type AccessorFnColumnDef<T extends RowData, V = unknown> = AccessorFnColumnDefBase<T, V> &
  ColumnIdentifiers<T, V>
type ColumnIdentifiers<T extends RowData, V> = IdIdentifier<T, V> | StringHeaderIdentifier

interface IdIdentifier<T extends RowData, V> {
  id: string
  header?: StringOrTemplateHeader<T, V>
}

export type StringOrTemplateHeader<T, V> = string | ColumnDefTemplate<HeaderContext<T, V>>

export type ColumnDefTemplate<TProps extends object> = string | ((props: TProps) => any)

interface StringHeaderIdentifier {
  header: string
  id?: string
}

export interface ColumnMeta {}

interface ColumnDefExtensions {}

export interface IdentifiedColumnDef<TData extends RowData, TValue = unknown>
  extends ColumnDefBase<TData, TValue> {
  id?: string
  header?: StringOrTemplateHeader<TData, TValue>
}

export type DeepValue<T, TProp> = T extends Record<string | number, any>
  ? TProp extends `${infer TBranch}.${infer TDeepProp}`
    ? DeepValue<T[TBranch], TDeepProp>
    : T[TProp & string]
  : never

export type DeepKeys<T> = unknown extends T
  ? keyof T
  : object extends T
  ? string
  : T extends readonly any[] & IsTuple<T>
  ? AllowedIndexes<T> | DeepKeysPrefix<T, AllowedIndexes<T>>
  : T extends any[]
  ? never & 'Dynamic length array indexing is not supported'
  : T extends Date
  ? never
  : T extends object
  ? (keyof T & string) | DeepKeysPrefix<T, keyof T>
  : never

type DeepKeysPrefix<T, TPrefix> = TPrefix extends keyof T & (number | string)
  ? `${TPrefix}.${DeepKeys<T[TPrefix]> & string}`
  : never

type IsTuple<T> = T extends readonly any[] & { length: infer Length }
  ? Length extends Index40
    ? T
    : never
  : never

// If this type is a tuple, what indices are allowed?
type AllowedIndexes<
  Tuple extends ReadonlyArray<any>,
  Keys extends number = never,
> = Tuple extends readonly []
  ? Keys
  : Tuple extends readonly [unknown, ...infer Tail]
  ? AllowedIndexes<Tail, Keys | Tail['length']>
  : Keys

type ComputeRange<N extends number, Result extends Array<unknown> = []> = Result['length'] extends N
  ? Result
  : ComputeRange<N, [...Result, Result['length']]>
type Index40 = ComputeRange<40>[number]

export type ColumnDefResolved<TData extends RowData, TValue = unknown> = Partial<
  UnionToIntersection<ColumnDef<TData, TValue>>
> & {
  accessorKey?: string
}

export type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (
  x: infer R,
) => any
  ? R
  : never
