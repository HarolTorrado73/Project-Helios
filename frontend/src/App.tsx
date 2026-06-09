import { Link, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

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

      <div className="cyber-card max-w-4xl mx-auto text-left mt-12">
        <h2 className="text-xl font-bold mb-4 text-cyber-blue">Features</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• SOC Dashboard: Real-time security operations center with animated visualizations</li>
          <li>• Target Management: Multi-type target support (IP, Domain, CIDR)</li>
          <li>• Nmap Integration: Full-featured scanner engine with parallel execution</li>
          <li>• Report Generation: PDF, CSV, and JSON exports with executive summaries</li>
          <li>• Audit Trail: Complete activity logging for compliance</li>
          <li>• Role-Based Access: Admin, Analyst, and Viewer roles</li>
          <li>• REST API: Versioned OpenAPI documentation</li>
          <li>• Real-time Updates: WebSocket-powered live monitoring</li>
        </ul>
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
        <h3 className="text-lg font-bold mb-4">API Access</h3>
        <p className="text-muted-foreground mb-2">
          Backend API docs: <a href={`${backendUrl}/api/v1/docs`} className="text-cyber-blue hover:underline" target="_blank" rel="noopener noreferrer">{backendUrl}/api/v1/docs</a>
        </p>
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
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </div>
  )
}
