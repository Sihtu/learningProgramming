import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, initialState } from "../../types/types";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (loginUserParam: User, thunkApi) => {
    console.log(loginUserParam);
    const { email, password } = loginUserParam;
    const respond = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await respond.json();
    loginUserParam.onSuccess && loginUserParam.onSuccess();
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (loginUserParam: User, thumkApi) => {
    const { email, password } = loginUserParam;
    const respond = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const { token } = await respond.json();
    localStorage.setItem("key", token);
    console.log(token);
    loginUserParam.onSuccess && loginUserParam.onSuccess();
  }
);


const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User[]>) => {
      state.item = action.payload;
    },
  },
});

export default user.reducer;
