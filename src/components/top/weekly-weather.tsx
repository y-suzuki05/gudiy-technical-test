import { ForecastDayType } from '@/types/weather'
import styled from 'styled-components'
import { Heading, Image } from '@/components/common'
import Link from 'next/link'

type WeeklyWeatherProps = {
  weeklyData: ForecastDayType[] | null
}

const WeeklyWeatherContainer = styled.div`
  width: 100%;
  background: white;
  padding: 30px;
`

const WeeklyWeatherInfoWrapper = styled.div`
  display: grid;
  grid-template-columns: 150px 150px;
  justify-content: center;
  align-items: center;
  gap: 40px;

  /* SP */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export const WeeklyWeather = ({ weeklyData }: WeeklyWeatherProps) => {
  return (
    <>
      <Heading level="h2">週間予報</Heading>
      <WeeklyWeatherContainer>
        <WeeklyWeatherInfoWrapper>
          {weeklyData && (
            <>
              {weeklyData.map((dayData) => (
                <Link href={'/'} key={dayData.date}>
                  <div>
                    <div>{dayData.date}</div>
                    <Image
                      src={dayData.day.condition.icon}
                      alt={dayData.day.condition.text}
                    />
                  </div>
                </Link>
              ))}
            </>
          )}
        </WeeklyWeatherInfoWrapper>
      </WeeklyWeatherContainer>
    </>
  )
}
