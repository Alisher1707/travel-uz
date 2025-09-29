import { useState } from 'react'
import CityList from '../components/CityList'
import CityDetails from '../components/CityDetails'
import InteractiveMap from '../components/InteractiveMap'

function ExplorePage() {
  const [selectedCity, setSelectedCity] = useState(null)
  const [selectedPlace, setSelectedPlace] = useState(null)

  return (
    <>
      <header className="app-header">
        <h1>🇺🇿 O'zbekiston Sayohati</h1>
        <p>Mamlakatimizning go'zal shaharlari va tarixiy joylarini kashf eting</p>
      </header>

      <main className="app-main">
        <div className="sidebar">
          <CityList
            selectedCity={selectedCity}
            onCitySelect={setSelectedCity}
          />

          {selectedCity && (
            <CityDetails
              city={selectedCity}
              onPlaceSelect={setSelectedPlace}
            />
          )}
        </div>

        <div className="map-container">
          <InteractiveMap
            selectedCity={selectedCity}
            selectedPlace={selectedPlace}
            onCitySelect={setSelectedCity}
          />
        </div>
      </main>
    </>
  )
}

export default ExplorePage