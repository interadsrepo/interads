import { AccessorFn, Column, ColumnDef, ColumnDefResolved, RowData, Table } from '../global'
import { memo } from '../util/helper'

export interface CoreColumn<T extends RowData, V> {
  id: string
  depth: number
  accessorFn?: AccessorFn<T, V>
  columnDef: ColumnDef<T, V>
  columns: Column<T, V>[]
  parent?: Column<T, V>
  getLeafColumns: () => Column<T, V>[]
  getFlatColumns: () => Column<T, V>[]
}

export function createColumn<T extends RowData, V>(
  table: Table<T>,
  columnDef: ColumnDef<T, V>,
  depth: number,
  parent?: Column<T, V>,
): Column<T, V> {
  const defaultColumn = table.$getDefaultColumnDef()

  const resolvedColumnDef = {
    ...defaultColumn,
    ...columnDef,
  } as ColumnDefResolved<T>

  const accessorKey = resolvedColumnDef.accessorKey

  const id =
    resolvedColumnDef.id ??
    (accessorKey ? accessorKey.replace('.', '_') : undefined) ??
    (typeof resolvedColumnDef.header === 'string' ? resolvedColumnDef.header : undefined)

  let accessorFn: AccessorFn<T> | undefined

  if (resolvedColumnDef.accessorFn) {
    accessorFn = resolvedColumnDef.accessorFn
  } else if (accessorKey) {
    // Support deep accessor keys
    if (accessorKey.includes('.')) {
      accessorFn = (originalRow: T) => {
        let result = originalRow as Record<string, any>

        const key = accessorKey.split('.')

        key.forEach((k) => {
          result = result?.[k]
          if (process.env.NODE_ENV !== 'production' && result === undefined) {
            console.warn(`"${key}" in deeply nested key "${accessorKey}" returned undefined.`)
          }
        })

        // for (const key of accessorKey.split('.')) {
        //   result = result?.[key]
        //   if (process.env.NODE_ENV !== 'production' && result === undefined) {
        //     console.warn(`"${key}" in deeply nested key "${accessorKey}" returned undefined.`)
        //   }
        // }

        return result
      }
    } else {
      accessorFn = (originalRow: T) => (originalRow as any)[resolvedColumnDef.accessorKey]
    }
  }

  if (!id) {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error(
        resolvedColumnDef.accessorFn
          ? `Columns require an id when using an accessorFn`
          : `Columns require an id when using a non-string header`,
      )
    }
    throw new Error()
  }

  let column: CoreColumn<T, any> = {
    id: `${String(id)}`,
    accessorFn,
    parent: parent as any,
    depth,
    columnDef: resolvedColumnDef as ColumnDef<T, any>,
    columns: [],
    getLeafColumns: memo(
      () => [table.$getOrderColumnsFn()],
      (orderColumns) => {
        if (column.columns?.length) {
          const leafColumns = column.columns.flatMap((col) => col.getLeafColumns())

          return orderColumns(leafColumns)
        }

        return [column as Column<T, V>]
      },
      {
        key: process.env.NODE_ENV === 'production' && 'column.getLeafColumns',
      },
    ),
    getFlatColumns: memo(
      () => [true],
      () => {
        const col = column.columns && column.columns.flatMap((d) => d.getFlatColumns())
        return [column as Column<T, V>, ...col]
      },
      {
        key: process.env.NODE_ENV === 'production' && 'column.getFlatColumns',
      },
    ),
  }

  column = table.$features.reduce((obj, feature) => {
    return Object.assign(obj, feature.createColumn?.(column, table))
  }, column)

  // Yes, we have to convert table to uknown, because we know more than the compiler here.
  return column as Column<T, V>
}
