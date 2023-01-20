import * as React from 'react'

import { ModalFootProps, ModalHeadProps, ModalProps, ModalBodyProps } from './props'
import IUModal, { IUModalBody, IUModalFoot, IUModalHead } from './css'
import { useUniqueId } from '../util/helper'

const Modal: React.FC<ModalProps> = function Modal(props: ModalProps) {
  const {
    open = false,
    palette = 'primary',
    size = 'md',
    variant = 'normal',
    fullWidth = false,
    disabled = false,
    scroll = 'body',
    outline = 'outline',
    round = false,
    className,
    onClose,
    children,
    ...rest
  } = props
  const unique = useUniqueId()
  React.useEffect(() => {
    const modalList = document.querySelector('.IAModal-root.show')
    if (open) {
      document.body.style.overflow = 'hidden'
    } else if (!modalList) {
      document.body.style.overflow = 'auto'
    }
    return () => {
      if (!modalList) {
        document.body.style.overflow = 'auto'
      }
    }
  }, [open])
  const onClick = (event: React.MouseEvent) => {
    const dataRole = (event.target as HTMLElement).getAttribute('data-role')
    if (dataRole === `IAModal-backdrop-${unique}`) {
      onClose()
    }
  }
  return (
    <IUModal
      role="presentation"
      data-role={`IAModal-backdrop-${unique}`}
      open={open}
      onClick={onClick}
      size={size}
      palette={palette}
      variant={variant}
      disabled={disabled}
      fullWidth={fullWidth}
      scroll={scroll}
      round={round}
      outline={outline}
      className={`IAModal-root IAModal-backdrop-${unique} ${open ? 'show' : ''} ${
        className || ''
      }`.trim()}
      {...rest}
    >
      <div style={{ display: 'block' }} data-test="sentinelStart" />
      <div
        className="IAModal-container"
        data-role={`IAModal-backdrop-${unique}`}
        role="presentation"
      >
        <div className="IAModal-content" role="dialog">
          {children}
        </div>
      </div>
      <div style={{ display: 'block' }} data-test="sentinelEnd" />
    </IUModal>
  )
}

export const ModalHead: React.FC<ModalHeadProps> = function ModalHead(props: ModalHeadProps) {
  const { children, className, ...rest } = props
  return (
    <IUModalHead className={`IAModal-head ${className}`} {...rest}>
      {children}
    </IUModalHead>
  )
}

export const ModalBody: React.FC<ModalBodyProps> = function ModalBody(props: ModalBodyProps) {
  const { children, className, ...rest } = props
  return (
    <IUModalBody className={`IAModal-body ${className}`} {...rest}>
      {children}
    </IUModalBody>
  )
}

export const ModalFoot: React.FC<ModalFootProps> = function ModalFoot(props: ModalFootProps) {
  const { children, className, ...rest } = props
  return (
    <IUModalFoot className={`IAModal-foot ${className}`} {...rest}>
      {children}
    </IUModalFoot>
  )
}
export default Modal

ModalHead.defaultProps = {
  flex: false,
}
ModalFoot.defaultProps = {
  flex: false,
}
