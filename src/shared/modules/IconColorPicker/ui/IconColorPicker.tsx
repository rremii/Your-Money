import styled from "styled-components"
import React, { FC, memo, useContext, useEffect } from "react"
import { Header } from "@shared/modules/IconColorPicker/ui/Header.tsx"
import { SubHeader } from "@shared/modules/IconColorPicker/ui/SubHeader.tsx"
import { Slider } from "@shared/modules/IconColorPicker/ui/Slider.tsx"
import {
  setPickerColors,
  setPickerCurColor,
  setPickerCurIcon,
  setPickerIconComponents,
  setPickerIcons,
  setPickerTitles,
} from "@shared/modules/IconColorPicker/model/Actions.ts"
import { IIconComponents } from "@shared/modules/IconColorPicker/types.ts"
import { PickerContext } from "@shared/modules/IconColorPicker/model/Context.ts"


interface props {
  icons: {
    firstSection: string[]
    secondSection: string[]
  }
  colors: string[]
  sectionTitles: {
    firstSection: string
    secondSection: string
  }
  initInfo: {
    icon: string
    color: string
  }
  IconComponents: IIconComponents
  OnChange: (values: { color: string, icon: string }) => void
}

const IconColorPicker: FC<props> = memo(({ icons, initInfo, IconComponents, sectionTitles, OnChange, colors }) => {

  const { curIcon, curColor } = useContext(PickerContext)

  useEffect(() => {
    const { icon, color } = initInfo
    if (!icon || !color) return
    
    OnChange({ color: curColor, icon: curIcon })
  }, [curIcon, curColor])


  useEffect(() => {

    setPickerIcons(icons)
    setPickerColors(colors)
    setPickerCurColor(initInfo.color)
    setPickerCurIcon(initInfo.icon)
    setPickerIconComponents(IconComponents)
    setPickerTitles(sectionTitles)
  }, [initInfo.color, initInfo.icon])


  return <CalendarLayout>
    <Header />
    <SubHeader />
    <Slider />
  </CalendarLayout>
})
export default IconColorPicker
const CalendarLayout = styled.div`
  position: relative;
  padding-top: 10px;
`
