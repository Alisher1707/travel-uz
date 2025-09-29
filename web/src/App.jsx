import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ExplorePage from './pages/ExplorePage'
import RoutePage from './pages/RoutePage'
import CityPage from './pages/CityPage'
import CityRoutePage from './pages/CityRoutePage'

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/route" element={<RoutePage />} />
            <Route path="/city/:id" element={<CityPage />} />
            <Route path="/route/:cityId" element={<CityRoutePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App