import {
  Column,
  ColumnDef,
  ColumnDefResolved,
  GroupColumnDef,
  InitialTableState,
  RequiredKeys,
  Row,
  RowData,
  RowModel,
  Table,
  TableOptions,
  TableOptionsResolved,
  TableState,
  Updater,
} from '../global'
import { functionalUpdate, memo } from '../util/helper'
import { createColumn } from './column'
import { Headers } from './header'

export interface CoreTableState {}

export interface TableFeature {
  getInitialState?: (initialState?: InitialTableState) => any
  getDefaultOptions?: (table: any) => any
  createTable?: (table: any) => any
  getDefaultColumnDef?: () => any
  createColumn?: (column: any, table: any) => any
  createHeader?: (column: any, table: any) => any
  createCell?: (cell: any, column: any, row: any, table: any) => any
  createRow?: (row: any, table: any) => any
}

export interface CoreInstance<T extends RowData> {
  initialState: TableState
  setOptions: (newOptions: Updater<TableOptionsResolved<T>>) => void
  $features: readonly TableFeature[]
  options: RequiredKeys<TableOptionsResolved<T>, 'state'>
  $getDefaultColumnDef: () => Partial<ColumnDef<T, unknown>>
  getColumn: (columnId: string) => Column<T, unknown> | undefined
  getAllLeafColumns: () => Column<T, unknown>[]
  getAllColumns: () => Column<T, unknown>[]
  $getRowId: (_: T, index: number, parent?: Row<T>) => string
  $getColumnDefs: () => ColumnDef<T, unknown>[]
  $getAllFlatColumnsById: () => Record<string, Column<T, unknown>>
  getAllFlatColumns: () => Column<T, unknown>[]
  getState: () => TableState
  setState: (updater: Updater<TableState>) => void
}

export interface CoreOptions<T extends RowData> {
  state: Partial<TableState>
  onStateChange: (updater: Updater<TableState>) => void
  renderFallbackValue: any
  data: T[]
  columns: ColumnDef<T, any>[]
  initialState?: InitialTableState
  getCoreRowModel: (table: Table<any>) => () => RowModel<any>
  getSubRows?: (originalRow: T, index: number) => undefined | T[]
  mergeOptions?: (
    defaultOptions: TableOptions<T>,
    options: Partial<TableOptions<T>>,
  ) => TableOptions<T>
  defaultColumn?: Partial<ColumnDef<T, unknown>>
  getRowId?: (originalRow: T, index: number, parent?: Row<T>) => string
}

export const RowSelection: TableFeature = {}

const features = [Headers] as const

export function createTable<T extends RowData>(options: TableOptionsResolved<T>): Table<T> {
  const table = { $features: features } as unknown as Table<T>

  const defaultOptions = table.$features.reduce((obj, feature) => {
    return Object.assign(obj, feature.getDefaultOptions?.(table))
  }, {}) as TableOptionsResolved<T>

  const mergeOptions = (opts: TableOptionsResolved<T>) => {
    if (table.options.mergeOptions) {
      return table.options.mergeOptions(defaultOptions, opts)
    }

    return {
      ...defaultOptions,
      ...opts,
    }
  }
  const coreInitialState: CoreTableState = {}

  let initialState = {
    ...coreInitialState,
    ...(options.initialState ?? {}),
  } as TableState

  table.$features.forEach((feature) => {
    initialState = feature.getInitialState?.(initialState) ?? initialState
  })

  const coreInstance: CoreInstance<T> = {
    $features: features,
    options: {
      ...defaultOptions,
      ...options,
    },
    initialState,
    setOptions: (updater) => {
      const newOptions = functionalUpdate(updater, table.options)
      table.options = mergeOptions(newOptions) as RequiredKeys<TableOptionsResolved<T>, 'state'>
    },
    getAllColumns: memo(
      () => [table.$getColumnDefs()],
      (columnDefs) => {
        const recurseColumns = (
          columns: ColumnDef<T, unknown>[],
          parent?: Column<T, unknown>,
          depth = 0,
        ): Column<T, unknown>[] => {
          return columns.map((columnDef) => {
            const column = createColumn(table, columnDef, depth, parent)

            const groupingColumnDef = columnDef as GroupColumnDef<T, unknown>

            column.columns = groupingColumnDef.columns
              ? recurseColumns(groupingColumnDef.columns, column, depth + 1)
              : []

            return column
          })
        }

        return recurseColumns(columnDefs)
      },
      {
        key: process.env.NODE_ENV === 'development' && 'getAllColumns',
        debug: () => {},
      },
    ),
    $getColumnDefs: () => table.options.columns,
    $getDefaultColumnDef: memo(
      () => [table.options.defaultColumn],
      (defaultColumn) => {
        defaultColumn = (defaultColumn ?? {}) as Partial<ColumnDef<T, unknown>>

        return {
          header: (props) => {
            const resolvedColumnDef = props.header.column.columnDef as ColumnDefResolved<T>

            if (resolvedColumnDef.accessorKey) {
              return resolvedColumnDef.accessorKey
            }

            if (resolvedColumnDef.accessorFn) {
              return resolvedColumnDef.id
            }

            return null
          },
          // footer: props => props.header.column.id,
          cell: (props) => props.renderValue<any>()?.toString?.() ?? null,
          ...table.$features.reduce((obj, feature) => {
            return Object.assign(obj, feature.getDefaultColumnDef?.())
          }, {}),
          ...defaultColumn,
        } as Partial<ColumnDef<T, unknown>>
      },
      {
        debug: () => {},
        key: process.env.NODE_ENV === 'development' && 'getDefaultColumnDef',
      },
    ),
    $getRowId: (row: T, index: number, parent?: Row<T>) =>
      table.options.getRowId?.(row, index, parent) ??
      `${parent ? [parent.id, index].join('.') : index}`,
    getColumn: (columnId) => {
      const column = table.$getAllFlatColumnsById()[columnId]

      if (process.env.NODE_ENV !== 'production' && !column) {
        console.error(`[Table] Column with id '${columnId}' does not exist.`)
      }

      return column
    },
    getAllLeafColumns: memo(
      () => [table.getAllColumns(), table.$getOrderColumnsFn()],
      (allColumns, orderColumns) => {
        const leafColumns = allColumns.flatMap((column) => column.getLeafColumns())
        return orderColumns(leafColumns)
      },
      {
        key: process.env.NODE_ENV === 'development' && 'getAllLeafColumns',
        debug: () => {},
      },
    ),
    $getAllFlatColumnsById: memo(
      () => [table.getAllFlatColumns()],
      (flatColumns) => {
        return flatColumns.reduce((acc, column) => {
          acc[column.id] = column
          return acc
        }, {} as Record<string, Column<T, unknown>>)
      },
      {
        key: process.env.NODE_ENV === 'development' && 'getAllFlatColumnsById',
        // debug: () => table.options.debugAll ?? table.options.debugColumns,
      },
    ),
    getAllFlatColumns: memo(
      () => [table.getAllColumns()],
      (allColumns) => {
        return allColumns.flatMap((column) => {
          return column.getFlatColumns()
        })
      },
      {
        key: process.env.NODE_ENV === 'development' && 'getAllFlatColumns',
      },
    ),
    getState: () => {
      return table.options.state as TableState
    },
    setState: (updater: Updater<TableState>) => {
      table.options.onStateChange?.(updater)
    },
  }

  Object.assign(table, coreInstance)

  table.$features.forEach((feature) => {
    return Object.assign(table, feature.createTable?.(table))
  })
  return table
}
