import { render, screen, cleanup } from '@testing-library/react'
import { describe, it, expect, afterEach } from 'vitest'
import { MapPopup } from './MapPopup'

describe('MapPopup Component', () => {
    const populationData = [
        { ano: 2020, populacao: 1000 },
        { ano: 2021, populacao: 1200 },
        { ano: 2022, populacao: 1500 }
    ]
    const neighborhoodName = 'Downtown'

    afterEach(() => {
        cleanup()
    })

    it('renders the neighborhood name correctly', () => {
        render(<MapPopup populationData={populationData} neighborhoodName={neighborhoodName} />)
        const titleElement = screen.getByTestId('map-popup-title')
        expect(titleElement).not.toBeNull()
        expect(titleElement.textContent).toBe(neighborhoodName)
    })

    it('renders the table headers correctly', () => {
        render(<MapPopup populationData={populationData} neighborhoodName={neighborhoodName} />)
        const yearHeader = screen.getByTestId('map-popup-header-year')
        expect(yearHeader).not.toBeNull()
        expect(yearHeader.textContent).toBe('Ano')

        const populationHeader = screen.getByTestId('map-popup-header-population')
        expect(populationHeader).not.toBeNull()
        expect(populationHeader.textContent).toBe('População')
    })

    it('renders the population data rows correctly', () => {
        render(<MapPopup populationData={populationData} neighborhoodName={neighborhoodName} />)
        populationData.forEach((data, index) => {
            const rowElement = screen.getByTestId(`map-popup-row-${index}`)
            expect(rowElement).not.toBeNull()

            const yearCell = screen.getByTestId(`map-popup-row-${index}-year`)
            expect(yearCell).not.toBeNull()
            expect(yearCell.textContent).toBe(data.ano.toString())

            const populationCell = screen.getByTestId(`map-popup-row-${index}-population`)
            expect(populationCell).not.toBeNull()
            expect(populationCell.textContent).toBe(data.populacao.toString())
        })
    })

    it('does not render any rows when populationData is empty', () => {
        render(<MapPopup populationData={[]} neighborhoodName={neighborhoodName} />)
        const rowElement = screen.queryByTestId('map-popup-row-0')
        expect(rowElement).toBeNull()
    })
})