import * as React from 'react'
import { cssProps } from '../constant'
import { GenericObject, ObjectType } from '../global'

export const getPropStyle = (props: GenericObject<any>) => {
  const style: { [key: string]: string | number | null } = {}
  Object.keys(props).forEach((val: string) => {
    if (cssProps.includes(val)) {
      style[val] = props[val]
    }
  })
  return style
}
/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item: object | [] | string) {
  return item && typeof item === 'object' && typeof item !== 'string' && !Array.isArray(item)
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */

export function mergeDeep(targets: ObjectType, sources: ObjectType): ObjectType {
  if (sources === null) {
    return targets
  }

  if (isObject(targets) && isObject(sources)) {
    Object.keys(sources).forEach((key) => {
      let target = targets[key] as ObjectType
      if (isObject(sources[key])) {
        const source = sources[key] as ObjectType
        if (!target) {
          target = {}
        }
        const combine = mergeDeep(target, source)
        targets[key] = combine
      } else {
        targets[key] = sources[key]
      }
    })
  }
  return targets
}

export function hexToHsl(hex: string, offsetLightness = 0) {
  let r = 0
  let g = 0
  let b = 0

  r = `0x${hex[1]}${hex[2]}` as unknown as number
  g = `0x${hex[3]}${hex[4]}` as unknown as number
  b = `0x${hex[5]}${hex[6]}` as unknown as number

  r /= 255
  b /= 255
  g /= 255

  const cmin = Math.min(r, g, b)
  const cmax = Math.max(r, g, b)
  const delta = cmax - cmin

  let h = 0
  let s = 0
  let l = 0

  if (delta === 0) {
    h = 0
  } else if (cmax === r) {
    h = ((g - b) / delta) % 6
  } else if (cmax === g) {
    h = (b - r) / delta + 2
  } else {
    h = (r - g) / delta + 4
  }

  h = Math.round(h * 60)

  if (h < 0) {
    h += 360
  }

  l = (cmax + cmin) / 2
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))
  s = +(s * 100).toFixed(1)
  l = +(l * 100).toFixed(1)
  return `hsl(${h},${s}%,${l + offsetLightness}%)`
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
export default getPropStyle
