import AccountsIcon from "@shared/assets/LightTheme/accounts.png"


export interface IAccountHistoryPoint {
  balance: number
  updateDate: string
}

export interface IAccount {
  name: string
  color: string
  balance: number
  history: IAccountHistoryPoint[]
  icon: string
}

const history1: IAccountHistoryPoint[] = [
  { balance: -45, updateDate: new Date(2023, 7, 19, 0).toISOString() }
]

const history2: IAccountHistoryPoint[] = [
  { balance: -60, updateDate: new Date(2023, 7, 18, 1).toISOString() },
  { balance: 60, updateDate: new Date(2023, 7, 20, 10).toISOString() }
]


export const Accounts: IAccount[] = [
  { name: "Card", icon: AccountsIcon, color: "rgb(92,106,192)", balance: -45, history: history1 },
  { name: "Cash", icon: AccountsIcon, color: "rgb(38,165,154)", balance: 60, history: history2 }
]