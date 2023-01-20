import deepClone from './deepClone'

describe('deepClose function', () => {
  it('should deep clone', () => {
    const obj1 = {
      fontFamily: 'sans-serif',
      color: {
        red: {
          50: '#FFEBEE',
          100: '#FFCDD2',
          200: '#EF9A9A',
          300: '#E57373',
          400: '#EF5350',
          500: '#F44336',
          600: '#E53935',
          700: '#D32F2F',
          800: '#C62828',
          900: '#B71C1C',
        },
      },
      button: {},
      palette: {
        primary: '#19223F',
        error: '#FC4549',
        info: '#00C6FF',
        secondary: '#6e30ea',
        success: '#4CAF50',
        warning: '#FFC107',
      },
    }

    expect(deepClone(obj1)).toEqual(obj1)
  })
})
