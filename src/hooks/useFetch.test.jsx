import { renderHook } from '@testing-library/react-hooks'
import useFetch from './useFetch'
import { describe, beforeEach, it, expect } from 'vitest'
import fetchMocker from '../../vitest.setup'

describe('useFetch', () => {
    beforeEach(() => {
        fetchMocker.resetMocks()
    })

    it('should return data after a successful fetch', async () => {
        const mockData = { message: 'asdasds' }
        fetchMocker.mockResponseOnce(JSON.stringify(mockData))
        const { result, waitForNextUpdate } = renderHook(() => useFetch('https://www.algumacoisa.com'))
        expect(result.current.loading).toBe(true)
        expect(result.current.error).toBeNull()
        expect(result.current.data).toBeNull()
        await waitForNextUpdate()
        expect(result.current.loading).toBe(false)
        expect(result.current.error).toBeNull()
        expect(result.current.data).toEqual(mockData)
    })

    it('should handle fetch errors', async () => {
        fetchMocker.mockRejectOnce(new Error('error'))
        const { result, waitForNextUpdate } = renderHook(() => useFetch('https://www.algumacoisa.com'))
        expect(result.current.loading).toBe(true)
        expect(result.current.error).toBeNull()
        expect(result.current.data).toBeNull()
        await waitForNextUpdate()
        expect(result.current.loading).toBe(false)
        expect(result.current.error).toEqual(new Error('error'))
        expect(result.current.data).toBeNull()
    })

    it('should set loading to true while fetching data', async () => {
        const mockData = { message: 'loading test' }
        fetchMocker.mockResponseOnce(JSON.stringify(mockData))
        const { result } = renderHook(() => useFetch('https://www.algumacoisa.com'))
        expect(result.current.loading).toBe(true)
    })

    it('should transition loading from true to false after fetch completes', async () => {
        const mockData = { message: 'loading transition test' }
        fetchMocker.mockResponseOnce(JSON.stringify(mockData))
        const { result, waitForNextUpdate } = renderHook(() => useFetch('https://www.algumacoisa.com'))
        expect(result.current.loading).toBe(true)
        await waitForNextUpdate()
        expect(result.current.loading).toBe(false)
    })

    it('should keep loading true if fetch is delayed', async () => {
        fetchMocker.mockResponseOnce(JSON.stringify({ message: 'delayed response' }), { delay: 100 })
        const { result } = renderHook(() => useFetch('https://www.algumacoisa.com'))
        expect(result.current.loading).toBe(true)
    })

    it('should set loading to false even if fetch is aborted', async () => {
        fetchMocker.mockAbortOnce()
        const { result, waitForNextUpdate } = renderHook(() => useFetch('https://www.algumacoisa.com'))
        expect(result.current.loading).toBe(true)
        await waitForNextUpdate()
        expect(result.current.loading).toBe(false)
    })
})