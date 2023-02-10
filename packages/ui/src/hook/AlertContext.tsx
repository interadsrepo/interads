import * as React from 'react'
import { AlertPropsBase } from '../Alert/props'
import Alert from '../Alert'

export const useAlertController = () => {
  const [alertProps, setAlertProps] = React.useState<AlertPropsBase | null>(null)

  const awaitingPromiseRef = React.useRef<{
    resolve: () => void
    reject: () => void
  }>()

  const openAlert = (option: AlertPropsBase) => {
    setAlertProps(option)
    return new Promise<void>((resolve, reject) => {
      awaitingPromiseRef.current = { resolve, reject }
    })
  }

  const handleClose = () => {
    setAlertProps(null)
  }
  const handleCancel = () => {
    if (alertProps?.catchOnCancel && awaitingPromiseRef.current) {
      awaitingPromiseRef.current.reject()
    }
    setAlertProps(null)
  }
  const handleSubmit = () => {
    if (awaitingPromiseRef.current) {
      awaitingPromiseRef.current.resolve()
    }

    setAlertProps(null)
  }

  return {
    alertProps,
    setAlertProps,
    awaitingPromiseRef,
    openAlert,
    handleClose,
    handleCancel,
    handleSubmit,
  }
}

const AlertContext = React.createContext<(option: AlertPropsBase) => Promise<void>>(Promise.reject)

interface AlertProviderProps {
  children: React.ReactNode
}

const AlertProvider: React.FC<AlertProviderProps> = function AlertProvider({
  children,
}: AlertProviderProps) {
  const { openAlert, alertProps, handleClose, handleCancel, handleSubmit } = useAlertController()
  return (
    <AlertContext.Provider value={openAlert}>
      {children}
      <Alert
        open={!!alertProps}
        variant={alertProps?.variant}
        option={{
          ...alertProps?.option,
          type: alertProps?.option?.type || 'default',
        }}
        title={alertProps?.title || ''}
        message={alertProps?.message || ''}
        textCancel={alertProps?.textCancel}
        textConfirm={alertProps?.textConfirm}
        onCancel={handleCancel}
        onConfirm={handleSubmit}
        onClose={handleClose}
      />
    </AlertContext.Provider>
  )
}

export default AlertProvider

export const useAlert = () => React.useContext(AlertContext)
