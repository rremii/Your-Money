import { useInView } from "react-intersection-observer"
import { useEffect } from "react"
import { setDate } from "@entities/DateSlider/model/DateSliderSlice.ts"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"

export const useOnMenuSlide = (dateGap: string) => {
  const dispatch = useAppDispatch()


  const [observeRef, inView] = useInView({
    threshold: 0.5
  })


  useEffect(() => {
    if (!inView) return
    dispatch(setDate(dateGap))
    

    const curScroll = document.querySelector("#slider")?.scrollLeft
    if (!curScroll) return
    window.localStorage.setItem("scroll", curScroll.toString())
  }, [inView])


  return { observeRef, inView }
}