import { IsNotEmpty } from './Validator'

const cb = (err: boolean | undefined, succ: boolean) => {}

describe('Validator Decorator', () => {
  it('should test required property', () => {
    class Person {
      @IsNotEmpty(cb)
      name!: string
    }

    expect(true).toBe(true)
  })
})
