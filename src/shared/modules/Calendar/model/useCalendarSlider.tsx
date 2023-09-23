import { useEffect, useRef } from "react"
import { shiftTransMenuIdsLeft, shiftTransMenuIdsRight } from "@entities/DateSlider/model/DateSliderSlice.ts"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { updateMenuDates } from "@shared/modules/Calendar/model/CalendarSlice.ts"

interface props {
  menusDates: string[]
}

export const useCalendarSlider = ({ menusDates }: props) => {
  const dispatch = useAppDispatch()

  const ref = useRef<HTMLDivElement>(null)


  useEffect(() => {
    if (!ref || !ref.current) return
    const sliderWidth = ref.current.scrollWidth


    ref.current.scrollTo(sliderWidth / 2 - 250, 0)
  }, [ref, menusDates])


  const OnScroll = () => {
    if (!ref || !ref.current) return
    const scrollWidth = ref.current.scrollWidth
    const width = ref.current.clientWidth
    const curScroll = ref.current.scrollLeft
    const scrollDif = scrollWidth - curScroll - width

    if (scrollDif === 0) {
      const initialDate = menusDates[menusDates.length - 1]
      dispatch(updateMenuDates({ initialDate }))

    }

    if (curScroll === 0) {
      const initialDate = menusDates[0]
      dispatch(updateMenuDates({ initialDate }))
    }
  }


  return {
    OnScroll, sliderRef: ref
  }
}