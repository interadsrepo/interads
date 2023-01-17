import * as React from 'react'
import Head from 'next/head'
import {
  Box,
  Button,
  Grid,
  GridItem,
  IconButton,
  Input,
  InputField,
  TextView,
  UIThemeProvider,
  createTheme,
} from '@interads/ui'

import { Poppins } from '@next/font/google'

import { MagnifyingGlass, Question, UserCircle } from 'phosphor-react'

const inter = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const theme = createTheme({
  fontFamily: inter.style.fontFamily,
  palette: {
    primary: '#1E1E24',
    secondary: '#FF7F27',
  },

  button: {},
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
      <main style={{ width: '100vw' }}>
        <h1>Demo</h1>
        <UIThemeProvider theme={theme}>
          <Box padding="1rem" fullWidth>
            <Box>
              <TextView>aaaaaaaaaaaaaaaaaaaaaaaaa</TextView>{' '}
              <TextView>aaaaaaaaaaaaaaaaaaaaaaaaa</TextView>
            </Box>
            <Box marginBottom="1rem" display="flex" alignItems="center" gap="1rem">
              <Button type="button" palette="secondary" size="xs">
                <UserCircle weight="fill" />
                Button Theme
              </Button>
              <Button type="button" palette="secondary" variant="custom" size="sm">
                <UserCircle weight="fill" />
                Button Theme
              </Button>
              <Button type="button" palette="secondary" size="md">
                <UserCircle weight="fill" />
                Button Theme
              </Button>
              <Button type="button" palette="secondary" size="lg">
                <UserCircle weight="fill" />
                Button Theme
              </Button>
              <Button type="button" palette="secondary" size="xl">
                <UserCircle weight="fill" />
                Button Theme
              </Button>
            </Box>
            <Box marginBottom="1rem" display="flex" alignItems="center" gap="1rem">
              <Button type="button" palette="secondary" variant="outline" size="xs">
                <UserCircle weight="fill" />
                Button Theme
              </Button>
              <Button type="button" palette="secondary" variant="outline" size="sm">
                <UserCircle weight="fill" />
                Button Theme
              </Button>
              <Button type="button" palette="secondary" variant="outline" size="md">
                <UserCircle weight="fill" />
                Button Theme
              </Button>
              <Button type="button" palette="secondary" variant="outline" size="lg">
                <UserCircle weight="fill" />
                Button Theme
              </Button>
              <Button type="button" palette="secondary" variant="outline" size="xl">
                <UserCircle weight="fill" />
                Button Theme
              </Button>
            </Box>
            <Box marginBottom="1rem" display="flex" alignItems="center" gap="1rem">
              <IconButton type="button" palette="secondary" size="xs">
                <UserCircle weight="fill" />
              </IconButton>
              <IconButton type="button" palette="secondary" size="sm">
                <UserCircle weight="fill" />
              </IconButton>
              <IconButton type="button" palette="secondary" size="md">
                <UserCircle weight="fill" />
              </IconButton>
              <IconButton type="button" palette="secondary" size="lg">
                <UserCircle weight="fill" />
              </IconButton>
              <IconButton type="button" palette="secondary" size="xl">
                <UserCircle weight="fill" />
              </IconButton>
            </Box>
            <Box marginBottom="1rem" display="flex" alignItems="center" gap="1rem">
              <IconButton type="button" palette="secondary" variant="outline" size="xs">
                <UserCircle weight="fill" />
              </IconButton>
              <IconButton type="button" palette="secondary" variant="outline" size="sm">
                <UserCircle weight="fill" />
              </IconButton>
              <IconButton type="button" palette="secondary" variant="outline" size="md">
                <UserCircle weight="fill" />
              </IconButton>
              <IconButton type="button" palette="secondary" variant="outline" size="lg">
                <UserCircle weight="fill" />
              </IconButton>
              <IconButton type="button" palette="secondary" variant="outline" size="xl">
                <UserCircle weight="fill" />
              </IconButton>
            </Box>
            <Grid marginBottom="1rem" gap="1rem">
              <GridItem md={3}>
                <Input type="password" fullWidth autoFocus />
              </GridItem>
              <GridItem md={3}>
                <Input type="text" fullWidth autoFocus palette="primary" />
              </GridItem>
            </Grid>
            <Grid marginBottom="1rem" gap="1rem">
              <GridItem md={3}>
                <InputField
                  type="text"
                  fullWidth
                  autoFocus
                  iconHelp={<Question weight="fill" />}
                  title="Insert your domain here"
                  textHelp="Insert Url"
                  startAddOn="http://"
                />
              </GridItem>
              <GridItem md={3}>
                <InputField
                  type="text"
                  fullWidth
                  autoFocus
                  status="info"
                  startAdornment={<UserCircle />}
                  iconHelp={<Question weight="fill" />}
                  title="Woi"
                />
              </GridItem>
              <GridItem md={3}>
                <InputField
                  type="text"
                  fullWidth
                  autoFocus
                  status="warning"
                  endAdornment={<MagnifyingGlass />}
                  title="Woi"
                />
              </GridItem>
              <GridItem md={3}>
                <InputField
                  type="text"
                  fullWidth
                  autoFocus
                  status="error"
                  startAdornment={<UserCircle />}
                  iconHelp={<Question weight="fill" />}
                  title="Woi"
                  textHelp="Hallo"
                  startAddOn="Haloo"
                />
              </GridItem>
            </Grid>
          </Box>
        </UIThemeProvider>
      </main>
    </React.Fragment>
  )
}
