import { Column, Header, HeaderGroup, RowData, Table } from '../global'
import { memo } from '../util/helper'
import type { TableFeature } from './table'

export interface CoreHeaderGroup<T extends RowData> {
  id: string
  depth: number
  headers: Header<T, unknown>[]
}

export interface CoreHeader<T extends RowData, TValue> {
  id: string
  index: number
  depth: number
  column: Column<T, TValue>
  headerGroup: HeaderGroup<T>
  isPlaceholder: boolean
  placeholderId?: string
  getContext: () => HeaderContext<T, TValue>
}

export interface HeaderContext<T, V> {
  table: Table<T>
  header: Header<T, V>
  column: Column<T, V>
}

export interface HeadersInstance<T extends RowData> {
  getHeaderGroups: () => HeaderGroup<T>[]
}

function createHeader<T extends RowData, TValue>(
  table: Table<T>,
  column: Column<T, TValue>,
  options: {
    id?: string
    isPlaceholder?: boolean
    placeholderId?: string
    index: number
    depth: number
  },
): Header<T, TValue> {
  const id = options.id ?? column.id

  const header: CoreHeader<T, TValue> = {
    id,
    column,
    index: options.index,
    isPlaceholder: !!options.isPlaceholder,
    placeholderId: options.placeholderId,
    depth: options.depth,
    headerGroup: null!,
    getContext: () => ({
      table,
      header: header as Header<T, TValue>,
      column,
    }),
  }

  table.$features.forEach((feature) => {
    Object.assign(header, feature.createHeader?.(header, table))
  })

  return header as Header<T, TValue>
}

export function buildHeaderGroups<TData extends RowData>(
  allColumns: Column<TData, unknown>[],
  columnsToGroup: Column<TData, unknown>[],
  table: Table<TData>,
  headerFamily?: 'center' | 'left' | 'right',
) {
  let maxDepth = 0

  const findMaxDepth = (columns: Column<TData, unknown>[], depth = 1) => {
    maxDepth = Math.max(maxDepth, depth)

    columns.forEach((column) => {
      if (column.columns?.length) {
        findMaxDepth(column.columns, depth + 1)
      }
    }, 0)
  }

  findMaxDepth(allColumns)

  const headerGroups: HeaderGroup<TData>[] = []

  const createHeaderGroup = (headersToGroup: Header<TData, unknown>[], depth: number) => {
    // The header group we are creating
    const headerGroup: HeaderGroup<TData> = {
      depth,
      id: [headerFamily, `${depth}`].filter(Boolean).join('_'),
      headers: [],
    }

    // The parent columns we're going to scan next
    const pendingParentHeaders: Header<TData, unknown>[] = []

    // Scan each column for parents
    headersToGroup.forEach((headerToGroup) => {
      // What is the latest (last) parent column?

      const latestPendingParentHeader = [...pendingParentHeaders].reverse()[0]

      const isLeafHeader = headerToGroup.column.depth === headerGroup.depth

      let column: Column<TData, unknown>
      let isPlaceholder = false

      if (isLeafHeader && headerToGroup.column.parent) {
        // The parent header is new
        column = headerToGroup.column.parent
      } else {
        // The parent header is repeated
        column = headerToGroup.column
        isPlaceholder = true
      }

      if (latestPendingParentHeader && latestPendingParentHeader?.column === column) {
        // This column is repeated. Add it as a sub header to the next batch
      } else {
        // This is a new header. Let's create it
        const header = createHeader(table, column, {
          id: [headerFamily, depth, column.id, headerToGroup?.id].filter(Boolean).join('_'),
          isPlaceholder,
          placeholderId: isPlaceholder
            ? `${pendingParentHeaders.filter((d) => d.column === column).length}`
            : undefined,
          depth,
          index: pendingParentHeaders.length,
        })

        // Add the headerToGroup as a subHeader of the new header
        // Add the new header to the pendingParentHeaders to get grouped
        // in the next batch
        pendingParentHeaders.push(header)
      }

      headerGroup.headers.push(headerToGroup)
      headerToGroup.headerGroup = headerGroup
    })

    headerGroups.push(headerGroup)

    if (depth > 0) {
      createHeaderGroup(pendingParentHeaders, depth - 1)
    }
  }

  const bottomHeaders = columnsToGroup.map((column, index) =>
    createHeader(table, column, {
      depth: maxDepth,
      index,
    }),
  )

  createHeaderGroup(bottomHeaders, maxDepth - 1)

  headerGroups.reverse()

  // headerGroups = headerGroups.filter(headerGroup => {
  //   return !headerGroup.headers.every(header => header.isPlaceholder)
  // })

  return headerGroups
}

export const Headers: TableFeature = {
  createTable: <T extends RowData>(table: Table<T>) => {
    return {
      getDefaultOptions: () => {},
      getHeaderGroups: memo(
        () => [table.getAllColumns()],
        (allColumns) => {
          const headerGroups = buildHeaderGroups(allColumns, [...allColumns], table)

          return headerGroups
        },
        {
          key: process.env.NODE_ENV === 'development' && 'getHeaderGroups',
          debug: () => {},
        },
      ),
    }
  },
}
