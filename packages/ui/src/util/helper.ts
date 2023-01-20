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
