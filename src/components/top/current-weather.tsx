import { Heading, Image } from '@/components/common'
import { ForecastDayType } from '@/types/weather'
import styled from 'styled-components'
import Link from 'next/link'

type CurrentWeatherProps = {
  currentData: ForecastDayType | null
}

const CurrentWeatherContainer = styled.div`
  width: 100%;
  background: white;
  padding: 30px;
`

const CurrentWeatherInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
`

export const CurrentWeather = ({ currentData }: CurrentWeatherProps) => {
  return (
    <>
      <Heading level="h2">現在の天気</Heading>
      <CurrentWeatherContainer>
        {currentData && (
          <Link href={'/'}>
            <CurrentWeatherInfoWrapper>
              <Image
                src={currentData.day.condition.icon}
                alt={currentData.day.condition.text}
              />
              <ul>
                <li>{currentData.date}</li>
                <li>最高気温：{currentData.day.maxtemp_c}度</li>
                <li>最低気温：{currentData.day.mintemp_c}度</li>
                <li>降水確率：{currentData.day.daily_chance_of_rain}%</li>
              </ul>
            </CurrentWeatherInfoWrapper>
          </Link>
        )}
      </CurrentWeatherContainer>
    </>
  )
}
