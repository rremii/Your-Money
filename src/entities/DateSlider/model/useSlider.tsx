import { useCallback, useEffect, useRef } from "react"
import {
  shiftTransMenuIdsLeft,
  shiftTransMenuIdsRight,
} from "@entities/DateSlider/model/DateSliderSlice.ts"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { DateFilter } from "@entities/Transaction/types.ts"

export const useSlider = (dateFilter: DateFilter, menuIds: number[]) => {
  const dispatch = useAppDispatch()

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref || !ref.current) return
    const sliderWidth = ref.current.scrollWidth
    const scrollLeft = window.localStorage.getItem("scroll")

    if (scrollLeft) return ref.current.scrollTo(+scrollLeft, 0)
    ref.current.scrollTo(sliderWidth / 2 - 250, 0)
  }, [ref, menuIds])

  const OnScroll = useCallback(() => {
    if (!ref || !ref.current || dateFilter === "allTime") return

    const scrollWidth = ref.current.scrollWidth
    const width = ref.current.clientWidth
    const curScroll = ref.current.scrollLeft
    const scrollDif = scrollWidth - curScroll - width
    if (scrollDif === 0) {
      dispatch(shiftTransMenuIdsRight({ shiftAmount: 2 }))
      // ref.current.scrollTo(scrollWidth - width * 3, 0)
      window.localStorage.setItem("scroll", String(curScroll - width * 2))
    }

    if (curScroll === 0) {
      dispatch(shiftTransMenuIdsLeft({ shiftAmount: 2 }))
      // ref.current.scrollTo(width * 2, 0)
      window.localStorage.setItem("scroll", String(width * 2))
    }
  }, [ref])

  return {
    OnScroll,
    sliderRef: ref,
  }
}
