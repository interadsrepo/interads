import { IconProps } from '../constant'

function Check(props: IconProps) {
  const { color, size } = props
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || 16}
      height={size || 16}
      fill={color || 'currentColor'}
      viewBox="0 0 24 24"
    >
      <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
    </svg>
  )
}

export default Check
