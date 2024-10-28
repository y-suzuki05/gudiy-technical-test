import { Heading } from '@/components/common'
import { Input } from '@/components/common'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const TopWeather = () => {
  const handleActinon = (value: string) => {
    console.log(value)
  }

  return (
    <Container>
      <Heading level={'h1'}>weather-app</Heading>
      <Input
        id="location-input"
        label="地名または緯度経度"
        onAction={handleActinon}
      />
    </Container>
  )
}
