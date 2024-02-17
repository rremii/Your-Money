import styled from "styled-components"
import { SliderMenuLayout } from "@shared/modules/IconColorPicker/ui/SliderMenuLayout.tsx"
import { Color } from "@shared/modules/IconColorPicker/ui/ColorMenu/Color.tsx"
import { memo, useCallback, useContext } from "react"
import { PickerContext } from "@shared/modules/IconColorPicker/model/Context.ts"
import { setPickerCurColor } from "@shared/modules/IconColorPicker/model/Actions.ts"

export const ColorMenu = memo(() => {
  const { curColor, colors } = useContext(PickerContext)

  const SetCurColor = useCallback((color: string) => {
    setPickerCurColor(color)
  }, [])

  return (
    <ColorMenuLayout>
      {colors.map((color, index) => (
        <Color
          OnClick={SetCurColor}
          key={index}
          isActive={color === curColor}
          color={color}
        />
      ))}
    </ColorMenuLayout>
  )
})
const ColorMenuLayout = styled(SliderMenuLayout)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: flex-start;
  gap: 10px;
  padding: 15px 20px;
`
