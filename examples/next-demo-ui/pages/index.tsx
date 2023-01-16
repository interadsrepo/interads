import * as React from 'react'
import Head from 'next/head'
import { Button, UIThemeProvider, createTheme } from '@interads/ui'

const theme = createTheme({
  palette: {
    primary: 'blue',
  },
})

export default function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Demo</h1>
        <UIThemeProvider theme={theme}>
          <Button type="button" disabled>Button Theme</Button>
        </UIThemeProvider>
        <Button type="submit">Button</Button>
      </main>
    </React.Fragment>
  )
}