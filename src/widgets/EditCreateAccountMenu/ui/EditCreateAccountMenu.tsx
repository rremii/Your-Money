import styled from "styled-components"

export const EditCreateAccountMenu = () => {


  const menuType = "edit"
  return <EditCreateAccountLayout>
    <div className="colorfull-box">
      {/*<EditCategoryHeader />*/}
      {/*<NameInput />*/}
      {/*<CreateCategoryIcon />*/}
    </div>

    {/*{menuType === "edit" && (*/}
    {/*   <DeleteCategory />*/}
    {/*)}*/}
  </EditCreateAccountLayout>
}
const EditCreateAccountLayout = styled.div<{
  $isMenuOpen?: boolean
  $color?: string
}>`
  position: absolute;
  z-index: 50;
  width: 100vw;
  height: 100vh;
  max-width: 450px;
  top: 0;
  left: 0;
  transition: transform .5s;
  pointer-events: ${({ $isMenuOpen }) => $isMenuOpen ? "initial" : "none"};
  transform: ${({ $isMenuOpen }) => $isMenuOpen ? "translateX(0)" : "translateX(100%)"};
  background-color: var(--bg-2);


  .colorfull-box {
    background-color: ${({ $color }) => $color ? $color : "#0BAD7B"};
    color: var(--txt-1);
    height: 130px;
    margin-bottom: 20px;
    position: relative;
  }
`