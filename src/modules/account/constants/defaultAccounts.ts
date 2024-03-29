import { Currency, IAccount } from "../account.interface"

export const defaultAccounts: Array<Omit<IAccount, "id">> = [
  {
    icon: "cash",
    name: "Cash",
    color: "rgb(92,106,192)",
    balance: 0,
    currency: Currency.UnitedStatesDollar,
  },
  {
    icon: "card",
    name: "Card",
    color: "rgb(38,165,154)",
    balance: 0,
    currency: Currency.UnitedStatesDollar,
  },
]
