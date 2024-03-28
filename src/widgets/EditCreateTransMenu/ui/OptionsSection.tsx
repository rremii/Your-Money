import styled from "styled-components"
import Category from "/icons/general/categories.svg"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import {
  openMenu,
  setEditCreateMenuType
} from "@entities/UI/model/ModalsSlice.ts"
import { useDeleteTransaction } from "@entities/Transaction/model/useDeleteTransaction.tsx"
import { useTranslation } from "react-i18next"
import DeleteIcon from "@icons/general/delete.svg?react"
import DuplicateIcon from "@icons/general/copy.svg?react"
import DateIcon from "@icons/general/event.svg?react"

export const OptionsSection = () => {
  const dispatch = useAppDispatch()

  const color = useTypedSelector(
    (state) => state.EditCreateTransaction.ChosenCategory.color
  )
  const { DeleteTransaction, isLoading } = useDeleteTransaction()

  const { t } = useTranslation()

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
        <div className="icon-cont">
          <DeleteIcon className="icon" />
        </div>
        <p>{t("transactionMenu.delete")}</p>
      </button>
      <button onClick={OnDateClick} className="option date">
        <div className="icon-cont">
          <DateIcon className="icon" />
        </div>
        <p>{t("transactionMenu.date")}</p>
      </button>
      <button onClick={OnDuplicateClick} className="option duplicate">
        <div className="icon-cont">
          <DuplicateIcon className="icon" />
        </div>
        <p>{t("transactionMenu.duplicate")}</p>
      </button>
    </OptionsLayout>
  )
}
const OptionsLayout = styled.section<{
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
        position: relative;

        p {
            color: #818181;
            font-family: Inter;
            font-size: 11px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
        }

        .icon-cont {
            position: relative;
            width: 45px;
            height: 45px;
            display: flex;
            align-items: center;
            justify-content: center;

            .icon {

                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                width: 25px;
            }

            &::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 45px;
                height: 45px;
                border-radius: 50%;
            }
        }


    }

    .delete {
        .icon-cont {

            .icon {
                fill: #fd483a;
            }

            &::after {
                background-color: rgba(248, 123, 114, 0.29);
            }
        }
    }

    .date {
        .icon-cont {


            .icon {
                fill: #595959;
            }

            &::after {
                background-color: rgba(128, 128, 128, 0.46);
            }
        }
    }

    .duplicate {


        .icon-cont {


            .icon {
                fill: ${({ $color }) => $color || ""};
            }

            &::after {
                background-color: ${({ $color }) => $color || ""};
                opacity: .2;
            }
        }
    }
`
