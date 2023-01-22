import * as React from 'react'
import styled from 'styled-components'

import { WLTPaginationProps } from './props/wltPaginationProps'
import IAWLTPagination from './css/wltCss'

const PaginationIcon = styled('button').attrs({
  type: 'button',
})`
  line-height: 0;
`

function IconOne({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      className={`${!className ? '' : className}`.trim()}
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 3.75L13.75 10L7.5 16.25"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconTwo({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      className={`${!className ? '' : className}`.trim()}
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.375 3.75L10.625 10L4.375 16.25"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.625 3.75L16.875 10L10.625 16.25"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const Pagination = React.forwardRef<HTMLDivElement, WLTPaginationProps>(function Pagination(
  props,
  ref,
) {
  const { palette = 'secondary', onChangePage, total, page, perPage, className } = props

  const totalPage = React.useMemo(
    () => parseInt(`${+total / perPage}`, 10) + (+total % perPage > 0 ? 1 : 0),
    [perPage, total],
  )

  function next() {
    if (page < totalPage) {
      onChangePage(page + 1)
    }
  }

  function last() {
    if (page < totalPage) {
      onChangePage(totalPage)
    }
  }

  function prev() {
    if (page > 1) {
      onChangePage(page - 1)
    }
  }

  function first() {
    if (page > 1) {
      onChangePage(1)
    }
  }

  return (
    <IAWLTPagination
      className={`IAWTLPagination-root IAWTLPagination-palette${palette}  ${
        !className ? '' : className
      }`.trim()}
      ref={ref}
      palette={palette}
    >
      <PaginationIcon
        className={`IAWTLPagination-icon IAWTLPagination-palette${palette} ${
          page <= 1 ? 'IAWTLPagination-iconDisabled' : ''
        }`.trim()}
        disabled={!!(page <= 1)}
        onClick={first}
      >
        <IconTwo
          className={`IAWTLPagination-icon-icon  ${
            page <= 1 ? 'IAWTLPagination-iconDisabled-icon' : ''
          }`.trim()}
        />
      </PaginationIcon>
      <PaginationIcon
        className={`IAWTLPagination-icon IAWTLPagination-palette${palette} ${
          page <= 1 ? 'IAWTLPagination-iconDisabled' : ''
        }`.trim()}
        disabled={!!(page <= 1)}
        onClick={prev}
      >
        <IconOne
          className={`IAWTLPagination-icon-icon  ${
            page <= 1 ? 'IAWTLPagination-iconDisabled-icon' : ''
          }`.trim()}
        />
      </PaginationIcon>
      <p className={`IAWTLPagination-label IAWTLPagination-palette${palette}`}>
        Page <span id="page">{page}</span> of <span id="totalPage">{totalPage}</span>
      </p>
      <PaginationIcon
        className={`IAWTLPagination-icon IAWTLPagination-palette${palette} ${
          page >= totalPage ? 'IAWTLPagination-iconDisabled' : ''
        }`.trim()}
        disabled={!!(page >= totalPage)}
        onClick={next}
      >
        <IconOne
          className={`IAWTLPagination-icon-icon IAWTLPagination-palette${palette} ${
            page >= totalPage ? 'IAWTLPagination-iconDisabled-icon' : ''
          }`.trim()}
        />
      </PaginationIcon>
      <PaginationIcon
        className={`IAWTLPagination-icon IAWTLPagination-palette${palette} ${
          page >= totalPage ? 'IAWTLPagination-iconDisabled' : ''
        }`.trim()}
        disabled={!!(page >= totalPage)}
        onClick={last}
      >
        <IconTwo
          className={`IAWTLPagination-icon-icon IAWTLPagination-palette${palette} ${
            page >= totalPage ? 'IAWTLPagination-iconDisabled-icon' : ''
          }`.trim()}
        />
      </PaginationIcon>
    </IAWLTPagination>
  )
})

export default Pagination
