export type PaletteTheme = {
  [key: string]: string
  primary: string
  secondary: string
  info: string
  success: string
  warning: string
  error: string
}

export type PaletteAdvanceTheme = {
  [key: string]: {
    [key: string]: string
    default: string
    light: string
  }
  primary: {
    [key: string]: string
    default: string
    light: string
  }
  secondary: {
    [key: string]: string
    default: string
    light: string
  }
  info: {
    [key: string]: string
    default: string
    light: string
  }
  success: {
    [key: string]: string
    default: string
    light: string
  }
  warning: {
    [key: string]: string
    default: string
    light: string
  }
  error: {
    [key: string]: string
    default: string
    light: string
  }
}

export const palette: PaletteTheme = {
  primary: '#19223F',
  error: '#FC4549',
  info: '#00C6FF',
  secondary: '#6e30ea',
  success: '#4CAF50',
  warning: '#FFC107',
}
export const paletteAdvance: PaletteAdvanceTheme = {
  primary: {
    default: '#19223F',
    light: '#fff',
  },
  error: {
    default: '#FC4549',
    light: '#fff',
  },
  info: {
    default: '#00C6FF',
    light: '#fff',
  },
  secondary: {
    default: '#6e30ea',
    light: '#fff',
  },
  success: {
    default: '#4CAF50',
    light: '#fff',
  },
  warning: {
    default: '#FFC107',
    light: '#fff',
  },
}
