import { Heading, Input } from '@/components/common'
import { WeatherCurrentType } from '@/types/weather'
import { useState } from 'react'
import styled from 'styled-components'
import { DateWeather } from '@/components/detail'

const DetailWeatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`

export const DetailWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherCurrentType | null>(
    null
  )
  const [errorMessage, setErrorMessage] = useState('')

  const fetchWeather = async (value: string) => {
    try {
      const response = await fetch(`/api/weather-current?location=${value}`)

      if (!response.ok) {
        throw new Error('取得失敗')
      }

      const data = (await response.json()) as WeatherCurrentType
      setWeatherData(data)
    } catch (error) {
      console.error(error)
      setErrorMessage('取得失敗')
      setWeatherData(null)
    }
  }

  console.log(weatherData)

  return (
    <DetailWeatherContainer>
      <Heading level={'h1'}>2024-11-1</Heading>
      <Input
        id="location-input-current"
        label="地名または緯度経度"
        onAction={fetchWeather}
        initialValue="Osaka"
      />
      <div>{errorMessage}</div>
      <DateWeather />
    </DetailWeatherContainer>
  )
}
