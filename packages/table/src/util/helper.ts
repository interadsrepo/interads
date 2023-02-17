import { NoInfer, TableState, Updater } from '../global'

const defaultGenerator = (componentName: string) => componentName

const createClassNameGenerator = () => {
  let generate = defaultGenerator
  return {
    configure(generator: typeof generate) {
      generate = generator
    },
    generate(componentName: string) {
      return generate(componentName)
    },
    reset() {
      generate = defaultGenerator
    },
  }
}

export const ClassNameGenerator = createClassNameGenerator()

export type GlobalStateSlot =
  | 'active'
  | 'checked'
  | 'completed'
  | 'disabled'
  | 'error'
  | 'expanded'
  | 'focused'
  | 'focusVisible'
  | 'required'
  | 'selected'

const globalStateClassesMapping: Record<GlobalStateSlot, string> = {
  active: 'active',
  checked: 'checked',
  completed: 'completed',
  disabled: 'disabled',
  error: 'error',
  expanded: 'expanded',
  focused: 'focused',
  focusVisible: 'focusVisible',
  required: 'required',
  selected: 'selected',
}

export function generateUtilityClass(
  componentName: string,
  slot: string,
  globalStatePrefix = 'IATable',
): string {
  const globalStateClass = globalStateClassesMapping[slot as GlobalStateSlot]
  return globalStateClass
    ? `${globalStatePrefix}-${globalStateClass}`
    : `${ClassNameGenerator.generate(componentName)}-${slot}`
}

export function generateUtilityClasses<T extends string>(
  componentName: string,
  slots: T[],
  globalStatePrefix = 'IA',
): Record<T, string> {
  const result: Record<string, string> = {}

  slots.forEach((slot) => {
    result[slot] = generateUtilityClass(componentName, slot, globalStatePrefix)
  })

  return result
}

export function composeClasses<ClassKey extends string>(
  slots: Record<ClassKey, ReadonlyArray<string | false | undefined | null>>,
  getUtilityClass: (slot: string) => string,
  classes: Record<string, string> | undefined,
): Record<ClassKey, string> {
  const output: Record<ClassKey, string> = {} as any

  Object.keys(slots).forEach(
    // `Objet.keys(slots)` can't be wider than `T` because we infer `T` from `slots`.
    // @ts-expect-error https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
    (slot: ClassKey) => {
      output[slot] = slots[slot]
        .reduce((acc, key) => {
          if (key) {
            acc.push(getUtilityClass(key))
            if (classes && classes[key]) {
              acc.push(classes[key])
            }
          }
          return acc
        }, [] as string[])
        .join(' ')
    },
  )

  return output
}

export function capitalizeWord(text: string) {
  return `${text[0].toUpperCase()}${text.substring(1)}`
}

export function functionalUpdate<T>(updater: Updater<T>, input: T): T {
  return typeof updater === 'function' ? (updater as (input: T) => T)(input) : updater
}

export function memo<TDeps extends readonly any[], TResult>(
  getDeps: () => [...TDeps],
  fn: (...args: NoInfer<[...TDeps]>) => TResult,
  opts: {
    key: any
    debug?: () => any
    onChange?: (result: TResult) => void
  },
): () => TResult {
  let deps: any[] = []
  let result: TResult | undefined

  return () => {
    // let depTime: number
    if (opts.key && opts.debug) {
      // depTime = Date.now()
    }

    const newDeps = getDeps()

    const depsChanged =
      newDeps.length !== deps.length ||
      newDeps.some((dep: any, index: number) => deps[index] !== dep)

    if (!depsChanged) {
      return result!
    }

    deps = newDeps

    // let resultTime: number
    if (opts.key && opts.debug) {
      // resultTime = Date.now()
    }

    result = fn(...newDeps)
    opts?.onChange?.(result)

    if (opts.key && opts.debug) {
      if (opts?.debug()) {
        // const depEndTime = Math.round((Date.now() - depTime!) * 100) / 100
        // const resultEndTime = Math.round((Date.now() - resultTime!) * 100) / 100
        // const resultFpsPercentage = resultEndTime / 16
        // const pad = (str: number | string, num: number) => {
        //   str = String(str)
        //   while (str.length < num) {
        //     str = ' ' + str
        //   }
        //   return str
        // }
        // console.info(
        //   `%c⏱ ${pad(resultEndTime, 5)} /${pad(depEndTime, 5)} ms`,
        //   `
        //     font-size: .6rem;
        //     font-weight: bold;
        //     color: hsl(${Math.max(
        //       0,
        //       Math.min(120 - 120 * resultFpsPercentage, 120),
        //     )}deg 100% 31%);`,
        //   opts?.key,
        // )
      }
    }

    return result!
  }
}

export function flattenBy<TNode>(arr: TNode[], getChildren: (item: TNode) => TNode[]) {
  const flat: TNode[] = []

  const recurse = (subArr: TNode[]) => {
    subArr.forEach((item) => {
      flat.push(item)
      const children = getChildren(item)
      if (children?.length) {
        recurse(children)
      }
    })
  }

  recurse(arr)

  return flat
}

export function makeStateUpdater<K extends keyof TableState>(key: K, instance: unknown) {
  return (updater: Updater<TableState[K]>) => {
    ;(instance as any).setState(<TTableState>(old: TTableState) => {
      return {
        ...old,
        [key]: functionalUpdate(updater, (old as any)[key]),
      }
    })
  }
}

export function logger(value: any) {
  // eslint-disable-next-line no-console
  console.log(value)
}
