# `@interads/util`

> TODO: description

## Usage

CommonJS

```javascript

const { uriEncode } = require('@interads/util')

const obj = {
  page: 1,
  pageSize: 10,
  filter: {
    user: {
      name: 'john'
    }
  }
}

const encodedParams = uriEncode(obj)


```

CommonJS

```javascript

import { uriEncode } from '@interads/util'

const obj = {
  page: 1,
  pageSize: 10,
  filter: {
    user: {
      name: 'john'
    }
  }
}

const encodedParams = uriEncode(obj)


```