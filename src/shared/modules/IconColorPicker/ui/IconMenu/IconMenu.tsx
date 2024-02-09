import styled from "styled-components"
import { SliderMenuLayout } from "@shared/modules/IconColorPicker/ui/SliderMenuLayout.tsx"
import { Icon } from "@shared/modules/IconColorPicker/ui/IconMenu/Icon.tsx"
import { IconTitle } from "@shared/modules/IconColorPicker/ui/IconMenu/IconTitle.tsx"
import { FC, useCallback, useContext } from "react"
import { PickerContext } from "@shared/modules/IconColorPicker/model/Context.ts"
import { setPickerCurIcon } from "@shared/modules/IconColorPicker/model/Actions.ts"


export const IconMenu: FC = () => {


  const { curIcon, icons: { firstSection, secondSection }, IconComponents, sectionTitles } = useContext(PickerContext)

  const SetCurrentIcon = useCallback((icon: string) => {
    setPickerCurIcon(icon)
  }, [])

  return <IconMenuLayout>
    <IconTitle title={sectionTitles.firstSection} />
    {firstSection.map((icon, index) => (
      <Icon IconComponents={IconComponents} OnClick={SetCurrentIcon} key={index} isActive={curIcon === icon}
            name={icon} />
    ))}
    <IconTitle title={sectionTitles.secondSection} />
    {secondSection.map((icon, index) => (
      <Icon IconComponents={IconComponents} OnClick={SetCurrentIcon} key={index} isActive={curIcon === icon}
            name={icon} />
    ))}
  </IconMenuLayout>
}
const IconMenuLayout = styled(SliderMenuLayout)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  //justify-content: center;
  align-content: flex-start;
  gap: 10px;
  padding: 15px 20px;
`