import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ICategory } from "@entities/Category/type.ts"
import { TransactionType } from "@entities/Transaction/types.ts"

interface initialState {
  id: number | null
  name: string
  color: string
  icon: string
  userId: number | null
  type: TransactionType
}

const initialState: initialState = {
  id: null,
  userId: null,
  name: "",
  color: "",
  icon: "",
  type: "expense"
}

const NewCategorySlice = createSlice({
  name: "CategorySlice",
  initialState,
  reducers: {
    setNewCategoryType(state, action: PayloadAction<TransactionType>) {
      state.type = action.payload
    },
    setCreateCategory(state, action: PayloadAction<Omit<ICategory, "id">>) {
      const { type, color, userId, name, icon } = action.payload
      state.type = type
      state.color = color
      state.userId = userId
      state.name = name
      state.icon = icon
    },
    setEditCategory(state, action: PayloadAction<ICategory>) {
      const { type, color, userId, name, icon, id } = action.payload
      state.type = type
      state.id = id
      state.color = color
      state.userId = userId
      state.name = name
      state.icon = icon
    },
    setNewCategoryName(state, action: PayloadAction<string>) {
      state.name = action.payload
    },
    setNewCategoryIcon(state, action: PayloadAction<string>) {
      state.icon = action.payload
    },
    setNewCategoryColor(state, action: PayloadAction<string>) {
      state.color = action.payload
    },
    resetEditCategory(state) {
      state.id = null
      state.color = ""
      state.userId = null
      state.name = ""
      state.icon = ""
    }


  }
})

export const NewCategoryReducer = NewCategorySlice.reducer
export const {
  setNewCategoryType,
  setCreateCategory,
  resetEditCategory,
  setNewCategoryName,
  setNewCategoryColor, setNewCategoryIcon, setEditCategory
} = NewCategorySlice.actions
