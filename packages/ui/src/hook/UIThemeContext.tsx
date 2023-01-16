import * as React from 'react'
import { DefaultTheme, ThemeProvider } from 'styled-components'
import { defaultTheme } from '../util/theme'

export const useThemeController = (inputTheme?: DefaultTheme) => {
  const [theme, setTheme] = React.useState<DefaultTheme | null>(inputTheme || null)

  return {
    theme,
    setTheme,
  }
}

const UIThemeContext = React.createContext<ReturnType<typeof useThemeController>>({
  theme: null,
  setTheme: () => {},
})

interface UIThemeProviderProps {
  children: React.ReactNode
  theme?: DefaultTheme
}

export const UIThemeProvider: React.FC<UIThemeProviderProps> = function UIThemeProvier(props) {
  const value = useThemeController(props.theme)
  return (
    <UIThemeContext.Provider value={value}>
      <UIThemeContext.Consumer>
        {({ theme }) => (
          <ThemeProvider theme={theme || defaultTheme}>{props.children}</ThemeProvider>
        )}
      </UIThemeContext.Consumer>
    </UIThemeContext.Provider>
  )
}

export default UIThemeProvider

export const useUITheme = () => React.useContext(UIThemeContext)
