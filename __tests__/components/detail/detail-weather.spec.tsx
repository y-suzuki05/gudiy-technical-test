import { DetailWeather } from '@/components/detail'
import { render, screen, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import * as NextRouter from 'next/router'
import { weatherDataMock } from '@mocks/weather-data-mock'
import { setupServer } from 'msw/node'
import userEvent from '@testing-library/user-event'

const handlers = [
  http.get('/api/weather-forecast', () => {
    return HttpResponse.json(weatherDataMock)
  })
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const useRouterSpy = jest.spyOn(NextRouter, 'useRouter')

describe('TopWeather', () => {
  const mockPush = jest.fn()
  beforeEach(() => {
    ;(useRouterSpy as jest.Mock).mockReturnValue({
      push: mockPush
    })
  })

  describe('初期状態', () => {
    test('見出しが表示されていること', () => {
      render(<DetailWeather />)
      expect(screen.getByRole('heading', { name: '対象の日付' })).toBeTruthy()
    })

    test('inputが表示されていること', () => {
      render(<DetailWeather />)
      expect(
        screen.getByRole('textbox', { name: '地名または緯度経度' })
      ).toBeTruthy()
    })
  })

  describe('正常系', () => {
    test('「osaka」と入力しエンターキーを押すと、トップページに遷移する', async () => {
      render(<DetailWeather />)
      const input = screen.getByRole('textbox', { name: '地名または緯度経度' })
      await userEvent.type(input, 'osaka{enter}')

      expect(mockPush).toHaveBeenCalledWith('/?location=osaka')
      expect(mockPush).not.toHaveBeenCalledWith('/?location=shizuoka')
    })
  })

  describe('異常系', () => {
    test('空欄のままエンターキーを押すと、エラーメッセージが表示される', async () => {
      render(<DetailWeather />)
      const input = screen.getByRole('textbox', { name: '地名または緯度経度' })
      await userEvent.clear(input)
      await userEvent.type(input, '{enter}')

      await waitFor(() => {
        expect(
          screen.getByText('地名または緯度経度を入力してください')
        ).toBeTruthy()
      })
    })
  })
})
