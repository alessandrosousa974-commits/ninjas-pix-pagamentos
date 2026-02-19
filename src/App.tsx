import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import { Toaster } from 'sonner'
import Welcome from '@/pages/Welcome'
import Login from '@/pages/Login'
import RegisterProfessional from '@/pages/RegisterProfessional'
import RegisterCompany from '@/pages/RegisterCompany'
import Onboarding from '@/pages/Onboarding'
import Dashboard from '@/pages/Dashboard'
import Support from '@/pages/Support'
import Payments from '@/pages/Payments'
import PermissionsPage from '@/pages/PermissionsPage'
import Community from '@/pages/Community'
import Chat from '@/pages/Chat'
import E2EEDemo from '@/pages/E2EEDemo'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />
}

export function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login/:type" element={<Login />} />
        <Route path="/cadastro/professional" element={<RegisterProfessional />} />
        <Route path="/cadastro/company" element={<RegisterCompany />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/suporte" element={<Support />} />
        <Route path="/pagamentos" element={<Payments />} />
        <Route path="/permissions" element={<PermissionsPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/community"
          element={
            <PrivateRoute>
              <Community />
            </PrivateRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route path="/e2ee" element={<E2EEDemo />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster position="top-right" richColors />
    </AuthProvider>
  )
}

export default App