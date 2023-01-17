import * as React from 'react'

import type { InputFieldProps } from './props'
import { IAInputField } from './css'
import { Input } from '../Input'

export const InputField: React.FC<InputFieldProps> = function InputField(props: InputFieldProps) {
  const [focus, setFocus] = React.useState(false)
  const {
    fullWidth = false,
    hidden = false,
    variant = 'normal',
    palette = 'secondary',
    status,
    startAdornment,
    endAdornment,
    iconHelp,
    startAddOn,
    endAddOn,
    title,
    textHelp,
    children,
    disabled,
    className,
    ...rest
  } = props
  return (
    <IAInputField
      className={`IAInputField-root ${!className ? '' : className} ${
        focus ? 'focused' : ''
      }`.trim()}
      fullWidth={fullWidth}
      variant={variant}
      palette={palette}
      hidden={hidden}
      disabled={disabled || false}
      status={status || null}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    >
      <p className="IAInputField-title">{title}</p>
      <div className="IAInputContainer">
        {startAddOn && <div className="IAInputContainer-addon start">{startAddOn}</div>}
        <div className="IAInputContainer-group IAInputGroup">
          {startAdornment && <div className="IAInputGroup-adornment">{startAdornment}</div>}
          <Input
            className="IAInputGroup-input"
            placeholder="Input here.."
            variant="basic"
            disabled={disabled}
            {...rest}
          />
          {iconHelp && <div className="IAInputGroup-info">{iconHelp}</div>}
          {endAdornment && <div className="IAInputGroup-adornment">{endAdornment}</div>}
        </div>
        {endAddOn && <div className="IAInputContainer-addon end">{endAddOn}</div>}
      </div>
      <p className="IAInputField-info">{textHelp}</p>
    </IAInputField>
  )
}
export default InputField
