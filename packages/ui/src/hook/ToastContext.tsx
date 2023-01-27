import * as React from 'react'

interface ToastProps {
  id: number
  title: string
  description: string
  type: 'success' | 'error' | 'info'
}

export type ToastKind = 'ADD' | 'REMOVE'

interface ToastState {
  toasts: ToastProps[]
}

const INITIAL_STATE_TOAST: ToastState = {
  toasts: [],
}

interface ToastAction {
  type: ToastKind
  payload: ToastProps
}

const toastReducer: React.Reducer<ToastState, ToastAction> = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case 'ADD':
      return {
        ...state,
        toasts: [payload, ...state.toasts],
      }
    case 'REMOVE':
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== payload.id),
      }
    default:
      return state
  }
}

const useToastController = () => {
  const [toast, dispatch] = React.useReducer(toastReducer, INITIAL_STATE_TOAST)

  return {
    toast,
    dispatch,
  }
}

const ToastContext = React.createContext<ReturnType<typeof useToastController>>({
  toast: {
    toasts: [],
  },
  dispatch: () => {},
})

interface ToastContextProviderProps {
  children: React.ReactNode
}

const ToastProvider: React.FC<ToastContextProviderProps> = function ToastContextProvier({
  children,
}: ToastContextProviderProps) {
  return <ToastContext.Provider value={useToastController()}>{children}</ToastContext.Provider>
}

export const useToast = () => React.useContext(ToastContext)

export default ToastProvider
