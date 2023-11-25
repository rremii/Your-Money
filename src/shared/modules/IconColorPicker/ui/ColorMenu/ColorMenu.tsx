import styled from "styled-components"
import { SliderMenuLayout } from "@shared/modules/IconColorPicker/ui/SliderMenuLayout.tsx"
import { Color } from "@shared/modules/IconColorPicker/ui/ColorMenu/Color.tsx"

export const ColorMenu = () => {
  return <ColorMenuLayout>
    <Color isActive={true} color={"red"} />
    <Color isActive={false} color={"black"} />
    <Color isActive={false} color={"green"} />
    <Color isActive={false} color={"blue"} />
    <Color isActive={false} color={"yellow"} />
    <Color isActive={false} color={"black"} />
    <Color isActive={false} color={"black"} />
  </ColorMenuLayout>
}
const ColorMenuLayout = styled(SliderMenuLayout)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  align-content: flex-start;
  gap: 10px;
  padding: 15px 20px;

`