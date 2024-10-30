import { Heading, Input } from '@/components/common'
import { WeatherCurrentType } from '@/types/weather'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { DateWeather } from '@/components/detail'
import { useRouter } from 'next/router'

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
  const { query, isReady } = useRouter()
  const [queryDateValue, setQueryDateValue] = useState('')
  const [queryLocationValue, setQueryLocationValue] = useState('')

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

  useEffect(() => {
    if (!isReady) return
    const date = !query.date
      ? ''
      : Array.isArray(query.date)
        ? query.date[0]
        : query.date
    setQueryDateValue(date)

    const location = !query.location
      ? ''
      : Array.isArray(query.location)
        ? query.location[0]
        : query.location
    setQueryLocationValue(location)

    if (queryLocationValue) {
      void fetchWeather(queryLocationValue)
    }
  }, [query, isReady, queryLocationValue])

  const currentData = weatherData && weatherData.current
  const placeName = weatherData && weatherData.location.name

  return (
    <DetailWeatherContainer>
      <Heading level={'h1'}>{queryDateValue}</Heading>
      <Input
        id="location-input-current"
        label="地名または緯度経度"
        onAction={fetchWeather}
        initialValue={queryLocationValue}
      />
      <div>{errorMessage}</div>
      <DateWeather currentData={currentData} placeName={placeName} />
    </DetailWeatherContainer>
  )
}
