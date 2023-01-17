import { uriEncode } from './uriEncode'

describe('uriEncode unit test', () => {
  const dataTest = {
    page: 1,
    page_size: 10,
    filter: {
      name: 'some name',
      email: 'test@email.com',
      username: 'someName__',
      address: {
        streetAddress1: 'sdr1',
        streetAddress2: 'sdr2',
      },
    },
  }

  it('should return uri encoded string', () => {
    expect(uriEncode(dataTest)).toEqual(
      'page=1&page_size=10&filter[name]=some name&filter[email]=test@email.com&filter[username]=someName__&filter[address][streetAddress1]=sdr1&filter[address][streetAddress2]=sdr2',
    )
  })
})
