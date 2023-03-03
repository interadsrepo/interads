import { CheckCircle, WarningCircle, Question } from '../icon'

const iconLookup: { [key: string]: JSX.Element } = {
  success: <CheckCircle className="icon" />,
  error: <WarningCircle className="icon" />,
  warning: <Question className="icon" />,
  info: <WarningCircle className="icon" />,
}

export default function IconAlert({
  lookup,
}: {
  lookup: 'success' | 'warning' | 'error' | 'info'
}) {
  return iconLookup[lookup]
}
