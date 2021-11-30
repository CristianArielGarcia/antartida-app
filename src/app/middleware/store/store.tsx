import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import thunk from "redux-thunk";
import { rootReducer } from "../reducers/rootReducer";



export const store = configureStore({
    reducer: rootReducer,
    // devTools: process.env.NODE_ENV !== "production",
    middleware: getDefaultMiddleware({
        serializableCheck: false
    }).concat(thunk)
});



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;