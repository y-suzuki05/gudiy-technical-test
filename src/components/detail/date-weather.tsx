import { ForecastDayType } from '@/types/weather'
import { Heading, Image } from '@/components/common'
import styled from 'styled-components'

type DateWeatherProps = {
  currentData: ForecastDayType | null | undefined
  placeName: string | undefined
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
      {placeName ? (
        <Heading level={'h2'}>{`${placeName}の天気`}</Heading>
      ) : (
        <></>
      )}
      {currentData && (
        <DateWeatherContainer>
          <DateWeatherInfoWrapper>
            <Image
              src={currentData.day.condition.icon}
              alt={currentData.day.condition.text}
            />
            <ul>
              <li>最高気温：{currentData.day.maxtemp_c}度</li>
              <li>最低気温：{currentData.day.mintemp_c}度</li>
              <li>平均気温：{currentData.day.avgtemp_c}度</li>
              <li>最大風速：{currentData.day.maxwind_kph}キロメートル</li>
              <li>総降水量：{currentData.day.totalprecip_mm}ミリ</li>
              <li>平均湿度：{currentData.day.avghumidity}％</li>
              <li>UV：{currentData.day.uv}</li>
            </ul>
          </DateWeatherInfoWrapper>
        </DateWeatherContainer>
      )}
    </>
  )
}
