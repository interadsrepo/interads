import * as React from 'react'
import { AlertProps as AlertPropsBase } from './props'
import StyledAlert from './css'
import { CheckCircle } from '../../icon/CheckCircle'
import { WarningCircle } from '../../icon/WarningCircle'
import { Question } from '../../icon/Question'

export interface AlertProps extends AlertPropsBase {
  open?: boolean
  onConfirm?: () => void
  onCancel: () => void
  onClose: () => void
}

const Alert: React.FC<AlertProps> = function Alert({
  variant,
  title,
  message,
  textCancel,
  textConfirm,

  onCancel,
  onConfirm,
  onClose,
  open,
}: AlertProps) {
  const dialogRef = React.useRef<HTMLDialogElement>(null)

  const animationOnClose = React.useCallback(() => {
    dialogRef.current?.removeAttribute('closing')
    dialogRef.current?.close()
  }, [])

  React.useEffect(() => {
    const refs = dialogRef.current
    refs?.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    })
    refs?.addEventListener('mousedown', (ev: MouseEvent) => {
      const target = ev.target as any
      if (target.getAttribute('data-role') === 'backdrop') {
        onClose()
      }
    })
    if (open) {
      if (!refs?.open) {
        refs?.showModal()
      }
    } else if (refs?.open) {
      refs?.setAttribute('closing', '')

      refs?.addEventListener('animationend', animationOnClose, {
        once: true,
      })
    }

    return () => {
      refs?.removeEventListener('animationend', animationOnClose)
      refs?.removeEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose()
        }
      })
      refs?.addEventListener('mousedown', (ev: MouseEvent) => {
        const target = ev.target as any
        if (target.getAttribute('data-role') === 'backdrop') {
          onClose()
        }
      })
    }
  }, [open, animationOnClose, onCancel, onClose])

  return (
    <StyledAlert
      ref={dialogRef}
      data-role="backdrop"
      variant={variant || 'success'}
      title={title}
      message={message}
    >
      <div className={`alert ${variant || ''}`}>
        <span className="alert-box-icon">
          {variant === 'success' && <CheckCircle className="icon" />}
          {variant === 'error' && <WarningCircle className="icon" />}
          {variant === 'warning' && <Question className="icon" />}
        </span>
        <div className="alert-box-message">
          <h3 className="text text-title">{title}</h3>
          <p className="text text-message">{message}</p>
        </div>
        <div className="alert-box-action">
          {onCancel && (
            <button type="button" className="button btn-cancel" onClick={onCancel}>
              {textCancel || 'Cancel'}
            </button>
          )}

          {onConfirm && (
            <button type="button" className="button btn-next" onClick={onConfirm}>
              {textConfirm || 'Yes, Sure'}
            </button>
          )}
        </div>
      </div>
    </StyledAlert>
  )
}

Alert.defaultProps = {
  onConfirm: undefined,
  open: false,
}

export default Alert
