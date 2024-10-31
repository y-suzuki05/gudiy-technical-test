import { Heading, Input } from '@/components/common'
import { WeatherForecastType } from '@/types/weather'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { DateWeather } from '@/components/detail'
import { useRouter } from 'next/router'

const DetailWeatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  height: 100vh;
`

export const DetailWeather = () => {
  const [weatherData, setWeatherData] = useState<
    WeatherForecastType | undefined
  >(undefined)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()
  const { query, isReady, push } = router
  const [queryDateValue, setQueryDateValue] = useState('')
  const [queryLocationValue, setQueryLocationValue] = useState('')

  const fetchWeather = async (value: string) => {
    try {
      const response = await fetch(`/api/weather-forecast?location=${value}`)

      if (!response.ok) {
        throw new Error('取得失敗')
      }

      const data = (await response.json()) as WeatherForecastType
      setWeatherData(data)
    } catch (error) {
      console.error(error)
      setErrorMessage('天気データの取得に失敗しました')
      setWeatherData(undefined)
    }
  }

  const handleNavigation = async (newLocation: string) => {
    await push(`/?location=${newLocation}`)
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
  }, [queryLocationValue, isReady, query])

  const currentData =
    weatherData &&
    weatherData.forecast.forecastday.find((day) => day.date === queryDateValue)
  const placeName = weatherData && weatherData.location.name

  return (
    <DetailWeatherContainer>
      <Heading level={'h1'} ariaLabel="対象の日付">
        {queryDateValue}
      </Heading>
      <Input
        id="location-input-current"
        label="地名または緯度経度"
        onAction={handleNavigation}
        initialValue={queryLocationValue}
      />
      <div>{errorMessage}</div>
      <DateWeather currentData={currentData} placeName={placeName} />
    </DetailWeatherContainer>
  )
}
