import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Life from './pages/Life'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetail from './pages/ProjectDetail'
import LockedProject from './pages/LockedProject'
import ContactPage from './pages/ContactPage'
import ResumePage from './pages/ResumePage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/life" element={<Life />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/projects/:slug" element={<ProjectDetail />} />
      <Route path="/projects/:slug/locked" element={<LockedProject />} />
      <Route path="/resume" element={<ResumePage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
