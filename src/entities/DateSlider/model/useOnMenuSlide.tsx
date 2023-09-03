import { useInView } from "react-intersection-observer"
import { useEffect } from "react"
import { setCurMenu } from "@entities/DateSlider/model/DateSliderSlice.ts"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"

export const useOnMenuSlide = (dateGap: string, menuId: number) => {
  const dispatch = useAppDispatch()


  const [observeRef, inView] = useInView({
    threshold: 0.5
  })


  useEffect(() => {
    if (!inView) return
    dispatch(setCurMenu({ dateGap, id: menuId }))

    const curScroll = document.querySelector("#slider")?.scrollLeft
    if (!curScroll) return
    window.localStorage.setItem("scroll", curScroll.toString())
  }, [inView])


  return { observeRef }
}