import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import 'leaflet/dist/leaflet.css'
import React from 'react'
import { GeoJSON } from 'react-leaflet'
import useFetch from './hooks/useFetch'
import { Loading } from './components/Loading'
import { Error } from './components/Error'
import { renderToString } from 'react-dom/server'
import { MapPopup } from './components/map/MapPopup'

function App() {
  const { data: geojson, error: geojsonError, loading: geojsonLoading } = useFetch('/bairros-geojson')
  const { data: populationList, error: neighborhoodError, loading: neighborhoodsLoading } = useFetch('/populacao')

  const onEachFeature = React.useCallback((feature, layer) => {
    const neighborhoodId = feature.properties.id
    const neighborhoodName = feature.properties.name
    const populationData = populationList.filter(
      (population) => population.id_geometria === neighborhoodId
    )

    let popupContent = renderToString(<MapPopup neighborhoodName={neighborhoodName} populationData={populationData} />)


    layer.bindPopup(popupContent)
  }, [populationList])

  const loading = geojsonLoading || neighborhoodsLoading
  const error = geojsonError || neighborhoodError

  if (loading) return <Loading />
  if (error) return <Error />

  return (
    <div>
      <MapContainer
        style={{ height: '100vh' }}
        bounds={[[-23.234708, -45.928813], [-23.198917, -45.900761]]}
        zoom={15}
      >
        <TileLayer
          url="https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=BcCw9iWXRyBExU9XfTBr"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <GeoJSON
          data={geojson}
          style={{ color: '#6c58ff' }}
          onEachFeature={onEachFeature}
        />
      </MapContainer>
    </div>
  )
}

export default App
