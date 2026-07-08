import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Navbar from './Navbar'
import { renderWithRouter } from '../test/test-utils'

describe('Navbar', () => {
  it('muestra todos los enlaces de navegación', () => {
    renderWithRouter(<Navbar />)

    expect(screen.getByRole('link', { name: /sentinelrecon/i })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: /^home$/i })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: /dashboard/i })).toHaveAttribute('href', '/dashboard')
    expect(screen.getByRole('link', { name: /targets/i })).toHaveAttribute('href', '/targets')
    expect(screen.getByRole('link', { name: /scans/i })).toHaveAttribute('href', '/scans')
    expect(screen.getByRole('link', { name: /sessions/i })).toHaveAttribute('href', '/sessions')
    expect(screen.getByRole('link', { name: /login/i })).toHaveAttribute('href', '/login')
  })

  it('resalta el enlace activo según la ruta actual', () => {
    renderWithRouter(<Navbar />, { router: { route: '/targets' } })

    const targetsLink = screen.getByRole('link', { name: /targets/i })
    const dashboardLink = screen.getByRole('link', { name: /dashboard/i })

    expect(targetsLink.className).toContain('text-foreground')
    expect(dashboardLink.className).toContain('text-muted-foreground')
  })
})
