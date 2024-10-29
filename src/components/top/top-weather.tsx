import { Heading } from '@/components/common'
import { Input } from '@/components/common'
import { useState } from 'react'
import styled from 'styled-components'
import { WeatherType } from '@/types/weather'
import { CurrentWeather } from '@/components/top'

const TopWeatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`

export const TopWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherType | null>(null)
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
      setWeatherData(null)
    }
  }

  const currentData = weatherData && weatherData.forecast.forecastday[0]
  // const weeklyData = weatherData && weatherData.forecast.forecastday.slice(1)

  return (
    <TopWeatherContainer>
      <Heading level={'h1'}>weather-app</Heading>
      <Input
        id="location-input"
        label="地名または緯度経度"
        onAction={fetchWeather}
      />
      <div>{errorMessage}</div>
      <CurrentWeather currentData={currentData} />
    </TopWeatherContainer>
  )
}
