export const IsNotEmpty = (cb: (err: boolean | undefined, success: boolean) => void) => {
  return (target: any, foo: any) => {
    let currentValue: any = target[foo]
    Object.defineProperty(target, foo, {
      set: (newValue: any) => {
        currentValue = newValue
        const err = false
        const success = true
        cb(err, success)
      },
      get: () => currentValue,
    })
  }
}

export const IsNumber = () => {}
export const IsString = () => {}
export const IsBoolean = () => {}
