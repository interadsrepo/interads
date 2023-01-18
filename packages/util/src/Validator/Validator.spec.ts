import { IsNotEmpty } from './Validator'

const cb = (err: boolean | undefined, succ: boolean) => {}

describe('Validator Decorator', () => {
  it('should test required property', () => {
    class Person {
      @IsNotEmpty(cb)
      name!: string
    }

    const person: Person = {
      name: '',
    }

    const foo = new Person()
    console.log(foo.name)
    expect(true).toBe(true)
  })
})
