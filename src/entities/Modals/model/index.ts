import { combineReducers } from "@reduxjs/toolkit"
import { ChangeDateMenuReducer } from "@entities/Modals/model/ChangeDateMenuSlice.ts"
import { ChangeTitleMenuReducer } from "@entities/Modals/model/ChangeTitleMenuClice.ts"
import { ChooseAccountMenuReducer } from "@entities/Modals/model/ChooseAccountMenuClice.ts"
import { ChooseCategoryMenuReducer } from "@entities/Modals/model/ChooseCategoryMenuSlice.ts"
import { ChooseCategorySlideMenuReducer } from "@entities/Modals/model/ChooseCategorySlideMenuSlice.ts"
import { EditCreateTransMenuReducer } from "@entities/Modals/model/EditCreateTransMenuSlice.ts"
import { CalendarMenuReducer } from "@entities/Modals/model/CalendarMenuSlice.ts"

export const ModalsReducer = combineReducers({
  ChangeDateMenu: ChangeDateMenuReducer,
  ChangeTitleMenu: ChangeTitleMenuReducer,
  ChooseAccountMenu: ChooseAccountMenuReducer,
  ChooseCategoryMenu: ChooseCategoryMenuReducer,
  ChooseCategorySlideMenu: ChooseCategorySlideMenuReducer,
  EditCreateTransMenu: EditCreateTransMenuReducer,
  CalendarMenu: CalendarMenuReducer
})