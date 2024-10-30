import { Heading, Input } from '@/components/common'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { WeatherForecastType } from '@/types/weather'
import { CurrentWeather, WeeklyWeather } from '@/components/top'
import { useRouter } from 'next/router'

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
  const [queryLocationValue, setQueryLocationValue] = useState('')
  const router = useRouter()
  const { query, isReady } = router

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

  useEffect(() => {
    if (!isReady) return

    const location = !query.location
      ? ''
      : Array.isArray(query.location)
        ? query.location[0]
        : query.location
    setQueryLocationValue(location)

    if (queryLocationValue) {
      void fetchWeather(queryLocationValue)
    }
  }, [queryLocationValue, isReady, query])

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
      <WeeklyWeather weeklyData={weeklyData} locationValue={locationValue} />
    </TopWeatherContainer>
  )
}
