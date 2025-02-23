import PropTypes from 'prop-types'
export function MapPopup({ populationData, neighborhoodName }) {
    return <>
        <div data-testid="map-popup-title"><strong>{neighborhoodName}</strong></div>
        <table>
            <thead>
                <tr>
                    <th data-testid="map-popup-header-year">Ano</th>
                    <th data-testid="map-popup-header-population">População</th>
                </tr>
            </thead>
            <tbody>
                {populationData.map((data, index) => (
                    <tr data-testid={`map-popup-row-${index}`} key={`${index}`}>
                        <td data-testid={`map-popup-row-${index}-year`}>{data.ano}</td>
                        <td data-testid={`map-popup-row-${index}-population`}>{data.populacao}</td>
                    </tr>)
                )}
            </tbody>
        </table>
    </>
}

MapPopup.propTypes = {
    populationData: PropTypes.array,
    neighborhoodName: PropTypes.string
}