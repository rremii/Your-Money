import { Currency } from "@entities/Currency/types.ts"

interface AccountData {
  name: string
  color: string
  balance: number
  icon: string
  currency: Currency
}

export interface AccountResponse extends AccountData {
  id: number
}

export interface IAccount extends AccountData {
  id: number | null
}

export interface CreateAccountDto {
  userId: number
  name: string
  color: string
  icon: string
  currency: Currency
}

export interface EditAccountDto {
  id: number
  name: string
  color: string
  icon: string
}
