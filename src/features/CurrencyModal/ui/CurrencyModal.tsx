import styled from "styled-components"
import { Modal } from "@shared/ui/Modal.tsx"
import { Overlay } from "@shared/ui/Overlay.tsx"
import { DefaultCurrencySigns } from "@entities/Settings/constants/CurrencySigns.ts"
import { Currency } from "@entities/Account/types.ts"
import React from "react"

interface ICurrencyCell {
  fullName: string
  shortName: Currency
}

export const CurrencyModal = () => {

  const MainCurrencies: ICurrencyCell[] = [
    { fullName: "Australian dollar", shortName: Currency.AustralianDollar },
    { fullName: "Australian dollar", shortName: Currency.AustralianDollar },
    { fullName: "Australian dollar", shortName: Currency.AustralianDollar },
    { fullName: "Australian dollar", shortName: Currency.AustralianDollar },
    { fullName: "Australian dollar", shortName: Currency.AustralianDollar },
    { fullName: "Australian dollar", shortName: Currency.AustralianDollar },
    { fullName: "Australian dollar", shortName: Currency.AustralianDollar }
 
  ]

  return <>
    <Overlay $zIndex={55} $isActive={true} />
    <CurrencyModalLayout $isOpen={true}>
      <header>Currency</header>
      <p className="subTitle">Main currencies</p>
      <div className="currencies-box">
        {MainCurrencies.map(({ fullName, shortName }) => (
          <div className="currency">
            <div className="radio" />
            <p className="name">{fullName}</p>
            <p className="sign">{DefaultCurrencySigns.get(shortName)}</p>
          </div>)
        )}
      </div>
      <div className="btn-section">
        <button className="gray" type="button">CANCEL</button>
        <button className="gray" type="submit">Done</button>
      </div>
    </CurrencyModalLayout>
  </>
}
const CurrencyModalLayout = styled(Modal)`
  z-index: 55;
  max-width: 360px;
  padding: 20px 22px;

  header {
    color: var(--txt-5);
    font-family: Inter;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.17px;
    margin-bottom: 20px;
  }

  .subTitle {
    color: var(--txt-3);
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.14px;
    margin-bottom: 15px;
  }

  .btn-section {
    margin-top: 20px;
  }

  .currencies-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 20px;

    max-height: 350px;
    overflow-y: auto;

    .currency {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;

      .radio {
        width: 19px;
        height: 19px;
        margin-right: 13px;
        border-radius: 50%;
        border: #808080 solid 2.5px;
      }

      .name {
        color: var(--txt-5);
        font-family: Inter;
        font-size: 15px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }

      .sign {
        flex: 1 1 auto;
        text-align: right;
        color: var(--txt-6);
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }
  }
`
