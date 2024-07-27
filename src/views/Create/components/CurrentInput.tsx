import { useState, useEffect } from 'react'
import { Input, Button, Modal, useModal } from '@pancakeswap/uikit'

const CurrentInput: React.FC<React.PropsWithChildren<any>> = ({ item, placeholder, isClear, callback }) => {
  const [valueT, setValueT] = useState<any>(item)
  useEffect(() => {
    if (isClear) {
      setValueT('')
    }
  }, [isClear])
  return (
    <Input
      type="text"
      placeholder={placeholder}
      value={valueT}
      onChange={(e) => {
        setValueT(e.target.value)
        callback(e.target.value)
      }}
    />
  )
}

export default CurrentInput
