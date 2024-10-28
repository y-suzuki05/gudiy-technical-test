import { Heading } from '@/components/common'
import { Input } from '@/components/common'
import { useState } from 'react'
import styled from 'styled-components'
import { WeatherType } from '@/types/weather'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const TopWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherType | undefined>()
  const [errorMessage, setErrorMessage] = useState('')

  const fetchWeather = async (value: string) => {
    try {
      const response = await fetch(`/api/weather?location=${value}`)

      if (!response.ok) {
        throw new Error('取得失敗')
      }

      const data = (await response.json()) as WeatherType
      setWeatherData(data)
    } catch (error) {
      console.error(error)
      setErrorMessage('取得失敗')
      setWeatherData(undefined)
    }
  }

  return (
    <Container>
      <Heading level={'h1'}>weather-app</Heading>
      <Input
        id="location-input"
        label="地名または緯度経度"
        onAction={fetchWeather}
      />
      <div>{errorMessage}</div>
      {weatherData && (
        <div>
          <h3>天気情報:</h3>
          <pre>{JSON.stringify(weatherData, null, 2)}</pre>
        </div>
      )}
    </Container>
  )
}
