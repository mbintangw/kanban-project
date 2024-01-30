import {render, screen, waitFor} from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import SideMenu from '../components/SideMenu'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

describe('SideMenu', () => {
  // Panggil metode `render` sebelum tiap kasus test dieksekusi
  beforeEach(() => {
    render(
      <BrowserRouter>
        <SideMenu />
      </BrowserRouter>
    )
  })

  test('Home menu is shown', () => {
    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  test('Task List menu is shown', () => {
    expect(screen.getByText('Task List')).toBeInTheDocument()
  })

  test('Task Progress menu is shown', () => {
    expect(screen.getByText('Task Progress')).toBeInTheDocument()
  })

  test('Home menu is linked to /', async () => {
    await userEvent.click(screen.getByText('Home'))
    await waitFor(() => {
      expect(window.location.pathname).toBe('/')
    })
  })

  test('Task List menu is linked to /task-list', async () => {
    await userEvent.click(screen.getByText('Task List'))
    await waitFor(() => {
      expect(window.location.pathname).toBe('/task-list')
    })
  })

  test('Task Progress menu is linked to /task-progess', async () => {
    await userEvent.click(screen.getByText('Task Progress'))
    await waitFor(() => {
      expect(window.location.pathname).toBe('/task-progress')
    })
  })
})