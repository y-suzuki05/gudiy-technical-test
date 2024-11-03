import { Heading, Input } from '@/components/common'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { DateWeather } from '@/components/detail'
import { useRouter } from 'next/router'
import { useFetchWeather } from '@/hooks'

const DetailWeatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  height: 100%;

  /* SP */
  @media (max-width: 768px) {
    height: 100vh;
  }
`

export const DetailWeather = () => {
  const router = useRouter()
  const { query, isReady, push } = router
  const [queryDateValue, setQueryDateValue] = useState('')
  const [queryLocationValue, setQueryLocationValue] = useState('')
  const { fetchWeather, weatherData, errorMessage } = useFetchWeather()

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
  }, [queryLocationValue, isReady, query, fetchWeather])

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
      {errorMessage && <div>{errorMessage}</div>}
      <DateWeather currentData={currentData} placeName={placeName} />
    </DetailWeatherContainer>
  )
}
