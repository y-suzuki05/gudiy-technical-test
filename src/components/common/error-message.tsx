import styled from 'styled-components'

type ErrorMessageProps = {
  children: string
}

const StyledErrorMessage = styled.p`
  color: red;
`

export const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return <StyledErrorMessage>{children}</StyledErrorMessage>
}
