import mergeDeep from './mergeDeep'

describe('mergeDeep function', () => {
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

    const obj2 = {
      fontFamily: 'Poppins',
      palette: {
        primary: '#252525',
      },
      button: {
        root: {
          borderRadius: '10px',
        },
      },
    }

    const mergedObj = mergeDeep(obj1, obj2)

    expect(mergedObj).toEqual({
      fontFamily: 'Poppins',
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
      palette: {
        primary: '#252525',
        error: '#FC4549',
        info: '#00C6FF',
        secondary: '#6e30ea',
        success: '#4CAF50',
        warning: '#FFC107',
      },
      button: {
        root: {
          borderRadius: '10px',
        },
      },
    })
  })
})
