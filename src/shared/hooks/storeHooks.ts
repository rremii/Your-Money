import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "@shared/store/types"
import { RootState } from "../store/store.ts"

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector