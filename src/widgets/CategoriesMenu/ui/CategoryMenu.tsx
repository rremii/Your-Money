import { Doughnut } from "react-chartjs-2"
import { DoughnutProps } from "@widgets/CategoriesMenu/constants/DoughnutConfig.ts"
import React, { FC, useEffect } from "react"
import styled from "styled-components"
import FamilyIcon from "@shared/assets/LightTheme/family.png"
import HealthIcon from "@shared/assets/LightTheme/health.png"
import GiftsIcon from "@shared/assets/LightTheme/gifts.png"
import { ITransaction, TransCategories } from "@entities/Transaction/model/useGetTransactions.tsx"
import { useInView } from "react-intersection-observer"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { setDate, setIndex } from "@entities/DateSlider/model/DateSliderSlice.ts"
import { GetCategoriesMenuData } from "@entities/Transaction/helpers/GetCategoriesMenuData.ts"
import { CategoriesIcons } from "@shared/constants/CategoriesIcons.ts"


export interface ICategory {
  name: TransCategories,
}

interface props {
  menuId: number
  dateGap: string
  transactions: ITransaction[]
}

const categories: ICategory[] = [
  { name: "Family" },
  { name: "Gifts" },
  { name: "Groceries" },
  { name: "Health" },
  { name: "Leisure" },
  { name: "Shopping" },
  { name: "Restaurant" },
  { name: "Transport" }
]


export const CategoryMenu: FC<props> = React.memo(({ menuId, dateGap, transactions }) => {
  const dispatch = useAppDispatch()


  const [observeRef, inView] = useInView({
    threshold: 0.5
  })


  useEffect(() => {
    if (!inView) return
    dispatch(setDate(dateGap))
    dispatch(setIndex(menuId))
  }, [inView])


  const filledCategories = GetCategoriesMenuData(categories, transactions)


  return <CategoryLayout ref={observeRef}>
    <div className="balance-graph">
      <Doughnut {...DoughnutProps} />
      <div className="balance">
        <div className="type">Expenses</div>
        <div className="current expenses">Br <span>5</span></div>
        <div className="sub income">Br <span>0</span></div>
      </div>
    </div>
    {filledCategories.map(({ quantity, name }, i) => (
      <div key={i} className="category">
        <h3 className="title">
          {name}
        </h3>
        <div className="icon">
          <img src={CategoriesIcons.get(name)} alt="category icon" />
        </div>
        <p className="quantity">
          Br {quantity}
        </p>
      </div>
    ))}
  </CategoryLayout>
})
const CategoryLayout = styled.div`
  scroll-snap-stop: always;
  scroll-snap-align: center;
  padding: 40px 15px 15px;
  overflow-y: auto;
  background-color: var(--bg-1);
  display: grid;
  grid-template-rows: min-content min-content;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  row-gap: 40px;
  height: 100%;
  width: max-content;
  flex: 0 0 100%;

  .balance-graph {
    position: relative;
    grid-row: 2/4;
    grid-column: 2/4;
    height: min-content;

    cursor: pointer;

    .balance {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;

      .type {
        color: var(--txt-5);
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }

      .current, .sub {
        font-family: Inter;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }

      .current {
        font-size: 16px;

        span {
          font-size: 19px;
        }
      }

      .sub {
        font-size: 13px;

        span {
          font-size: 16px;
        }
      }

      .income {
        color: var(--txt-8);
      }

      .expenses {
        color: var(--txt-9);
      }
    }
  }

  .category {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    cursor: pointer;

    .title {
      color: var(--txt-5);
      font-family: Inter;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .icon {
      width: 45px;
      height: 45px;
    }

    .quantity {
      color: var(--txt-2);
      font-family: Inter;
      font-size: 11px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
`
