export type Color = {
  [key: number]: string
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
}

export type ColorTheme = {
  [key: string]: Color
  red: Color
  pink: Color
  purple: Color
  deepPurple: Color
  indigo: Color
  blue: Color
  lightBlue: Color
  cyan: Color
  teal: Color
  green: Color
  lightGreen: Color
  lime: Color
  yellow: Color
  amber: Color
  orange: Color
  deepOrange: Color
  brown: Color
  gray: Color
  black: Color
}

export const red: Color = {
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
}

export const pink: Color = {
  50: '#FCE4EC',
  100: '#F8BBD0',
  200: '#F48FB1',
  300: '#F06292',
  400: '#EC407A',
  500: '#E91E63',
  600: '#D81B60',
  700: '#C2185B',
  800: '#AD1457',
  900: '#880E4F',
}

export const purple: Color = {
  50: '#F3E5F5',
  100: '#E1BEE7',
  200: '#CE93D8',
  300: '#BA68C8',
  400: '#AB47BC',
  500: '#9C27B0',
  600: '#8E24AA',
  700: '#7B1FA2',
  800: '#6A1B9A',
  900: '#4A148C',
}

export const deepPurple: Color = {
  50: '#EDE7F6',
  100: '#D1C4E9',
  200: '#B39DDB',
  300: '#9575CD',
  400: '#7E57C2',
  500: '#673AB7',
  600: '#9C27B0',
  700: '#512DA8',
  800: '#4527A0',
  900: '#311B92',
}

export const indigo: Color = {
  50: '#E8EAF6',
  100: '#C5CAE9',
  200: '#9FA8DA',
  300: '#7986CB',
  400: '#5C6BC0',
  500: '#3F51B5',
  600: '#3949AB',
  700: '#303F9F',
  800: '#283593',
  900: '#1A237E',
}

export const blue: Color = {
  50: '#E8EAF6',
  100: '#C5CAE9',
  200: '#9FA8DA',
  300: '#7986CB',
  400: '#5C6BC0',
  500: '#3F51B5',
  600: '#3949AB',
  700: '#303F9F',
  800: '#283593',
  900: '#1A237E',
}

export const lightBlue: Color = {
  50: '#E1F5FE',
  100: '#B3E5FC',
  200: '#81D4FA',
  300: '#4FC3F7',
  400: '#29B6F6',
  500: '#03A9F4',
  600: '#039BE5',
  700: '#0288D1',
  800: '#0277BD',
  900: '#01579B',
}

export const cyan: Color = {
  50: '#E0F7FA',
  100: '#B2EBF2',
  200: '#B2EBF2',
  300: '#4DD0E1',
  400: '#26C6DA',
  500: '#00BCD4',
  600: '#00ACC1',
  700: '#0097A7',
  800: '#00838F',
  900: '#006064',
}

export const teal: Color = {
  50: '#E0F2F1',
  100: '#B2DFDB',
  200: '#80CBC4',
  300: '#4DB6AC',
  400: '#26A69A',
  500: '#009688',
  600: '#00897B',
  700: '#00ACC1',
  800: '#00695C',
  900: '#004D40',
}

export const green: Color = {
  50: '#E8F5E9',
  100: '#C8E6C9',
  200: '#A5D6A7',
  300: '#81C784',
  400: '#66BB6A',
  500: '#4CAF50',
  600: '#43A047',
  700: '#388E3C',
  800: '#2E7D32',
  900: '#1B5E20',
}

export const lightGreen: Color = {
  50: '#F1F8E9',
  100: '#DCEDC8',
  200: '#C5E1A5',
  300: '#AED581',
  400: '#9CCC65',
  500: '#8BC34A',
  600: '#7CB342',
  700: '#689F38',
  800: '#558B2F',
  900: '#33691E',
}

export const lime: Color = {
  50: '#F9FBE7',
  100: '#F0F4C3',
  200: '#E6EE9C',
  300: '#DCE775',
  400: '#D4E157',
  500: '#CDDC39',
  600: '#C0CA33',
  700: '#AFB42B',
  800: '#9E9D24',
  900: '#827717',
}

export const yellow: Color = {
  50: '#FFFDE7',
  100: '#FFF9C4',
  200: '#FFF59D',
  300: '#FFEE58',
  400: '#FFEB3B',
  500: '#FDD835',
  600: '#FBC02D',
  700: '#F9A825',
  800: '#F9A825',
  900: '#F57F17',
}

export const amber: Color = {
  50: '#FFF8E1',
  100: '#FFECB3',
  200: '#FFE082',
  300: '#FFD54F',
  400: '#FFCA28',
  500: '#FFC107',
  600: '#FFB300',
  700: '#FFA000',
  800: '#FF8F00',
  900: '#FF6F00',
}

export const orange: Color = {
  50: '#FFF3E0',
  100: '#FFE0B2',
  200: '#FFCC80',
  300: '#FFB74D',
  400: '#FFA726',
  500: '#FF9800',
  600: '#FB8C00',
  700: '#F57C00',
  800: '#EF6C00',
  900: '#E65100',
}

export const deepOrange: Color = {
  50: '#FBE9E7',
  100: '#FFCCBC',
  200: '#FFAB91',
  300: '#FF8A65',
  400: '#FF7043',
  500: '#FF5722',
  600: '#F4511E',
  700: '#E64A19',
  800: '#D84315',
  900: '#BF360C',
}

export const brown: Color = {
  50: '#EFEBE9',
  100: '#D7CCC8',
  200: '#BCAAA4',
  300: '#A1887F',
  400: '#8D6E63',
  500: '#795548',
  600: '#6D4C41',
  700: '#5D4037',
  800: '#4E342E',
  900: '#3E2723',
}

export const gray: Color = {
  50: '#FAFAFA',
  100: '#F5F5F5',
  200: '#EEEEEE',
  300: '#E0E0E0',
  400: '#BDBDBD',
  500: '#9E9E9E',
  600: '#757575',
  700: '#616161',
  800: '#424242',
  900: '#212121',
}

export const black: Color = {
  50: '#ECEFF1',
  100: '#CFD8DC',
  200: '#B0BEC5',
  300: '#90A4AE',
  400: '#78909C',
  500: '#607D8B',
  600: '#546E7A',
  700: '#455A64',
  800: '#37474F',
  900: '#263238',
}

const IAColor = {
  red,
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  green,
  lightGreen,
  lime,
  yellow,
  amber,
  orange,
  deepOrange,
  brown,
  gray,
  black,
}

export default IAColor
