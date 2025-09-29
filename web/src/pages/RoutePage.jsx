import RouteTab from '../components/RouteTab'

function RoutePage() {
  return (
    <>
      <header className="app-header">
        <h1>🇺🇿 O'zbekiston Sayohati</h1>
        <p>Mamlakatimizning go'zal shaharlari va tarixiy joylarini kashf eting</p>
      </header>

      <main className="app-main">
        <div className="route-container">
          <RouteTab />
        </div>
      </main>
    </>
  )
}

export default RoutePage