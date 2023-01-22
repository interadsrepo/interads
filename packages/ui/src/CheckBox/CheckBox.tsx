import * as React from 'react'

import type { CheckBoxProps } from './props'
import IACheckBox from './css'
import { getCheckBoxUtilityClass } from './checkboxClasses'
import { capitalizeWord, composeClasses } from '../util/helper'

const useUtilityClasses = (ownerState: CheckBoxProps) => {
  const { size = 'md', variant = 'normal', palette = 'secondary', disabled } = ownerState

  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      variant,
      `${variant}${capitalizeWord(palette)}`,
      `size${capitalizeWord(size)}`,
      `${variant}Size${capitalizeWord(size)}`,
    ],
    label: ['label'],
    input: ['input', `inputSize${capitalizeWord(size)}`, disabled && 'disabled'],
  }

  const composedClasses = composeClasses(slots, getCheckBoxUtilityClass, undefined)

  return {
    ...composedClasses,
  }
}

const CheckBox = React.forwardRef<HTMLInputElement, CheckBoxProps>(function Pagination(props, ref) {
  const { size = 'md', palette = 'secondary', id, ...rest } = props
  const classes = useUtilityClasses(props)

  return (
    <IACheckBox size={size} palette={palette} className={classes.root}>
      <label htmlFor={id} className={classes.label}>
        <input id={id} type="checkbox" ref={ref} {...rest} className={classes.input} />
      </label>
    </IACheckBox>
  )
})

export default CheckBox
