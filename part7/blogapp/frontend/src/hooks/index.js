import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')
  const [fieldType, setFieldType] = useState(type)

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  const setType = (newType) => {
    setFieldType(newType)
  }

  return {
    type: fieldType,
    value,
    onChange,
    reset,
    setType
  }
}
