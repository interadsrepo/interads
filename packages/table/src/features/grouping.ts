import { AggregationFns, Column, OnChangeFn, Row, RowData, RowModel, Table } from '../global'

export type GroupingState = string[]
export interface GroupingTableState {
  grouping: GroupingState
}
interface GroupingOptionsBase {
  manualGrouping?: boolean
  onGroupingChange?: OnChangeFn<GroupingState>
  enableGrouping?: boolean
  getGroupedRowModel?: (table: Table<any>) => () => RowModel<any>
  groupedColumnMode?: false | 'reorder' | 'remove'
}
export type AggregationFn<TData extends RowData> = (
  columnId: string,
  leafRows: Row<TData>[],
  childRows: Row<TData>[],
) => any

type ResolvedAggregationFns = keyof AggregationFns extends never
  ? {
      aggregationFns?: Record<string, AggregationFn<any>>
    }
  : {
      aggregationFns: Record<keyof AggregationFns, AggregationFn<any>>
    }

export interface GroupingOptions extends GroupingOptionsBase, ResolvedAggregationFns {}

export type GroupingColumnMode = false | 'reorder' | 'remove'
export function orderColumns<T extends RowData>(
  leafColumns: Column<T, unknown>[],
  grouping: string[],
  groupedColumnMode?: GroupingColumnMode,
) {
  if (!grouping?.length || !groupedColumnMode) {
    return leafColumns
  }

  const nonGroupingColumns = leafColumns.filter((col) => !grouping.includes(col.id))

  if (groupedColumnMode === 'remove') {
    return nonGroupingColumns
  }

  const groupingColumns = grouping
    .map((g) => leafColumns.find((col) => col.id === g)!)
    .filter(Boolean)

  return [...groupingColumns, ...nonGroupingColumns]
}
