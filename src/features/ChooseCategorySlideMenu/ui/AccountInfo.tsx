import styled from "styled-components"
import { FC, memo } from "react"
import { RoundDecimal } from "@shared/helpers/RoundDecimal.ts"
import { CustomIcon } from "@shared/ui/CustomIcon/CustomIcon.tsx"
import { useTranslation } from "react-i18next"

interface props {
  name: string
  icon: string
  balance: number
  color: string
  currencySign: string
}

export const AccountInfo: FC<props> = memo(
  ({ balance, name, icon, currencySign, color }) => {
    const { t } = useTranslation()

    return (
      <AccountInfoLayout $color={color}>
        <div className="name-box">
          <CustomIcon
            boxSize={"35px"}
            iconSize={"100%"}
            icon={icon}
            boxColor={"transparent"}
          />
          <h2 className="name">{name}</h2>
        </div>
        <div className="balance-box">
          <h3 className="title">{t("categorySlider.accountInfo.title")}</h3>
          <p className="balance">
            {balance < 0 ? "-" : ""}
            {currencySign} {Math.abs(RoundDecimal(balance, 2))}
          </p>
        </div>
      </AccountInfoLayout>
    )
  }
)
const AccountInfoLayout = styled.div<{
  $color?: string
}>`
    height: 115px;
    border-radius: 5px 5px 0 0;
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${({ $color }) => $color || "var(--account-color)"};
    width: 95%;

    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;

    .name-box {
        display: flex;
        gap: 20px;
        align-items: center;

        .name {
            color: #ffffff;
            font-family: Inter;
            font-size: 18px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
        }
    }

    .balance-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .title {
            margin-bottom: 5px;
            color: #ffffff;
            font-family: Inter;
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            letter-spacing: -0.36px;
        }

        .balance {
            color: #ffffff;
            font-family: Inter;
            font-size: 18px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
        }
    }
`
