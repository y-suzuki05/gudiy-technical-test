import { CurrentType } from '@/types/weather'
import { Heading, Image } from '@/components/common'
import styled from 'styled-components'

type DateWeatherProps = {
  currentData: CurrentType | null
  placeName: string | null
}

const DateWeatherContainer = styled.div`
  width: 100%;
  background: white;
  padding: 30px;
`

const DateWeatherInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`

export const DateWeather = ({ currentData, placeName }: DateWeatherProps) => {
  return (
    <>
      <Heading level={'h2'}>{`${placeName}の天気`}</Heading>
      {currentData && (
        <DateWeatherContainer>
          <DateWeatherInfoWrapper>
            <Image
              src={currentData.condition.icon}
              alt={currentData.condition.text}
            />
            <ul>
              <li>気温：{currentData.temp_c}度</li>
              <li>風速：{currentData.wind_kph}キロメートル</li>
              <li>降水量：{currentData.precip_mm}ミリ</li>
              <li>湿度：{currentData.humidity}％</li>
              <li>体感温度：{currentData.windchill_c}度</li>
              <li>暑さ指数：{currentData.heatindex_c}度</li>
            </ul>
          </DateWeatherInfoWrapper>
        </DateWeatherContainer>
      )}
    </>
  )
}
