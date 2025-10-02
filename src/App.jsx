import { useState } from 'react'
import { Layout } from './components'
import { HomePage, ProjectsPage, ProfilePage } from './pages'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />
      case 'projects':
        return <ProjectsPage />
      case 'profile':
        return <ProfilePage />
      default:
        return <HomePage />
    }
  }

  return (
    <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </Layout>
  )
}

export default App
