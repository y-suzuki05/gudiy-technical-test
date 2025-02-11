import styled from 'styled-components'

type HeadingProps = {
  children: string
  level: 'h1' | 'h2'
  ariaLabel?: string
}

const StyledHeading = styled.h1<{ level: 'h1' | 'h2' }>`
  font-size: ${(props) => {
    switch (props.level) {
      case 'h1':
        return '32px'
      case 'h2':
        return '24px'
      default:
        return '24px'
    }
  }};
  color: black;
  margin-top: 10px;
`

export const Heading = ({ children, level, ariaLabel }: HeadingProps) => {
  return (
    <StyledHeading as={level} level={level} aria-label={ariaLabel}>
      {children}
    </StyledHeading>
  )
}
