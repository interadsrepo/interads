import { renderHook, act, RenderHookResult } from '@testing-library/react'
import * as React from 'react'
import useDebounce, { UseDebounceReturn } from './useDebounce'

describe('useDebounce', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })
  afterEach(() => {
    jest.clearAllTimers()
  })
  afterAll(() => {
    jest.useRealTimers()
  })

  test('is return a function', () => {
    const { result } = renderHook(() => useDebounce(() => {}, 5))

    expect(result.current.length).toBe(1)
    expect(typeof result.current).toBe('function')
  })
})
