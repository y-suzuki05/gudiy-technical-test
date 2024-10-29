type LocationType = {
  name: string
  region: string
  country: string
  lat: number
  lon: number
  tz_id: string
  localtime_epoch: number
  localtime: string
}

type CurrentType = {
  last_updated_epoch: number
  last_updated: string
  temp_c: number
  is_day: number
  condition: {
    text: string
    icon: string
    code: number
  }
  wind_kph: number
  pressure_mb: number
  precip_mm: number
  humidity: number
  cloud: number
  windchill_c: number
  heatindex_c: number
  gust_kph: number
}

export type ForecastDayType = {
  date: string
  date_epoch: number
  day: {
    maxtemp_c: number
    mintemp_c: number
    avgtemp_c: number
    maxwind_kph: number
    totalprecip_mm: number
    totalsnow_cm: number
    avghumidity: number
    daily_will_it_rain: number
    daily_chance_of_rain: number
    daily_will_it_snow: number
    daily_chance_of_snow: number
    condition: {
      text: string
      icon: string
      code: number
    }
    uv: number
  }
  hour: HourlyForecastType[]
}

type HourlyForecastType = {
  time_epoch: number
  time: string
  temp_c: number
  is_day: number
  condition: {
    text: string
    icon: string
    code: number
  }
  wind_kph: number
  pressure_mb: number
  precip_mm: number
  snow_cm: number
  humidity: number
  windchill_c: number
  heatindex_c: number
  will_it_rain: number
  chance_of_rain: number
  will_it_snow: number
  chance_of_snow: number
}

type ForecastType = {
  forecastday: ForecastDayType[]
}

export type WeatherForecastType = {
  location: LocationType
  current: CurrentType
  forecast: ForecastType
}

export type WeatherCurrentType = {
  location: LocationType
  current: CurrentType
}
