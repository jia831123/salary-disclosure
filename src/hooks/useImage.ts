import { useState } from 'react'

export default () => {
  const [images, setImages] = useState<string[]>([])
  const getBaseUrl = () => `https://i.imgur.com/`
  const getImage = (imgName: string) => {
    const r = `${getBaseUrl()}${imgName}`
    if (!images.includes(r)) {
      setImages([...images, r])
      return r
    }
  }
  return { getBaseUrl, getImage }
}
