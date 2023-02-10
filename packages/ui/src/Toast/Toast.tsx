import * as React from 'react'
import { useToast } from '../hook'
import { CheckCircle, Question, WarningCircle } from '../icon'
import IAToast from './css'

const Toast: React.FC = function Toast() {
  const [pause, setPause] = React.useState(false)
  const {
    toast: { toasts },
    dispatch,
  } = useToast()

  React.useEffect(() => {
    let interval: NodeJS.Timer
    if (!pause) {
      interval = setInterval(() => {
        if (toasts.length) {
          dispatch({
            type: 'REMOVE',
            payload: toasts[toasts.length - 1],
          })
        }
      }, 2000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [toasts, dispatch, pause])

  return (
    <IAToast className="toast-container">
      {toasts.map((toast) => (
        <div
          onMouseEnter={() => setPause(true)}
          onMouseLeave={() => setPause(false)}
          key={toast.id}
          className={`toast-notification toast ${toast.type} `}
        >
          <span className="toast-icon">
            {toast.type === 'success' && <CheckCircle weight="fill" className="icon" />}
            {toast.type === 'error' && <WarningCircle weight="fill" className="icon" />}
            {toast.type === 'info' && <Question weight="fill" className="icon" />}
          </span>
          <div className="toast-information">
            <h3 className="text text-toast-title">{toast.title}</h3>
            <p className="text text-toast-desc">{toast.description}</p>
          </div>
          {/* <button
            type="button"
            className="button btn-toast"
            onClick={() =>
              dispatch({
                type: 'REMOVE',
                payload: toasts[toasts.length - 1],
              })
            }
          >
          </button> */}
        </div>
      ))}
    </IAToast>
  )
}

export default Toast
