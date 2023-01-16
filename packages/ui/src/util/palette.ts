export type PaletteTheme = {
  [key: string]: string
  primary: string
  secondary: string
  info: string
  success: string
  warning: string
  error: string
}

export const palette: PaletteTheme = {
  primary: '#19223F',
  error: '#FC4549',
  info: '#00C6FF',
  secondary: '#6e30ea',
  success: '#4CAF50',
  warning: '#FFC107',
}
