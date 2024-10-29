import styled from 'styled-components'

const StyledImage = styled.img`
  width: 100px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`

type ImageProps = {
  src: string
  alt: string
}

export const Image = ({ src, alt }: ImageProps) => {
  return <StyledImage src={src} alt={alt} />
}
