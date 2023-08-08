import { useEffect, useRef } from "react"
import { shiftTransMenuIdsLeft, shiftTransMenuIdsRight } from "@entities/DateSlider/model/DateSliderSlice.ts"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"

export const useSlider = () => {
  const dispatch = useAppDispatch()

  const index = useTypedSelector(state => state.Transactions.index)

  const ref = useRef<HTMLDivElement>(null)


  useEffect(() => {
    if (!ref || !ref.current) return
    const sliderWidth = ref.current.scrollWidth

    ref.current.scrollTo(sliderWidth / 2 - 250, 0)
  }, [ref])


  const OnScroll = () => {
    if (!ref || !ref.current) return
    const scrollWidth = ref.current.scrollWidth
    const width = ref.current.clientWidth
    const curScroll = ref.current.scrollLeft
    const scrollDif = scrollWidth - curScroll - width


    if (scrollDif === 0) {
      dispatch(shiftTransMenuIdsRight({ shiftAmount: 2 }))
      ref.current.scrollBy(width * 2, 0)
    }

    if (curScroll === 0) {
      dispatch(shiftTransMenuIdsLeft({ shiftAmount: 2 }))
      ref.current.scrollTo(0, 0)
    }
  }


  return {
    OnScroll, sliderRef: ref
  }
}