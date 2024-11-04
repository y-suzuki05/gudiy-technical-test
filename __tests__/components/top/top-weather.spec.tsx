import { TopWeather } from '@/components/top'
import { render, screen, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import * as NextRouter from 'next/router'
import { weatherDataMock } from '@mocks/index'
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
  beforeEach(() => {
    ;(useRouterSpy as jest.Mock).mockReturnValue({})
  })

  describe('初期状態', () => {
    test('見出しが表示されていること', () => {
      render(<TopWeather />)
      expect(screen.getByRole('heading', { name: 'weather-app' })).toBeTruthy()
      expect(screen.getByRole('heading', { name: '現在の天気' })).toBeTruthy()
      expect(screen.getByRole('heading', { name: '週間予報' })).toBeTruthy()
    })

    test('inputが表示されていること', () => {
      render(<TopWeather />)
      expect(
        screen.getByRole('textbox', { name: '地名または緯度経度' })
      ).toBeTruthy()
    })
  })

  describe('正常系', () => {
    test('「tokyo」と入力しエンターキーを押すと、天気データが表示される', async () => {
      render(<TopWeather />)
      const input = screen.getByRole('textbox', { name: '地名または緯度経度' })
      await userEvent.type(input, 'tokyo{enter}')

      await waitFor(() => {
        expect(
          screen.findByRole('listitem', { name: '2024-11-04' })
        ).toBeTruthy()
        expect(
          screen.findByRole('listitem', { name: '最高気温：22.8度' })
        ).toBeTruthy()
        expect(
          screen.findByRole('listitem', { name: '最低気温：16.8度' })
        ).toBeTruthy()
        expect(
          screen.findByRole('listitem', { name: '降水確率：0％' })
        ).toBeTruthy()
      })
    })
  })

  describe('異常系', () => {
    test('空欄のままエンターキーを押すと、エラーメッセージが表示される', async () => {
      render(<TopWeather />)
      const input = screen.getByRole('textbox', { name: '地名または緯度経度' })
      await userEvent.type(input, '{enter}')

      await waitFor(() => {
        expect(
          screen.getByText('地名または緯度経度を入力してください')
        ).toBeTruthy()
      })
    })
  })
})
