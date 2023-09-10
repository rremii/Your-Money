import styled from "styled-components"
import Category from "@shared/assets/LightTheme/categories.png"
import { FC } from "react"

interface props {
  color: string
}

export const OptionsSection: FC<props> = ({ color }) => {


  return <OptionsLayout $color={color}>
    <div className="option delete">
      <div className="icon">
        <img src={Category} alt="delete" />
      </div>
      <p>Delete</p>
    </div>
    <div className="option date">
      <div className="icon">
        <img src={Category} alt="date" />
      </div>
      <p>Date</p>
    </div>
    <div className="option duplicate">
      <div className="icon">
        <img src={Category} alt="duplicate" />
      </div>
      <p>Duplicate</p>
    </div>
  </OptionsLayout>
}
const OptionsLayout = styled.div<{
  $color?: string
}>`
  height: 100px;
  background-color: var(--bg-1);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;

  .option {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;

    p {
      color: var(--txt-6);
      font-family: Inter;
      font-size: 11px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .icon {
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 45px;
      height: 45px;

      img {
        width: 20px;
      }
    }


  }

  .delete {
    .icon {

      background-color: var(--bg-15);
    }
  }

  .date {
    .icon {

      background-color: var(--bg-5);
    }
  }

  .duplicate {
    .icon {

      background-color: ${({ $color }) => $color || ""};
    }

  }

`