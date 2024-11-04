import { Heading, Input, ErrorMessage } from '@/components/common'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { CurrentWeather, WeeklyWeather } from '@/components/top'
import { useRouter } from 'next/router'
import { useFetchWeather } from '@/hooks'

const TopWeatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`

export const TopWeather = () => {
  const [queryLocationValue, setQueryLocationValue] = useState('')
  const router = useRouter()
  const { query, isReady } = router
  const {
    fetchWeather,
    weatherData,
    locationValue,
    errorMessage,
    setErrorMessage
  } = useFetchWeather()

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

    // 詳細ページから遷移した場合、クエリパラメータの値を使ってデータ取得する
    if (queryLocationValue) {
      void fetchWeather(queryLocationValue)
    }
  }, [isReady, query, queryLocationValue, fetchWeather])

  return (
    <TopWeatherContainer>
      <Heading level={'h1'}>weather-app</Heading>
      <Input
        id="location-input"
        label="地名または緯度経度"
        onAction={fetchWeather}
        initialValue={locationValue}
        setError={setErrorMessage}
      />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {weatherData ? (
        <Heading level={'h2'}>{weatherData?.location.name}</Heading>
      ) : (
        <></>
      )}
      <CurrentWeather currentData={currentData} locationValue={locationValue} />
      <WeeklyWeather weeklyData={weeklyData} locationValue={locationValue} />
    </TopWeatherContainer>
  )
}
