import {
  AccessorFn,
  ColumnDef,
  DeepKeys,
  DeepValue,
  DisplayColumnDef,
  GroupColumnDef,
  IdentifiedColumnDef,
  RowData,
} from '../global'

export type ColumnHelper<T extends RowData> = {
  accessor: <
    TAccessor extends AccessorFn<T> | DeepKeys<T>,
    TValue extends TAccessor extends AccessorFn<T, infer TReturn>
      ? TReturn
      : TAccessor extends DeepKeys<T>
      ? DeepValue<T, TAccessor>
      : never,
  >(
    accessor: TAccessor,
    column: TAccessor extends AccessorFn<T>
      ? DisplayColumnDef<T, TValue>
      : IdentifiedColumnDef<T, TValue>,
  ) => ColumnDef<T, TValue>
  display: (column: DisplayColumnDef<T>) => ColumnDef<T, unknown>
  group: (column: GroupColumnDef<T>) => ColumnDef<T, unknown>
}

export default function createColumnHelper<T extends RowData>(): ColumnHelper<T> {
  return {
    accessor: (accessor, column) => {
      return typeof accessor === 'function'
        ? ({
            ...column,
            accessorFn: accessor,
          } as any)
        : {
            ...column,
            accessorKey: accessor,
          }
    },
    display: (column) => column as ColumnDef<T, unknown>,
    group: (column) => column as ColumnDef<T, unknown>,
  }
}
