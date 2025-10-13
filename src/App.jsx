import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext.jsx'
import Navigation from './components/Navigation/Navigation.jsx'
import HomePage from './pages/HomePage/HomePage.jsx'
import ProjectsPage from './pages/ProjectsPage/ProjectsPage.jsx'
import ProjectDetailPage from './pages/ProjectDetailPage/ProjectDetailPage.jsx'
import ProfilePage from './pages/ProfilePage/ProfilePage.jsx'
import './App.css'

function App() {
  return (
    <AppProvider>
      <Router>
        <div>
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:id" element={<ProjectDetailPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AppProvider>
  )
}

export default App
