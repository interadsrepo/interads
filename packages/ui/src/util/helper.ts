import { cssProps } from '../constant'

export const getPropStyle = (props: any) => {
  const style: { [key: string]: string | number | null } = {}
  Object.keys(props).forEach((val: string) => {
    if (cssProps.includes(val)) {
      style[val] = props[val]
    }
  })
  return style
}

export default getPropStyle
