import * as React from 'react'
import { AlertProps as AlertPropsBase } from '../material/Alert/props'
import Alert from '../material/Alert'

export const AlertController = () => {
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

// const AlertContext = React.createContext<ReturnType<typeof AlertController>>({
//   alertProps: null,
//   setAlertProps: () => {},
//   awaitingPromiseRef: { current: undefined },
//   openAlert: async () => {},
//   handleClose: () => {},
//   handleSubmit: () => {},
// })

export const AlertContext = React.createContext<(option: AlertPropsBase) => Promise<void>>(
  Promise.reject,
)

export const useAlert = () => React.useContext(AlertContext)

interface AlertContextProviderProps {
  children: React.ReactNode
}

export const AlertContextProvider: React.FC<AlertContextProviderProps> =
  function AlertContextProvider({ children }: AlertContextProviderProps) {
    const { openAlert, alertProps, handleClose, handleCancel, handleSubmit } = AlertController()
    return (
      <AlertContext.Provider value={openAlert}>
        {children}
        <Alert
          open={!!alertProps}
          variant={alertProps?.variant}
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
