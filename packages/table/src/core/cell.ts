import { Cell, Column, Getter, Row, RowData, Table } from '../global'
import { memo } from '../util/helper'

export interface CellContext<T extends RowData, V> {
  table: Table<T>
  column: Column<T, V>
  row: Row<T>
  cell: Cell<T, V>
  getValue: Getter<V>
  renderValue: Getter<V | null>
}

export interface CoreCell<T extends RowData, V> {
  id: string
  getValue: CellContext<T, V>['getValue']
  renderValue: CellContext<T, V>['renderValue']
  row: Row<T>
  column: Column<T, V>
  getContext: () => CellContext<T, V>
}

export function createCell<T extends RowData, V>(
  table: Table<T>,
  row: Row<T>,
  column: Column<T, V>,
  columnId: string,
): Cell<T, V> {
  const cell: CoreCell<T, V> = {
    id: `${row.id}_${column.id}`,
    row,
    column,
    getValue: () => row.getValue(columnId),
    renderValue: {} as Getter<V | null>,
    getContext: memo(
      () => [table, column, row, cell],
      ($table, $column, $row, $cell) => ({
        table: $table,
        column: $column,
        row: $row,
        cell: $cell as Cell<T, V>,
        getValue: $cell.getValue,
        renderValue: $cell.renderValue,
      }),
      {
        key: process.env.NODE_ENV === 'development' && 'cell.getContext',
        debug: () => {},
      },
    ),
  }

  function getRenderValue() {
    return cell.getValue() ?? table.options.renderFallbackValue
  }

  cell.renderValue = getRenderValue

  table.$features.forEach((feature) => {
    Object.assign(cell, feature.createCell?.(cell as Cell<T, V>, column, row as Row<T>, table))
  }, {})

  return cell as Cell<T, V>
}
