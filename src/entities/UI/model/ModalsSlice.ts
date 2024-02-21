import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CurrencyMenuType } from "@features/DefaultCurrencyModal/types.ts"
import {
  EditCreateAccountType,
  EditCreateCategoryType,
  EditCreateMenuType,
  Menus,
} from "@entities/UI/types.ts"

interface initialState {
  editCreateTransMenu: {
    isOpen: boolean
    menuType: EditCreateMenuType
  }
  transCalendarMenu: {
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
  }
  editCreateCurrencyMenu: {
    isOpen: boolean
  }
  currencyMenu: {
    menuType: CurrencyMenuType
    isOpen: boolean
  }
  accountCurrencyMenu: {
    isOpen: boolean
  }
  editCreateCategoryMenu: {
    isOpen: boolean
    menuType: EditCreateCategoryType
  }
  editCreateAccountMenu: {
    isOpen: boolean
    menuType: EditCreateAccountType
  }
  categoryIconPickerMenu: {
    isOpen: boolean
  }
  accountIconPickerMenu: {
    isOpen: boolean
  }
  languageMenu: {
    isOpen: boolean
  }
  themeMenu: {
    isOpen: boolean
  }
  currencyFormatMenu: {
    isOpen: boolean
  }
  dateRangeMenu: {
    isOpen: boolean
  }
  calendarMenu: {
    isOpen: boolean
  }
  changeAccountMenu: {
    isOpen: boolean
  }
}

const initialState: initialState = {
  editCreateTransMenu: {
    isOpen: false,
    menuType: "overview",
  },
  transCalendarMenu: {
    isOpen: false,
  },
  dateMenu: {
    isOpen: false,
  },
  chooseAccountMenu: {
    isOpen: false,
  },
  titleMenu: {
    isOpen: false,
  },
  chooseCategoryMenu: {
    isOpen: false,
  },
  nameMenu: {
    isOpen: false,
  },
  sideBar: {
    isOpen: false,
  },
  chooseCategorySlideMenu: {
    isOpen: false,
  },
  passwordMenu: {
    isOpen: false,
  },
  signOutMenu: {
    isOpen: false,
  },
  editCreateCurrencyMenu: {
    isOpen: false,
  },
  currencyMenu: {
    isOpen: false,
    menuType: "currency",
  },
  accountCurrencyMenu: {
    isOpen: false,
  },
  editCreateCategoryMenu: {
    isOpen: false,
    menuType: "create",
  },
  editCreateAccountMenu: {
    isOpen: false,
    menuType: "create",
  },
  categoryIconPickerMenu: {
    isOpen: false,
  },
  accountIconPickerMenu: {
    isOpen: false,
  },
  languageMenu: {
    isOpen: false,
  },
  themeMenu: {
    isOpen: false,
  },
  currencyFormatMenu: {
    isOpen: false,
  },
  dateRangeMenu: {
    isOpen: false,
  },
  calendarMenu: {
    isOpen: false,
  },
  changeAccountMenu: {
    isOpen: false,
  },
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
    setEditCreateMenuType(state, action: PayloadAction<EditCreateMenuType>) {
      state.editCreateTransMenu.menuType = action.payload
    },
    setEditCategoryMenuType(
      state,
      action: PayloadAction<EditCreateCategoryType>,
    ) {
      state.editCreateCategoryMenu.menuType = action.payload
    },
    setEditAccountMenuType(
      state,
      action: PayloadAction<EditCreateAccountType>,
    ) {
      state.editCreateAccountMenu.menuType = action.payload
    },
    setCurrencyMenuType(state, action: PayloadAction<CurrencyMenuType>) {
      state.currencyMenu.menuType = action.payload
    },
  },
})

export const ModalsReducer = ModalsSlice.reducer
export const {
  closeMenu,
  setEditCreateMenuType,
  openMenu,
  setCurrencyMenuType,
  setEditCategoryMenuType,
  setEditAccountMenuType,
} = ModalsSlice.actions
