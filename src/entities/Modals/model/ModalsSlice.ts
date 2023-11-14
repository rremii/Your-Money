import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { EditCreateMenuType, Menus } from "@entities/Modals/types.ts"
import { CurrencyMenuType } from "@features/DefaultCurrencyModal/types.ts"


interface initialState {
  editCreateTransMenu: {
    isOpen: boolean
    menuType: EditCreateMenuType
  }
  calendarMenu: {
    isOpen: boolean
  }
  chooseAccountMenu: {
    isOpen: boolean
  }
  chooseCategoryMenu: {
    isOpen: boolean
  }
  chooseCategorySlideMenu: {
    isOpen: boolean
  }
  nameMenu: {
    isOpen: boolean
  }
  passwordMenu: {
    isOpen: boolean
  }
  sideBar: {
    isOpen: boolean
  }
  titleMenu: {
    isOpen: boolean
  }
  dateMenu: {
    isOpen: boolean
  }
  signOutMenu: {
    isOpen: boolean
  },
  editCreateCurrencyMenu: {
    isOpen: boolean
  },
  currencyMenu: {
    menuType: CurrencyMenuType
    isOpen: boolean
  }

}

const initialState: initialState = {
  editCreateTransMenu: {
    isOpen: false,
    menuType: "overview"
  }, calendarMenu: {
    isOpen: false
  }, dateMenu: {
    isOpen: false
  }, chooseAccountMenu: {
    isOpen: false
  }, titleMenu: {
    isOpen: false
  }, chooseCategoryMenu: {
    isOpen: false
  }, nameMenu: {
    isOpen: false
  }, sideBar: {
    isOpen: false
  }, chooseCategorySlideMenu: {
    isOpen: false
  }, passwordMenu: {
    isOpen: false
  }, signOutMenu: {
    isOpen: false
  }, editCreateCurrencyMenu: {
    isOpen: false
  }, currencyMenu: {
    isOpen: false,
    menuType: "currency"
  }
}

const ModalsSlice = createSlice({
  name: "ModalsSlice",
  initialState,
  reducers: {

    openMenu(state, action: PayloadAction<Menus>) {
      state[action.payload].isOpen = true
    },
    closeMenu(state, action: PayloadAction<Menus>) {
      state[action.payload].isOpen = false
    },
    closeAllMenus(state) {
      state.editCreateTransMenu.isOpen = false
    },
    setEditCreateMenuType(state, action: PayloadAction<EditCreateMenuType>) {
      state.editCreateTransMenu.menuType = action.payload
    },
    setCurrencyMenuType(state, action: PayloadAction<CurrencyMenuType>) {
      state.currencyMenu.menuType = action.payload
    }

  }
})

export const ModalsReducer = ModalsSlice.reducer
export const { closeMenu, setEditCreateMenuType, openMenu, closeAllMenus, setCurrencyMenuType } = ModalsSlice.actions