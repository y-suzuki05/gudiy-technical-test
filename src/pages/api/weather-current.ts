import type { NextApiRequest, NextApiResponse } from 'next'
import { WeatherCurrentType } from '@/types/weather'

const WEATHER_API_KEY = process.env.WEATHER_API_KEY

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WeatherCurrentType>
) {
  const location = Array.isArray(req.query.location)
    ? req.query.location[0]
    : req.query.location

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${location}&aqi=no`
    )
    if (!response.ok) {
      throw new Error('failed fetch')
    }

    const data = (await response.json()) as WeatherCurrentType
    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(500)
  }
}
