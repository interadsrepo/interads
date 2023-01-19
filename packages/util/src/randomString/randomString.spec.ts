import randomString from './randomString'

describe('randomString function', () => {
  it('should return a random string', () => {
    const rand1 = randomString()
    const rand2 = randomString(5)
    const rand3 = randomString(5, 'ascii')

    console.log({ rand2, rand3 })
    expect(rand1).toEqual(expect.any(String))
  })
})
