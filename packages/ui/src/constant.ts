export type PaletteType = 'primary' | 'secondary' | 'info' | 'success' | 'error' | 'warning'
export type MaterialSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export const cssProps = [
  'padding',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'margin',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'overflow',
  'overflowX',
  'overflowY',
  'maxHeight',
  'maxWidth',
  'minHeight',
  'minWidth',
  'width',
  'height',
  'background',
  'backgroundColor',
  'backgroundPosition',
  'backgroundRepeat',
  'backgroundSize',
  'border',
  'cursor',
  'direction',
  'display',
  'position',
  'flex',
  'flexBasis',
  'flexDirection',
  'flexFlow',
  'flexGrow',
  'flexShrink',
  'flexWrap',
  'gap',
  'alignContent',
  'alignItems',
  'alignSelf',
  'color',
  'lineHeight',
  'letterSpacing',
  'textAlign',
  'textDecoration',
  'textIndent',
  'textTransform',
  'textOverflow',
  'overflow',
  'whiteSpace',
  'wordBreak',
  'wordSpacing',
  'wordWrap',
  'font',
  'fontFamily',
  'fontSize',
  'fontStyle',
  'fontVariant',
  'fontWeight',
]

export type BaseTextStyleProps = {
  color?: string
  lineHeight?: string
  letterSpacing?: string
  textAlign?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
  textDecoration?: string
  textIndent?: string
  textTransform?: string
  textOverflow?: string
  overflow?: string
  whiteSpace?: string
  wordBreak?: string
  wordSpacing?: string
  wordWrap?: string
}

export type BaseFontStyleProps = {
  font?: string
  fontFamily?: string
  fontSize?: string
  fontStyle?: string
  fontVariant?: string
  fontWeight?: string | number
}

export type BaseLayoutStyleProps = {
  padding?: string | number
  paddingBottom?: string | number
  paddingLeft?: string | number
  paddingRight?: string | number
  paddingTop?: string | number
  margin?: string | number
  marginBottom?: string | number
  marginLeft?: string | number
  marginRight?: string | number
  marginTop?: string | number
}

export type BaseDivStyleProps = {
  overflow?: string
  overflowX?: string
  overflowY?: string
  maxHeight?: string
  maxWidth?: string
  minHeight?: string
  minWidth?: string
  width?: string
  height?: string
  background?: string
  backgroundColor?: string
  backgroundPosition?: string
  backgroundRepeat?: string
  backgroundSize?: string
  border?: string
  cursor?: string
  direction?: string
}

export type BaseDisplayStyleProps = {
  display?: string
  position?: string
  flex?: string | number
  flexBasis?: string
  flexDirection?: string
  flexFlow?: string
  flexGrow?: string | number
  flexShrink?: string
  flexWrap?: string
  gap?: string | number
  alignContent?: string
  alignItems?: string
  alignSelf?: string
}
