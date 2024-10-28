import React, { useState } from 'react'
import styled from 'styled-components'

type InputProps = {
  id: string
  label: string
  onAction: (value: string) => Promise<void>
}

const StyledInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
`

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 4px;
`

export const Input = ({ id, label, onAction }: InputProps) => {
  const [inputValue, setInputValue] = useState('')

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      try {
        await onAction(inputValue)
      } catch (error) {
        console.error(error)
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  return (
    <div>
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
      <StyledInput
        id={id}
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={(e) => void handleKeyDown(e)}
      />
    </div>
  )
}
