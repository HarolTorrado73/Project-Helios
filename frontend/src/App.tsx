import { useEffect, useState } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import Targets from './pages/Targets'
import Scans from './pages/Scans'
import Sessions from './pages/Sessions'
import { apiClient, endpoints } from './lib/apiClient'

interface Stats {
  users: number
  machines: number
  sessions: number
  activeSessions: number
  reports: number
  targets: number
  scans: number
}

function Home() {
  return (
    <div className="py-20 text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-5xl font-extrabold cyber-text-gradient">
          SentinelRecon
        </h1>
        <p className="text-xl text-muted-foreground max-w-xl mx-auto">
          Next-Generation Security Reconnaissance Platform for modern SOC environments
        </p>
      </div>

      <div className="flex gap-4 justify-center mt-10">
        <Link to="/login" className="cyber-button">
          Login
        </Link>
        <Link to="/dashboard" className="cyber-button bg-cyber-accent text-white">
          Dashboard
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="cyber-card">
          <h3 className="text-cyber-blue font-bold mb-2">Real-time Monitoring</h3>
          <p className="text-muted-foreground text-sm">
            Live security dashboards with animated visualizations and instant alerts
          </p>
        </div>
        <div className="cyber-card">
          <h3 className="text-cyber-blue font-bold mb-2">Automated Scanning</h3>
          <p className="text-muted-foreground text-sm">
            Parallel Nmap execution with comprehensive vulnerability detection
          </p>
        </div>
        <div className="cyber-card">
          <h3 className="text-cyber-blue font-bold mb-2">Professional Reports</h3>
          <p className="text-muted-foreground text-sm">
            PDF, CSV, JSON exports with executive summaries and compliance data
          </p>
        </div>
      </div>
    </div>
  )
}

function Dashboard() {
  const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
  const [stats, setStats] = useState<Stats>({
    users: 0,
    machines: 0,
    sessions: 0,
    activeSessions: 0,
    reports: 0,
    targets: 0,
    scans: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true)
      try {
        const [users, targets, scans, sessions, reports] = await Promise.all([
          apiClient.get(endpoints.users.me).catch(() => null),
          apiClient.get(endpoints.targets.list).catch(() => null),
          apiClient.get(endpoints.scans.list).catch(() => null),
          apiClient.get(endpoints.sessions.list).catch(() => null),
          apiClient.get(endpoints.reports.list).catch(() => null),
        ])

        setStats({
          users: users?.data ? 1 : 0,
          machines: 0,
          sessions: sessions?.data?.length ?? 0,
          activeSessions: sessions?.data?.filter((s: any) => s.status === 'active').length ?? 0,
          reports: reports?.data?.length ?? 0,
          targets: targets?.data?.length ?? 0,
          scans: scans?.data?.length ?? 0,
        })
      } catch {
        setStats({
          users: 0,
          machines: 0,
          sessions: 0,
          activeSessions: 0,
          reports: 0,
          targets: 0,
          scans: 0,
        })
      }
      setLoading(false)
    }
    loadStats()
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold cyber-text-gradient">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="cyber-card">
          <h3 className="text-muted-foreground text-sm">Total Users</h3>
          <p className="text-3xl font-bold mt-2">{loading ? '-' : stats.users}</p>
        </div>
        <div className="cyber-card">
          <h3 className="text-muted-foreground text-sm">Total Machines</h3>
          <p className="text-3xl font-bold mt-2">{loading ? '-' : stats.machines}</p>
        </div>
        <div className="cyber-card">
          <h3 className="text-muted-foreground text-sm">Total Sessions</h3>
          <p className="text-3xl font-bold mt-2">{loading ? '-' : stats.sessions}</p>
        </div>
        <div className="cyber-card">
          <h3 className="text-muted-foreground text-sm">Active Sessions</h3>
          <p className="text-3xl font-bold mt-2 text-cyber-accent">
            {loading ? '-' : stats.activeSessions}
          </p>
        </div>
        <div className="cyber-card">
          <h3 className="text-muted-foreground text-sm">Total Targets</h3>
          <p className="text-3xl font-bold mt-2">{loading ? '-' : stats.targets}</p>
        </div>
        <div className="cyber-card">
          <h3 className="text-muted-foreground text-sm">Total Scans</h3>
          <p className="text-3xl font-bold mt-2">{loading ? '-' : stats.scans}</p>
        </div>
        <div className="cyber-card">
          <h3 className="text-muted-foreground text-sm">Total Reports</h3>
          <p className="text-3xl font-bold mt-2">{loading ? '-' : stats.reports}</p>
        </div>
        <div className="cyber-card">
          <h3 className="text-muted-foreground text-sm">System Status</h3>
          <p className="text-3xl font-bold mt-2 text-green-500">Healthy</p>
        </div>
      </div>
      <div className="cyber-card">
        <h3 className="text-lg font-bold mb-4">Quick Links</h3>
        <div className="flex gap-4">
          <Link to="/targets" className="cyber-button">
            Manage Targets
          </Link>
          <Link to="/scans" className="cyber-button">
            View Scans
          </Link>
          <Link to="/sessions" className="cyber-button">
            View Sessions
          </Link>
          <a
            href={`${backendUrl}/api/v1/docs`}
            className="cyber-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            API Docs
          </a>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-cyber-dark">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/targets"
            element={
              <ProtectedRoute>
                <Targets />
              </ProtectedRoute>
            }
          />
          <Route
            path="/scans"
            element={
              <ProtectedRoute>
                <Scans />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sessions"
            element={
              <ProtectedRoute>
                <Sessions />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </div>
  )
}