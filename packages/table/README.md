# `@interads/ui`

# Installation

```bash

  $ npm install @interads/table styled-components tinycolor2

```

## Usage

```javascript

import { createColumnHelper, useTable } from '@interads/table/builder'
import { Table } from '@interads/table/wowscreen'



type Person = {
  personId: number
  name: string
  email: string
  confirmed: boolean
}

const data: Person[] = [
  {
    personId: 1,
    confirmed: false,
    email: 'test1@email.com',
    name: 'test 1 user',
  },
]

const columnHelper = createColumnHelper<Person>()

const columns = [
  columnHelper.accessor('name', {
    // ... options like head, column, etc
  })
]


function App() {
  const table = useTable({
    data,
    columns
  })
  return (
    <section>
      <Table table={table} />
    </section>
  )
}

```