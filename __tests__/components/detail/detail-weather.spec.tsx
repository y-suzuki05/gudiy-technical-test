import { DetailWeather } from '@/components/detail'
import { render, screen } from '@testing-library/react'
import * as NextRouter from 'next/router'

const useRouterSpy = jest.spyOn(NextRouter, 'useRouter')

describe('TopWeather', () => {
  beforeEach(() => {
    ;(useRouterSpy as jest.Mock).mockReturnValue({})
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
})
