import * as React from 'react'
import { AlertPropsBase } from './props'
import StyledAlert from './css'
import IconAlert from './IconAlert'
import ActionAlert from './ActionAlert'

export interface AlertProps extends AlertPropsBase {
  open?: boolean
  onConfirm?: () => void
  onCancel: () => void
  onClose: () => void
}

const Alert: React.FC<AlertProps> = function Alert({
  variant = 'success',
  title,
  message,
  textCancel,
  textConfirm,

  onCancel,
  onConfirm,
  onClose,
  open,
  option,
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
      variant={variant}
      title={title}
      message={message}
    >
      <div className={`alert ${variant || ''} ${option?.type || ''}`.trim()}>
        <span className="alert-box-icon">
          {option?.icon ? option.icon : <IconAlert lookup={variant} />}
        </span>
        <div className="alert-box-message">
          <h3 className="text text-title">{title}</h3>
          <p className="text text-message">{message}</p>
        </div>
        <ActionAlert
          lookup={option?.type || 'default'}
          onCancel={onCancel}
          onConfirm={onConfirm}
          textCancel={textCancel}
          textConfirm={textConfirm}
        />
      </div>
    </StyledAlert>
  )
}

Alert.defaultProps = {
  onConfirm: undefined,
  open: false,
}

export default Alert
