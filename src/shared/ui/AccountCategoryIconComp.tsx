import BurgerComp from "@icons/categories/burgerIcon.svg?react"
import CupComp from "@icons/categories/cup.svg?react"
import FamilyComp from "@icons/categories/family.svg?react"
import GiftsComp from "@icons/categories/gifts.svg?react"
import HealthComp from "@icons/categories/health.svg?react"
import LeisureComp from "@icons/categories/leisure.svg?react"
import RestaurantComp from "@icons/categories/restaurant.svg?react"
import TransportComp from "@icons/categories/transport.svg?react"
import GroceriesComp from "@icons/categories/groceries.svg?react"
import ShoppingComp from "@icons/categories/shopping.svg?react"
import AirplaneTicketComp from "@icons/categories/airplane-ticket.svg?react"
import ApartmentComp from "@icons/categories/apartment.svg?react"
import CasinoComp from "@icons/categories/casino.svg?react"
import HotelComp from "@icons/categories/hotel.svg?react"
import LocalBarComp from "@icons/categories/local-bar.svg?react"
import NightLifeComp from "@icons/categories/nightlife.svg?react"
import RoomServiceComp from "@icons/categories/room-service.svg?react"
import SportsBarComp from "@icons/categories/sports-bar.svg?react"
import TripComp from "@icons/categories/trip.svg?react"

import CardComp from "@icons/accounts/card.svg?react"
import CashComp from "@icons/accounts/cash.svg?react"
import DataTableComp from "@icons/accounts/data-table.svg?react"
import MoneyComp from "@icons/accounts/money.svg?react"
import PaymentsComp from "@icons/accounts/payments.svg?react"
import SavingsComp from "@icons/accounts/savings.svg?react"
import WalletComp from "@icons/accounts/wallet.svg?react"

import { Global } from "@shared/type"

interface IconComponents {
  [key: string]: Global.svgComponent
}

const IconComponents: IconComponents = {
  burger: BurgerComp,
  cup: CupComp,
  family: FamilyComp,
  gifts: GiftsComp,
  health: HealthComp,
  leisure: LeisureComp,
  restaurant: RestaurantComp,
  transport: TransportComp,
  shopping: ShoppingComp,
  groceries: GroceriesComp,
  airplaneTicket: AirplaneTicketComp,
  apartment: ApartmentComp,
  casino: CasinoComp,
  hotel: HotelComp,
  localBar: LocalBarComp,
  nightLife: NightLifeComp,
  roomService: RoomServiceComp,
  sportsBar: SportsBarComp,
  trip: TripComp,
  card: CardComp,
  cash: CashComp,
  dataTable: DataTableComp,
  money: MoneyComp,
  payments: PaymentsComp,
  savings: SavingsComp,
  wallet: WalletComp,
  salary: PaymentsComp
}

interface GetComponentsProps {
  fill: string
}

class AccountCategoryIconComp {
  get(name: string, svgParams?: GetComponentsProps) {
    const Component = IconComponents[name]
    if (!Component) return ""
    return <Component {...svgParams} />
  }
}

export default new AccountCategoryIconComp()
