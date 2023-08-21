import { useInView } from "react-intersection-observer"
import { useEffect } from "react"
import { setCurMenuId, setDate } from "@entities/DateSlider/model/DateSliderSlice.ts"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"

export const useOnMenuSlide = (dateGap: string, menuId: number) => {
  const dispatch = useAppDispatch()


  const [observeRef, inView] = useInView({
    threshold: 0.5
  })


  useEffect(() => {
    if (!inView) return
    dispatch(setDate(dateGap))
    dispatch(setCurMenuId(menuId))

    const curScroll = document.querySelector("#slider")?.scrollLeft
    if (!curScroll) return
    window.localStorage.setItem("scroll", curScroll.toString())
  }, [inView])


  return { observeRef }
}