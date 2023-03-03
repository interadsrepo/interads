type DefaultActionProps = {
  onCancel?: () => void
  onConfirm?: () => void
  textCancel?: string
  textConfirm?: string
}

function DefaultAction({ onCancel, onConfirm, textCancel, textConfirm }: DefaultActionProps) {
  return (
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
  )
}

type BackOnlyActionProps = {
  onCancel?: () => void
  textCancel?: string
}
function BackOnlyAction({ onCancel, textCancel }: BackOnlyActionProps) {
  return (
    <div className="alert-box-action">
      {onCancel && (
        <button type="button" className="button btn-next" onClick={onCancel}>
          {textCancel || 'Cancel'}
        </button>
      )}
    </div>
  )
}

type DoneOnlyActionProps = {
  onConfirm?: () => void
  textConfirm?: string
}
function DoneOnlyAction({ onConfirm, textConfirm }: DoneOnlyActionProps) {
  return (
    <div className="alert-box-action">
      {onConfirm && (
        <button type="button" className="button btn-next" onClick={onConfirm}>
          {textConfirm || 'Yes, Sure'}
        </button>
      )}
    </div>
  )
}

export const actionLookup: {
  [key: string]: (props: DefaultActionProps) => JSX.Element
} = {
  default: DefaultAction,
  backOnly: BackOnlyAction,
  doneOnly: DoneOnlyAction,
}

export default function ActionAlert({
  lookup,
  ...rest
}: {
  lookup: string
  onCancel?: () => void
  onConfirm?: () => void
  textCancel?: string
  textConfirm?: string
}) {
  const Action = actionLookup[lookup]
  return <Action {...rest} />
}
