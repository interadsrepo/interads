import { generateUtilityClass, generateUtilityClasses } from '../util/helper'

export interface CheckBoxClasses {
  root: string
  disabled: string
  normal: string
  normalPrimary: string
  normalSecondary: string
  normalInfo: string
  normalSuccess: string
  normalError: string
  normalWarning: string
  input: string
  label: string
}

export type CheckBoxClassKey = keyof CheckBoxClasses

export function getCheckBoxUtilityClass(slot: string): string {
  return generateUtilityClass('IACheckBox', slot)
}

const checkBoxClasses: CheckBoxClasses = generateUtilityClasses('IACheckBox', [
  'root',
  'disabled',
  'normal',
  'normalPrimary',
  'normalSecondary',
  'normalInfo',
  'normalSuccess',
  'normalError',
  'normalWarning',
  'input',
  'label',
])

export default checkBoxClasses
