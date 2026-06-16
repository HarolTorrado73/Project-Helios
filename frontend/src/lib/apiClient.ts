import axios from 'axios'
import { useAuthStore } from '../stores/scanStore'

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const endpoints = {
  auth: {
    login: '/api/v1/auth/login',
    register: '/api/v1/auth/register',
    refresh: '/api/v1/auth/refresh',
    logout: '/api/v1/auth/logout',
  },
  users: {
    me: '/api/v1/users/me',
  },
  targets: {
    list: '/api/v1/targets',
    create: '/api/v1/targets',
  },
  scans: {
    list: '/api/v1/scans',
    create: '/api/v1/scans',
  },
  reports: {
    list: '/api/v1/reports',
    create: '/api/v1/reports',
    download: (id: number) => `/api/v1/reports/${id}/download`,
    generate: (id: number) => `/api/v1/reports/${id}/generate`,
  },
}