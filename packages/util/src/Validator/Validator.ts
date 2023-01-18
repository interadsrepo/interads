export const IsNotEmpty = (cb: (err: boolean | undefined, success: boolean) => void) => {
  return (target: any, foo: any) => {
    let currentValue: any = target[foo]
    // console.log({ target, foo })
    Object.defineProperty(target, foo, {
      set: (newValue: any) => {
        currentValue = newValue
        const err = false
        const success = true
        cb(err, success)
      },
      get: () => currentValue,
    })
    // let currentValue: any = target[memberName]
    // console.log({ currentValue })

    // Object.defineProperty(target, memberName, {
    //   set: (newValue: any) => {
    //     if (!allowlist.includes(newValue)) {
    //       return
    //     }
    //     currentValue = newValue
    //   },
    //   get: () => currentValue,
    // })
  }
}

export const IsNumber = () => {}
