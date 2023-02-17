import { createRow } from '../core/row'
import { Row, RowData, RowModel, Table } from '../global'
import { memo } from '../util/helper'

export default function getCoreRowModel<T extends RowData>(): (
  table: Table<T>,
) => () => RowModel<T> {
  return (table) =>
    memo(
      () => [table.options.data],
      (
        data,
      ): {
        rows: Row<T>[]
        flatRows: Row<T>[]
        rowsById: Record<string, Row<T>>
      } => {
        const rowModel: RowModel<T> = {
          rows: [],
          flatRows: [],
          rowsById: {},
        }

        const accessRows = (originalRows: T[], depth = 0, parent?: Row<T>): Row<T>[] => {
          const rows = [] as Row<T>[]

          for (let i = 0; i < originalRows.length; i += 1) {
            // This could be an expensive check at scale, so we should move it somewhere else, but where?
            // if (!id) {
            //   if (process.env.NODE_ENV !== 'production') {
            //     throw new Error(`getRowId expected an ID, but got ${id}`)
            //   }
            // }

            // Make the row
            const row = createRow(
              table,
              table.$getRowId(originalRows[i]!, i, parent),
              originalRows[i]!,
              i,
              depth,
            )

            // Keep track of every row in a flat array
            rowModel.flatRows.push(row)
            // Also keep track of every row by its ID
            rowModel.rowsById[row.id] = row
            // Push table row into parent
            rows.push(row)

            // Get the original subrows
            if (table.options.getSubRows) {
              row.originalSubRows = table.options.getSubRows(originalRows[i]!, i)

              // Then recursively access them
              if (row.originalSubRows?.length) {
                row.subRows = accessRows(row.originalSubRows, depth + 1, row)
              }
            }
          }

          return rows
        }

        rowModel.rows = accessRows(data)

        return rowModel
      },
      {
        key: process.env.NODE_ENV === 'development' && 'getRowModel',
        debug: () => {},
        onChange: () => {
          // table.$autoResetPageIndex()
        },
      },
    )
}
