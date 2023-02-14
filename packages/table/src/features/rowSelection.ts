import { OnChangeFn, Row, RowData, RowModel, Updater } from '../global'

export type RowSelectionState = Record<string, boolean>
export interface RowSelectionOptions<T extends RowData> {
  enableRowSelection?: boolean | ((row: Row<T>) => boolean)
  enableMultiRowSelection?: boolean | ((row: Row<T>) => boolean)
  enableSubRowSelection?: boolean | ((row: Row<T>) => boolean)
  onRowSelectionChange?: OnChangeFn<RowSelectionState>
}

export interface RowSelectionTableState {
  rowSelection: RowSelectionState
}

export interface RowSelectionRow {
  getIsSelected: () => boolean
  getIsSomeSelected: () => boolean
  getIsAllSubRowsSelected: () => boolean
  getCanSelect: () => boolean
  getCanMultiSelect: () => boolean
  getCanSelectSubRows: () => boolean
  toggleSelected: (value?: boolean) => void
  getToggleSelectedHandler: () => (event: unknown) => void
}

export interface RowSelectionInstance<T extends RowData> {
  getToggleAllRowsSelectedHandler: () => (event: unknown) => void
  getToggleAllPageRowsSelectedHandler: () => (event: unknown) => void
  setRowSelection: (updater: Updater<RowSelectionState>) => void
  resetRowSelection: (defaultState?: boolean) => void
  getIsAllRowsSelected: () => boolean
  getIsAllPageRowsSelected: () => boolean
  getIsSomeRowsSelected: () => boolean
  getIsSomePageRowsSelected: () => boolean
  toggleAllRowsSelected: (value?: boolean) => void
  toggleAllPageRowsSelected: (value?: boolean) => void
  getPreSelectedRowModel: () => RowModel<T>
  getSelectedRowModel: () => RowModel<T>
  getFilteredSelectedRowModel: () => RowModel<T>
  getGroupedSelectedRowModel: () => RowModel<T>
}
