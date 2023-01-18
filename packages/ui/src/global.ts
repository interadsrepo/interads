export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}

export type ObjectType = {
  [key: string]: string | ObjectType | object
}

export type GenericObject<T> = {
  [key: string]: T
}
