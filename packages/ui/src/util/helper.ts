import * as React from 'react'
import { cssProps } from '../constant'
import { GenericObject } from '../global'

export const getPropStyle = (props: GenericObject<any>) => {
  const style: { [key: string]: string | number | null } = {}
  Object.keys(props).forEach((val: string) => {
    if (cssProps.includes(val)) {
      style[val] = props[val]
    }
  })
  return style
}

export function random(length: number) {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export const useUniqueId = (length = 20) => {
  const [id, setId] = React.useState('')
  const rand = random(length)
  React.useEffect(() => {
    if (!id) {
      setId(rand)
    }
  }, [id, rand])

  return id
}

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
  globalStatePrefix = 'IA',
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
