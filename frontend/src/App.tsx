import { Link, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Targets from './pages/Targets'
import Scans from './pages/Scans'

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

function Login() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="cyber-card w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input type="text" className="cyber-input" placeholder="Enter username" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input type="password" className="cyber-input" placeholder="Enter password" />
          </div>
          <button type="submit" className="cyber-button w-full">
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

function Dashboard() {
  const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold cyber-text-gradient">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="cyber-card">
          <h3 className="text-muted-foreground text-sm">Total Scans</h3>
          <p className="text-3xl font-bold mt-2">1,284</p>
        </div>
        <div className="cyber-card">
          <h3 className="text-muted-foreground text-sm">Active Targets</h3>
          <p className="text-3xl font-bold mt-2">342</p>
        </div>
        <div className="cyber-card">
          <h3 className="text-muted-foreground text-sm">Reports Generated</h3>
          <p className="text-3xl font-bold mt-2">567</p>
        </div>
        <div className="cyber-card">
          <h3 className="text-muted-foreground text-sm">Vulnerabilities</h3>
          <p className="text-3xl font-bold mt-2 text-cyber-accent">89</p>
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/targets" element={<Targets />} />
          <Route path="/scans" element={<Scans />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </div>
  )
}