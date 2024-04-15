import { configureStore } from "@reduxjs/toolkit";
import menuSlice from "./slice/menuSlice";
import userSlice from "./slice/userSlice";
import AppSnackBarSlice from "./slice/AppSnackBarSlice";

export const store = configureStore({
    reducer: {
        menu: menuSlice,
        user: userSlice,
        AppSnackBar: AppSnackBarSlice
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch