import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { rootReducer } from "../reducers/rootReducer";



export const store = configureStore({
    reducer: rootReducer,
    // devTools: process.env.NODE_ENV !== "production",
    // middleware: getDefaultMiddleware({
    //     serializableCheck: false
    // }).concat(thunk)
});



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// export const useAppDispatch = () => useAppDispatch<AppDispatch>();
// export const useAppSelector: TypedSelectorHook<RootState> = useSelector;