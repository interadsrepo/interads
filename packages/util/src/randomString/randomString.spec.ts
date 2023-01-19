import randomString from './randomString'

describe('randomString function', () => {
  it('should return a random string', () => {
    expect(randomString()).toEqual(expect.any(String))
    expect(randomString()).toHaveLength(5)
    expect(randomString(10)).toHaveLength(10)
    expect(randomString(26)).toHaveLength(26)
  })
})
