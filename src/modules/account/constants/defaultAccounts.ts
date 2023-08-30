import { IAccount } from "../account.interface"

export const defaultAccounts: Array<Omit<IAccount, "id">> = [
  { icon: "icon", name: "Cash", color: "rgb(92,106,192)", balance: 0 },
  { icon: "icon", name: "Card", color: "rgb(38,165,154)", balance: 0 },
]
