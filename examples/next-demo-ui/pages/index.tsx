import * as React from 'react'
import Head from 'next/head'
import Box from '@interads/ui/Box'
import Button from '@interads/ui/Button'
import Grid, { GridItem } from '@interads/ui/Grid'
import IconButton from '@interads/ui/IconButton'
import Input from '@interads/ui/Input'
import InputField from '@interads/ui/InputField'
import TextView from '@interads/ui/TextView'
import Tooltip from '@interads/ui/Tooltip'
import Modal, { ModalBody, ModalFoot, ModalHead } from '@interads/ui/Modal'
import { useAlert, useToast } from '@interads/ui/hook'
import { WLTPagination } from '@interads/ui/Private'
import CheckBox from '@interads/ui/CheckBox'

import { MagnifyingGlass, Question, UserCircle, Info } from 'phosphor-react'
import Link from 'next/link'

export default function Home() {
  const { dispatch } = useToast()
  const checkRef = React.useRef<null | HTMLInputElement>(null)
  const alert = useAlert()
  const [{ page, total, perPage }, setPaginate] = React.useState<{
    page: number
    perPage: number
    total: number
  }>({
    page: 1,
    perPage: 10,
    total: 100,
  })

  const openAlert = (variant: 'success' | 'error' | 'warning') => {
    alert({
      title: 'Alert!',
      message: 'Message of alert here!!!',
      variant,
      option: {
        icon: <Info weight="fill" className="icon" />,
      },
    }).then(() => {})
  }
  const [modal, setModal] = React.useState<string | null>(null)
  const [modalInside, setModalInside] = React.useState<boolean>(false)
  function toastError() {
    dispatch({
      type: 'ADD',
      payload: {
        description: 'description error',
        id: Math.random(),
        title: 'Error',
        type: 'error',
      },
    })
  }

  function toastInfo() {
    dispatch({
      type: 'ADD',
      payload: {
        description: 'description info',
        id: Math.random(),
        title: 'Info',
        type: 'info',
      },
    })
  }

  function toastSuccess() {
    dispatch({
      type: 'ADD',
      payload: {
        description: 'description success',
        id: Math.random(),
        title: 'Success',
        type: 'success',
      },
    })
  }

  return (
    <React.Fragment>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Box padding="1rem" fullWidth>
          <h1>Demo</h1>
          <Link href="/400">
            <IconButton type="button" palette="secondary" size="xs">
              <UserCircle weight="fill" />
            </IconButton>
          </Link>

          <CheckBox ref={checkRef} />
          <CheckBox disabled palette="primary" id="test" ref={checkRef} />
          <CheckBox disabled palette="info" ref={checkRef} />
          <Box>
            <TextView>Hello this is me</TextView>
          </Box>
          <Box>
            <Tooltip content="helo">
              <TextView>Hello hover me</TextView>
            </Tooltip>
          </Box>
          <Box marginBottom="1rem" flexWrap="wrap" display="flex" alignItems="center" gap="1rem">
            <Button type="button" palette="error" size="xs" onClick={toastError}>
              <UserCircle weight="fill" />
              Button Theme
            </Button>
            <Button type="button" palette="info" variant="custom" size="sm" onClick={toastInfo}>
              <UserCircle weight="fill" />
              Button Theme
            </Button>
            <Button type="button" palette="success" size="md" onClick={toastSuccess}>
              <UserCircle weight="fill" />
              Button Theme
            </Button>
            <Button type="button" palette="warning" size="lg">
              <UserCircle weight="fill" />
              Button Theme
            </Button>
            <Button type="button" palette="secondary" size="xl">
              <UserCircle weight="fill" />
              Button Theme
            </Button>
          </Box>
          <Box marginBottom="1rem" flexWrap="wrap" display="flex" alignItems="center" gap="1rem">
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
          <Box marginBottom="1rem" flexWrap="wrap" display="flex" alignItems="center" gap="1rem">
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
          <Box marginBottom="1rem" flexWrap="wrap" display="flex" alignItems="center" gap="1rem">
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
          <Grid breakpoints={10} marginBottom="1rem" gap="1rem">
            <GridItem md={2}>
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
            <GridItem md={2}>
              <InputField
                type="text"
                fullWidth
                autoFocus
                status="success"
                startAdornment={<UserCircle />}
                iconHelp={<Question weight="fill" />}
                title="Woi"
                textHelp="Hallo"
                startAddOn="Haloo"
              />
            </GridItem>
            <GridItem md={2}>
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
            <GridItem md={2}>
              <InputField
                type="text"
                fullWidth
                autoFocus
                status="warning"
                endAdornment={<MagnifyingGlass />}
                title="Woi"
              />
            </GridItem>
            <GridItem md={2}>
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
          <Grid marginBottom="1rem" gap="1rem">
            <GridItem md={4}>
              <Button palette="success" onClick={() => openAlert('success')} fullWidth>
                Success
              </Button>
            </GridItem>
            <GridItem md={4}>
              <Button palette="error" onClick={() => openAlert('error')} fullWidth>
                Error
              </Button>
            </GridItem>
            <GridItem md={4}>
              <Button palette="warning" onClick={() => openAlert('warning')} fullWidth>
                Warning
              </Button>
            </GridItem>
          </Grid>
          <Grid marginBottom="1rem" gap="1rem">
            <GridItem md={6}>
              <Button variant="outline" onClick={() => setModal('body')} fullWidth>
                Scroll Body
              </Button>
            </GridItem>
            <GridItem md={6}>
              <Button variant="outline" onClick={() => setModal('content')} fullWidth>
                Scroll Content
              </Button>
            </GridItem>
          </Grid>
          <WLTPagination
            page={page}
            perPage={perPage}
            total={total}
            onChangePage={(curr) => {
              setPaginate((prev) => ({
                ...prev,
                page: curr,
              }))
            }}
          />

          <WLTPagination
            page={page}
            perPage={perPage}
            total={total}
            palette="info"
            onChangePage={(curr) => {
              setPaginate((prev) => ({
                ...prev,
                page: curr,
              }))
            }}
          />
        </Box>

        <Modal open={modal === 'body'} round onClose={() => setModal(null)}>
          <ModalHead>Modal Scroll Head</ModalHead>
          <ModalBody>
            <TextView>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry&apps;s standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </TextView>
            <TextView>
              Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a
              piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard
              McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going
              through the cites of the word in classical literature, discovered the undoubtable
              source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of &quot;de Finibus
              Bonorum et Malorum&quot; (The Extremes of Good and Evil) by Cicero, written in 45 BC.
              This book is a treatise on the theory of ethics, very popular during the Renaissance.
              The first line of Lorem Ipsum, &quot;Lorem ipsum dolor sit amet..&quot;, comes from a
              line in section 1.10.32.
            </TextView>
            <TextView>
              The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those
              interested. Sections 1.10.32 and 1.10.33 from &quot;de Finibus Bonorum et
              Malorum&quot; by Cicero are also reproduced in their exact original form, accompanied
              by English versions from the 1914 translation by H. Rackham.
            </TextView>
            <TextView>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry&apps;s standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </TextView>
            <TextView>
              Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a
              piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard
              McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going
              through the cites of the word in classical literature, discovered the undoubtable
              source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of &quot;de Finibus
              Bonorum et Malorum&quot; (The Extremes of Good and Evil) by Cicero, written in 45 BC.
              This book is a treatise on the theory of ethics, very popular during the Renaissance.
              The first line of Lorem Ipsum, &quot;Lorem ipsum dolor sit amet..&quot;, comes from a
              line in section 1.10.32.
            </TextView>
            <TextView>
              The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those
              interested. Sections 1.10.32 and 1.10.33 from &quot;de Finibus Bonorum et
              Malorum&quot; by Cicero are also reproduced in their exact original form, accompanied
              by English versions from the 1914 translation by H. Rackham.
            </TextView>
          </ModalBody>
          <ModalFoot>Modal Scroll Foot</ModalFoot>
        </Modal>
        <Modal scroll="content" open={modal === 'content'} round onClose={() => setModal(null)}>
          <ModalHead>Modal Scroll Head</ModalHead>
          <ModalBody>
            <TextView>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry&apps;s standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </TextView>
            <TextView>
              Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a
              piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard
              McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going
              through the cites of the word in classical literature, discovered the undoubtable
              source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of &quot;de Finibus
              Bonorum et Malorum&quot; (The Extremes of Good and Evil) by Cicero, written in 45 BC.
              This book is a treatise on the theory of ethics, very popular during the Renaissance.
              The first line of Lorem Ipsum, &quot;Lorem ipsum dolor sit amet..&quot;, comes from a
              line in section 1.10.32.
            </TextView>
            <TextView>
              The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those
              interested. Sections 1.10.32 and 1.10.33 from &quot;de Finibus Bonorum et
              Malorum&quot; by Cicero are also reproduced in their exact original form, accompanied
              by English versions from the 1914 translation by H. Rackham.
            </TextView>
            <TextView>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry&apps;s standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </TextView>
            <TextView>
              Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a
              piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard
              McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going
              through the cites of the word in classical literature, discovered the undoubtable
              source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of &quot;de Finibus
              Bonorum et Malorum&quot; (The Extremes of Good and Evil) by Cicero, written in 45 BC.
              This book is a treatise on the theory of ethics, very popular during the Renaissance.
              The first line of Lorem Ipsum, &quot;Lorem ipsum dolor sit amet..&quot;, comes from a
              line in section 1.10.32.
            </TextView>
            <TextView>
              The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those
              interested. Sections 1.10.32 and 1.10.33 from &quot;de Finibus Bonorum et
              Malorum&quot; by Cicero are also reproduced in their exact original form, accompanied
              by English versions from the 1914 translation by H. Rackham.
            </TextView>
            <Button variant="outline" onClick={() => setModalInside(true)} fullWidth>
              Scroll Content
            </Button>
          </ModalBody>
          <ModalFoot>Modal Scroll Foot</ModalFoot>
        </Modal>
        <Modal
          scroll="content"
          size="xs"
          open={modalInside}
          round
          onClose={() => setModalInside(false)}
        >
          <ModalHead>Modal Scroll Head</ModalHead>
          <ModalBody>
            <TextView>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry&apps;s standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </TextView>
          </ModalBody>
          <ModalFoot>Modal Scroll Foot</ModalFoot>
        </Modal>
      </main>
    </React.Fragment>
  )
}
