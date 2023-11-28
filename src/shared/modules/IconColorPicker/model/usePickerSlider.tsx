import { useEffect, useRef } from "react"
import { setPickerMenuType } from "@shared/modules/IconColorPicker/model/Actions.ts"
import { MenuType } from "@shared/modules/IconColorPicker/types.ts"


export const usePickerSlider = (curMenuType: MenuType) => {

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
      if (curMenuType === "color")
        setPickerMenuType("icon")
    } else {
      if (curMenuType === "icon")
        setPickerMenuType("color")
    }
  }


  return {
    OnScroll, sliderRef: ref
  }
}