import { Heading, Input } from '@/components/common'
import { useState } from 'react'
import styled from 'styled-components'
import { WeatherForecastType } from '@/types/weather'
import { CurrentWeather, WeeklyWeather } from '@/components/top'

const TopWeatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`

export const TopWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherForecastType | null>(
    null
  )
  const [errorMessage, setErrorMessage] = useState('')
  const [locationValue, setLocationValue] = useState('')

  const fetchWeather = async (value: string) => {
    try {
      const response = await fetch(`/api/weather-forecast?location=${value}`)

      if (!response.ok) {
        throw new Error('取得失敗')
      }

      const data = (await response.json()) as WeatherForecastType
      setWeatherData(data)
      setLocationValue(value)
    } catch (error) {
      console.error(error)
      setErrorMessage('取得失敗')
      setWeatherData(null)
    }
  }

  const currentData = weatherData && weatherData.forecast.forecastday[0]
  const weeklyData = weatherData && weatherData.forecast.forecastday.slice(1)

  return (
    <TopWeatherContainer>
      <Heading level={'h1'}>weather-app</Heading>
      <Input
        id="location-input"
        label="地名または緯度経度"
        onAction={fetchWeather}
        initialValue={locationValue}
      />
      <div>{errorMessage}</div>
      <CurrentWeather currentData={currentData} locationValue={locationValue} />
      <WeeklyWeather weeklyData={weeklyData} />
    </TopWeatherContainer>
  )
}
