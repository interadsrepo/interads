export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

export type GetObjDifferentKeys<
  T,
  U,
  T0 = Omit<T, keyof U> & Omit<U, keyof T>,
  T1 = {
    [K in keyof T0]: T0[K]
  },
> = T1

export type GetObjSameKeys<T, U> = Omit<T | U, keyof GetObjDifferentKeys<T, U>>

export type MergeTwoObjects<
  T,
  U,
  T0 = Partial<GetObjDifferentKeys<T, U>> & {
    [K in keyof GetObjSameKeys<T, U>]: DeepMergeTwoTypes<T[K], U[K]>
  },
  T1 = { [K in keyof T0]: T0[K] },
> = T1

export type DeepMergeTwoTypes<T, U> = [T, U] extends [
  { [key: string]: unknown },
  { [key: string]: unknown },
]
  ? MergeTwoObjects<T, U>
  : T | U

const isObject = (item: unknown): boolean => {
  return item !== null && typeof item === 'object'
}

function isMergebleObject(item: unknown): boolean {
  return isObject(item) && !Array.isArray(item)
}

function mergeDeep<T extends Record<string, unknown>>(
  target: T,
  ...sources: DeepPartial<T>[]
): DeepMergeTwoTypes<T, DeepPartial<T>> {
  if (!sources.length) {
    return target
  }

  const source = sources.shift()
  if (source === undefined) {
    return target
  }

  if (isMergebleObject(target) && isMergebleObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isMergebleObject(source[key])) {
        if (!target[key]) {
          ;(target[key] as T) = {} as T
        }
        mergeDeep(target[key] as T, source[key] as DeepPartial<T>)
      } else {
        ;(target[key] as DeepPartial<T>) = source[key] as DeepPartial<T>
      }
    })
  }

  return mergeDeep(target, ...sources)
}

export default mergeDeep
