import { useInView } from "react-intersection-observer"
import { useEffect } from "react"
import { setCurMenu } from "@entities/DateSlider/model/DateSliderSlice.ts"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { date } from "yup"

export const useOnMenuSlide = (dateGap: string, menuId: number, dateFrom: Date) => {
  const dispatch = useAppDispatch()


  const [observeRef, inView] = useInView({
    threshold: 0.5
  })


  useEffect(() => {
    if (!inView) return
    dispatch(setCurMenu({ dateGap, id: menuId, dateFrom: dateFrom.toUTCString() }))

    const curScroll = document.querySelector("#slider")?.scrollLeft
    if (!curScroll) return
    window.localStorage.setItem("scroll", curScroll.toString())
  }, [inView])


  return { observeRef }
}