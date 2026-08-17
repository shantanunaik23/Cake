import { Routes, Route } from 'react-router-dom'
import { OnboardingProvider } from './context/OnboardingContext.jsx'
import NavBar from './components/NavBar.jsx'
import Footer from './components/Footer.jsx'
import Landing from './pages/Landing.jsx'
import Onboarding from './pages/Onboarding.jsx'
import Plan from './pages/Plan.jsx'
import RecipeDetail from './pages/RecipeDetail.jsx'
import Pricing from './pages/Pricing.jsx'

export default function App() {
  return (
    <OnboardingProvider>
      <div className="flex min-h-screen flex-col bg-cream-50">
        <NavBar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/plan" element={<Plan />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/pricing" element={<Pricing />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </OnboardingProvider>
  )
}
