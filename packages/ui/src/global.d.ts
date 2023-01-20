export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}

export type GenericObject<T> = {
  [key: string]: T
}
