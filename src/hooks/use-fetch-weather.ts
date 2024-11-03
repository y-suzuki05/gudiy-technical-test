import { WeatherForecastType } from '@/types/weather'
import { useCallback, useState } from 'react'

export const useFetchWeather = () => {
  const [weatherData, setWeatherData] = useState<
    WeatherForecastType | undefined
  >(undefined)
  const [errorMessage, setErrorMessage] = useState('')
  const [locationValue, setLocationValue] = useState('')

  const fetchWeather = useCallback(async (value: string) => {
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
      setErrorMessage('天気データの取得に失敗しました')
      setWeatherData(undefined)
    }
  }, [])

  return {
    weatherData,
    errorMessage,
    locationValue,
    fetchWeather
  }
}
