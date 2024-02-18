import styled from "styled-components"
import Category from "@shared/assets/LightTheme/categories.png"
import { FC } from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useDeleteTransactionMutation } from "@entities/Transaction/api/TransactionApi.ts"
import {
  closeMenu,
  openMenu,
  setEditCreateMenuType,
} from "@entities/UI/model/ModalsSlice.ts"
import { useDeleteTransaction } from "@entities/Transaction/model/useDeleteTransaction.tsx"

export const OptionsSection = () => {
  const dispatch = useAppDispatch()

  const color = useTypedSelector(
    (state) => state.EditCreateTransaction.ChosenCategory.color,
  )
  const { DeleteTransaction, isLoading } = useDeleteTransaction()

  const OnDuplicateClick = () => {
    dispatch(setEditCreateMenuType("create"))
  }

  const OnDateClick = () => {
    dispatch(setEditCreateMenuType("edit"))
    dispatch(openMenu("dateMenu"))
  }

  const OnDeleteClick = async () => {
    await DeleteTransaction()
  }

  return (
    <OptionsLayout $color={color}>
      <button
        onClick={OnDeleteClick}
        disabled={isLoading}
        className="option delete"
      >
        <div className="icon">
          <img src={Category} alt="delete" />
        </div>
        <p>Delete</p>
      </button>
      <div onClick={OnDateClick} className="option date">
        <div className="icon">
          <img src={Category} alt="date" />
        </div>
        <p>Date</p>
      </div>
      <div onClick={OnDuplicateClick} className="option duplicate">
        <div className="icon">
          <img src={Category} alt="duplicate" />
        </div>
        <p>Duplicate</p>
      </div>
    </OptionsLayout>
  )
}
const OptionsLayout = styled.div<{
  $color?: string
}>`
  height: 100px;
  background-color: var(--sub-bg);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  transition: 0.5s;

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
