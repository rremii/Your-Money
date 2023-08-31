import AccountsIcon from "@shared/assets/LightTheme/accounts.png"


export interface IAccount {
  id: number | null
  name: string
  color: string
  balance: number
  icon: string
}


export const Accounts: IAccount[] = [
  // { name: "Card", icon: AccountsIcon, color: "rgb(92,106,192)", balance: -45 },
  // { name: "Cash", icon: AccountsIcon, color: "rgb(38,165,154)", balance: 60 }
]