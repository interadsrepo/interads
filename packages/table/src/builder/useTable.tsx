import * as React from 'react'
import { createTable } from '../core/table'
import { RowData, TableOptions, TableOptionsResolved } from '../global'

function isClassComponent(component: any) {
  return (
    typeof component === 'function' &&
    (() => {
      const proto = Object.getPrototypeOf(component)
      return proto.prototype && proto.prototype.isReactComponent
    })()
  )
}

function isExoticComponent(component: any) {
  return (
    typeof component === 'object' &&
    typeof component.$$typeof === 'symbol' &&
    ['react.memo', 'react.forward_ref'].includes(component.$$typeof.description)
  )
}

function isReactComponent<TProps>(component: unknown): component is React.ComponentType<TProps> {
  return (
    isClassComponent(component) || typeof component === 'function' || isExoticComponent(component)
  )
}

export type Renderable<TProps> = React.ReactNode | React.ComponentType<TProps>
export function flexRender<Props extends object>(
  Comp: Renderable<Props>,
  props: Props,
): React.ReactNode | JSX.Element {
  if (!Comp) {
    return null
  }

  if (isReactComponent<Props>(Comp)) {
    return <Comp {...props} />
  }

  return Comp
}

export default function useTable<T extends RowData>(options: TableOptions<T>) {
  // Compose in the generic options to the user options
  const resolvedOptions: TableOptionsResolved<T> = {
    state: {}, // Dummy state
    onStateChange: () => {}, // noop
    renderFallbackValue: null,
    ...options,
  }

  // Create a new table and store it in state
  const [tableRef] = React.useState(() => ({
    current: createTable<T>(resolvedOptions),
  }))

  // By default, manage table state here using the table's initial state
  const [state, setState] = React.useState(() => tableRef.current.initialState)

  // Compose the default state above with any user state. This will allow the user
  // to only control a subset of the state if desired.
  tableRef.current.setOptions((prev) => ({
    ...prev,
    ...options,
    state: {
      ...state,
      ...options.state,
    },
    // Similarly, we'll maintain both our internal state and any user-provided
    // state.
    onStateChange: (updater) => {
      setState(updater)
      options.onStateChange?.(updater)
    },
  }))

  return tableRef.current
}
