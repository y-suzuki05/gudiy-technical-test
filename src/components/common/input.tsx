import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

type InputProps = {
  id: string
  label: string
  onAction: (value: string) => void | Promise<void>
  initialValue?: string
  setError: React.Dispatch<React.SetStateAction<string | null>>
  placeHolder: string
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

export const Input = ({
  id,
  label,
  onAction,
  initialValue = '',
  setError,
  placeHolder
}: InputProps) => {
  const [inputValue, setInputValue] = useState(initialValue)

  useEffect(() => {
    setInputValue(initialValue)
  }, [initialValue])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!inputValue.trim()) {
        setError('地名または緯度経度を入力してください')
        return
      } else {
        setError(null)
        void onAction(inputValue)
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
        onKeyDown={handleKeyDown}
        placeholder={placeHolder}
      />
    </div>
  )
}
