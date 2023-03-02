import * as React from 'react'
import { useToast } from '../hook'
import { CheckCircle, Question, WarningCircle } from '../icon'
import IAToast from './css'
import { ToastItemProps } from './props'

function ToastItem({ toast }: { toast: ToastItemProps }) {
  const [pause, setPause] = React.useState(false)
  const [expand, setExpand] = React.useState(false)
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

  const toggleExpand = () => {
    setExpand((prev) => !prev)
  }

  return (
    <React.Fragment key={toast.id}>
      <div
        onMouseEnter={() => setPause(true)}
        onMouseLeave={() => setPause(false)}
        className={`toast-notification toast ${toast.type} ${expand ? 'open' : ''}`}
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
        <div className="toast-action">
          <button onClick={toggleExpand} type="button" className="button btn-toast">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-caret-down"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M18 15l-6 -6l-6 6h12" transform="rotate(180 12 12)" />
            </svg>
          </button>
          <button
            type="button"
            className="button btn-toast"
            onClick={() =>
              dispatch({
                type: 'REMOVE',
                payload: toasts[toasts.length - 1],
              })
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-x"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
      <div className={`toast-expand ${toast.type} ${expand ? 'open' : ''}`.trim()}>
        <p className="text textExpand">{toast.description}</p>
      </div>
    </React.Fragment>
  )
}
const Toast: React.FC = function Toast() {
  const {
    toast: { toasts },
  } = useToast()

  return (
    <IAToast className="toast-container">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </IAToast>
  )
}

export default Toast
