// vitest.config.js
import createFetchMock from 'vitest-fetch-mock'
import { vi } from 'vitest'
import '@testing-library/dom'

const fetchMocker = createFetchMock(vi)
fetchMocker.enableMocks();
export default fetchMocker
