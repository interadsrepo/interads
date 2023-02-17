import { TableFeature } from '../core/table'
import { Column, OnChangeFn, RowData, Table, Updater } from '../global'
import { makeStateUpdater, memo } from '../util/helper'
import { orderColumns } from './grouping'

export interface ColumnOrderTableState {
  columnOrder: ColumnOrderState
}

export type ColumnOrderState = string[]

export interface ColumnOrderOptions {
  onColumnOrderChange?: OnChangeFn<ColumnOrderState>
}

export interface ColumnOrderDefaultOptions {
  onColumnOrderChange: OnChangeFn<ColumnOrderState>
}

export interface ColumnOrderInstance<T extends RowData> {
  setColumnOrder: (updater: Updater<ColumnOrderState>) => void
  resetColumnOrder: (defaultState?: boolean) => void
  $getOrderColumnsFn: () => (columns: Column<T, unknown>[]) => Column<T, unknown>[]
}

//

export const Ordering: TableFeature = {
  getInitialState: (state): ColumnOrderTableState => {
    return {
      columnOrder: [],
      ...state,
    }
  },

  getDefaultOptions: <T extends RowData>(table: Table<T>): ColumnOrderDefaultOptions => {
    return {
      onColumnOrderChange: makeStateUpdater('columnOrder', table),
    }
  },

  createTable: <T extends RowData>(table: Table<T>): ColumnOrderInstance<T> => {
    return {
      setColumnOrder: (updater) => table.options.onColumnOrderChange?.(updater),
      resetColumnOrder: (defaultState) => {
        table.setColumnOrder(defaultState ? [] : table.initialState.columnOrder ?? [])
      },
      $getOrderColumnsFn: memo(
        () => [
          table.getState().columnOrder,
          table.getState().grouping,
          table.options.groupedColumnMode,
        ],
        (columnOrder, grouping, groupedColumnMode) => (columns) => {
          // Sort grouped columns to the start of the column list
          // before the headers are built
          let orderedColumns: Column<T, unknown>[] = []

          // If there is no order, return the normal columns
          if (!columnOrder?.length) {
            orderedColumns = columns
          } else {
            const columnOrderCopy = [...columnOrder]

            // If there is an order, make a copy of the columns
            const columnsCopy = [...columns]

            // And make a new ordered array of the columns

            // Loop over the columns and place them in order into the new array
            while (columnsCopy.length && columnOrderCopy.length) {
              const targetColumnId = columnOrderCopy.shift()
              const foundIndex = columnsCopy.findIndex((d) => d.id === targetColumnId)
              if (foundIndex > -1) {
                orderedColumns.push(columnsCopy.splice(foundIndex, 1)[0]!)
              }
            }

            // If there are any columns left, add them to the end
            orderedColumns = [...orderedColumns, ...columnsCopy]
          }

          return orderColumns(orderedColumns, grouping, groupedColumnMode)
        },
        {
          key: process.env.NODE_ENV === 'development' && 'getOrderColumnsFn',
          // debug: () => table.options.debugAll ?? table.options.debugTable,
        },
      ),
    }
  },
}
