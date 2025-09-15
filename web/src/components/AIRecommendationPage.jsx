import React, { useState } from 'react'
import AIForm from './AIForm'
import AIResults from './AIResults'
import './AIRecommendationPage.css'

const AIRecommendationPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [formData, setFormData] = useState(null)
  const [aiRecommendations, setAiRecommendations] = useState([])

  // Simulated AI recommendations based on form data
  const generateAIRecommendations = (data) => {
    const baseRoutes = {
      1: {
        budget: 'past',
        routes: [
          {
            id: 1,
            title: 'Klassik Samarqand',
            days: 1,
            description: 'Eng muhim tarixiy joylar',
            totalCost: 95000,
            places: ['Registon', 'Gur-Emir'],
            image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            highlights: ['UNESCO yodgorliklari', 'Foto sessiya', 'Tarix'],
            rating: 4.9,
            difficulty: 'Oson'
          }
        ]
      },
      2: {
        budget: 'orta',
        routes: [
          {
            id: 2,
            title: 'To\'liq Samarqand tajribasi',
            days: 2,
            description: 'Tarix va madaniyat kombinatsiyasi',
            totalCost: 285000,
            places: ['Registon', 'Shohizinda', 'Afrosiyob', 'Bibixonim'],
            image: 'https://images.unsplash.com/photo-1591123720526-94c4002817b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            highlights: ['Chuqur tarix', 'Me\'morchilik', 'Madaniyat'],
            rating: 4.8,
            difficulty: 'O\'rta'
          },
          {
            id: 3,
            title: 'Hunarmandchilik safari',
            days: 2,
            description: 'An\'anaviy san\'at va hunarmandchilik',
            totalCost: 195000,
            places: ['Qog\'oz zavodi', 'Abr fabrikasi', 'Kulolchilik', 'Bozorlar'],
            image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            highlights: ['Amaliy mashg\'ulotlar', 'Mahalliy ustalar', 'Sovg\'alar'],
            rating: 4.7,
            difficulty: 'Oson'
          }
        ]
      },
      3: {
        budget: 'yuqori',
        routes: [
          {
            id: 4,
            title: 'Premium Samarqand',
            days: 3,
            description: 'Luksus va eksklyuziv tajriba',
            totalCost: 485000,
            places: ['Barcha tarixiy joylar', 'Shaxsiy gid', 'VIP kirish', 'Restoran'],
            image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            highlights: ['Shaxsiy gid', 'Luksus transport', 'Premium restoran'],
            rating: 5.0,
            difficulty: 'Juda oson'
          },
          {
            id: 5,
            title: 'Kengaytirilgan marshrut',
            days: 3,
            description: 'Samarqand va atrofdagi joylar',
            totalCost: 385000,
            places: ['Samarqand', 'Penjakent', 'Urgut', 'Konigil'],
            image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            highlights: ['Keng ko\'lam', 'Tabiat', 'Mahalliy hayot'],
            rating: 4.6,
            difficulty: 'O\'rta'
          },
          {
            id: 6,
            title: 'Fotografiya safari',
            days: 3,
            description: 'Professional fotosessiya bilan',
            totalCost: 425000,
            places: ['Eng go\'zal joylar', 'Professional fotograf', 'Editing'],
            image: 'https://images.unsplash.com/photo-1542401886-65d6c61db217?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            highlights: ['Professional foto', 'Instagram content', 'Portfolio'],
            rating: 4.9,
            difficulty: 'Oson'
          }
        ]
      }
    }

    const seasonAdjustments = {
      'bahor': { bonus: 'Gul ochar vaqti', multiplier: 1.1 },
      'yoz': { bonus: 'Eng faol mavsum', multiplier: 1.2 },
      'kuz': { bonus: 'Eng yaxshi ob-havo', multiplier: 1.0 },
      'qish': { bonus: 'Arzon narxlar', multiplier: 0.8 }
    }

    const budgetLevel = data.budget === 'past' ? 1 : data.budget === 'orta' ? 2 : 3
    const routes = baseRoutes[data.days]?.routes || baseRoutes[budgetLevel]?.routes || baseRoutes[2].routes

    return routes.map(route => ({
      ...route,
      totalCost: Math.round(route.totalCost * seasonAdjustments[data.season].multiplier),
      seasonBonus: seasonAdjustments[data.season].bonus,
      aiRecommendation: true,
      matchScore: Math.floor(Math.random() * 20) + 80, // 80-100% match
      estimatedDays: data.days
    }))
  }

  const handleFormSubmit = async (data) => {
    setFormData(data)
    setIsLoading(true)

    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 3000))

    const recommendations = generateAIRecommendations(data)
    setAiRecommendations(recommendations)
    setIsLoading(false)
    setShowResults(true)
  }

  const handleNewSearch = () => {
    setShowResults(false)
    setFormData(null)
    setAiRecommendations([])
  }

  return (
    <div className="ai-recommendation-page">
      <div className="ai-header">
        <div className="header-content">
          <h1>🤖 AI Sayohat Maslahatchi</h1>
          <p>Sun'iy intellekt sizning ehtiyojlaringizga mos marshrutni tayyorlab beradi</p>
        </div>
      </div>

      <div className="ai-content">
        {!showResults ? (
          <AIForm onSubmit={handleFormSubmit} isLoading={isLoading} />
        ) : (
          <AIResults
            recommendations={aiRecommendations}
            formData={formData}
            onNewSearch={handleNewSearch}
          />
        )}
      </div>
    </div>
  )
}

export default AIRecommendationPage