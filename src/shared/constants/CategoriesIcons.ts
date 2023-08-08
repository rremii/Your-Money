import FamilyIcon from "@shared/assets/LightTheme/family.png"
import GiftsIcon from "@shared/assets/LightTheme/gifts.png"
import GroceriesIcon from "@shared/assets/LightTheme/groceries.png"
import HealthIcon from "@shared/assets/LightTheme/health.png"
import LeisureIcon from "@shared/assets/LightTheme/leisure.png"
import ShoppingIcon from "@shared/assets/LightTheme/shopping.png"
import RestaurantIcon from "@shared/assets/LightTheme/restaurant.png"
import TransportIcon from "@shared/assets/LightTheme/transport.png"
import { TransCategories } from "@entities/Transaction/model/useGetTransactions.tsx"


export const CategoriesIcons = new Map<TransCategories, string>()
CategoriesIcons.set("Family", FamilyIcon)
CategoriesIcons.set("Gifts", GiftsIcon)
CategoriesIcons.set("Groceries", GroceriesIcon)
CategoriesIcons.set("Health", HealthIcon)
CategoriesIcons.set("Leisure", LeisureIcon)
CategoriesIcons.set("Shopping", ShoppingIcon)
CategoriesIcons.set("Restaurant", RestaurantIcon)
CategoriesIcons.set("Transport", TransportIcon)
