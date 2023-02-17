import { Cell, Row, RowData, Table } from '../global'
import { flattenBy, memo } from '../util/helper'
import { createCell } from './cell'

export interface CoreRow<T extends RowData> {
  id: string
  index: number
  original: T
  depth: number
  $valuesCache: Record<string, unknown>
  $uniqueValuesCache: Record<string, unknown>
  getValue: <V>(columnId: string) => V
  getUniqueValues: <V>(columnId: string) => V[]
  renderValue: <V>(columnId: string) => V
  subRows: Row<T>[]
  getLeafRows: () => Row<T>[]
  originalSubRows?: T[]
  getAllCells: () => Cell<T, unknown>[]
  $getAllCellsByColumnId: () => Record<string, Cell<T, unknown>>
}

export const createRow = <TData extends RowData>(
  table: Table<TData>,
  id: string,
  original: TData,
  rowIndex: number,
  depth: number,
  subRows?: Row<TData>[],
): Row<TData> => {
  const row: CoreRow<TData> = {
    id,
    index: rowIndex,
    original,
    depth,
    $valuesCache: {},
    $uniqueValuesCache: {},
    getValue: (columnId) => {
      if (row.$valuesCache.hasOwnProperty(columnId)) {
        return row.$valuesCache[columnId]
      }

      const column = table.getColumn(columnId)

      if (!column?.accessorFn) {
        return undefined
      }

      row.$valuesCache[columnId] = column.accessorFn(row.original as TData, rowIndex)

      return row.$valuesCache[columnId] as any
    },
    getUniqueValues: (columnId) => {
      if (row.$uniqueValuesCache.hasOwnProperty(columnId)) {
        return row.$uniqueValuesCache[columnId]
      }

      const column = table.getColumn(columnId)

      if (!column?.accessorFn) {
        return undefined
      }

      if (!column.columnDef.getUniqueValues) {
        row.$uniqueValuesCache[columnId] = [row.getValue(columnId)]
        return row.$uniqueValuesCache[columnId]
      }

      row.$uniqueValuesCache[columnId] = column.columnDef.getUniqueValues(
        row.original as TData,
        rowIndex,
      )

      return row.$uniqueValuesCache[columnId] as any
    },
    renderValue: (columnId) => row.getValue(columnId) ?? table.options.renderFallbackValue,
    subRows: subRows ?? [],
    getLeafRows: () => flattenBy(row.subRows, (d) => d.subRows),
    getAllCells: memo(
      () => [table.getAllLeafColumns()],
      (leafColumns) => {
        return leafColumns.map((column) => {
          return createCell(table, row as Row<TData>, column, column.id)
        })
      },
      {
        key: process.env.NODE_ENV === 'development' && 'row.getAllCells',
        debug: () => {},
      },
    ),

    $getAllCellsByColumnId: memo(
      () => [row.getAllCells()],
      (allCells) => {
        return allCells.reduce((acc, cell) => {
          acc[cell.column.id] = cell
          return acc
        }, {} as Record<string, Cell<TData, unknown>>)
      },
      {
        key: process.env.NODE_ENV === 'production' && 'row.getAllCellsByColumnId',
        debug: () => {},
      },
    ),
  }

  for (let i = 0; i < table.$features.length; i += 1) {
    const feature = table.$features[i]
    Object.assign(row, feature?.createRow?.(row, table))
  }

  return row as Row<TData>
}
