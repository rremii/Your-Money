interface AccountData {
  name: string
  color: string
  balance: number
  icon: string
}

export interface AccountResponse extends AccountData {
  id: number
}


export interface IAccount extends AccountData {
  id: number | null
}