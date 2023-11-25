import { useEffect, useRef } from "react"
import { setPickerMenuType } from "@shared/modules/IconColorPicker/model/Actions.ts"


export const usePickerSlider = () => {

  const ref = useRef<HTMLDivElement>(null)


  useEffect(() => {
    if (!ref || !ref.current) return
    const sliderWidth = ref.current.scrollWidth

    setPickerMenuType("icon")

    ref.current.scrollTo(sliderWidth / 2 - 250, 0)
  }, [ref])


  const OnScroll = () => {
    if (!ref || !ref.current) return
    const width = ref.current.clientWidth
    const curScroll = ref.current.scrollLeft

    if (curScroll <= width / 2) {
      setPickerMenuType("icon")
    } else {
      setPickerMenuType("color")
    }
  }


  return {
    OnScroll, sliderRef: ref
  }
}