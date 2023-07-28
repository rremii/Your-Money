import { useRef, useState } from "react"

export const useImage = (initialImg = "") => {

  const [curImage, setCurImage] = useState<string>(initialImg)

  const imgRef = useRef<HTMLInputElement>(null)
  const SetImage = () => {
    if (imgRef && imgRef.current && imgRef.current.files) {
      const avatar = imgRef.current.files[0]
      setCurImage(URL.createObjectURL(avatar))
    }
  }


  return { curImage, SetImage, imgRef }


}