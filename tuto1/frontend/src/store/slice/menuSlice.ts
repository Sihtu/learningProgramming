import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetMenu } from "../../types/types";
import { useDispatch } from "react-redux";
interface Menu {
  id?: number;
  name: string;
  price: number;
}
interface Init {
  item: Menu[];
  isLoading: boolean;
  error: String | null;
}

const initialState: Init = {
  item: [],
  isLoading: false,
  error: null,
};


export const NewMenu = createAsyncThunk(
  "user/NewMenu",
  async (NewMenu: GetMenu) => {
    const respond = await fetch("http://localhost:5000/menu", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(NewMenu)
    })
    const data = await respond.json()
    console.log(data)
    const {menu}:any = data
    NewMenu.onSuccess && NewMenu.onSuccess()
    return menu
   
  }
);
const menu = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenu: (state, action: PayloadAction<Menu[]>) => {
      state.item = action.payload;
    },
    addMenu: (state, action: PayloadAction<Menu>) => {
      state.item = [...state.item, action.payload];
    },
    removeMenu: (state, action: PayloadAction<Menu>) => {
      state.item = state.item.filter((item) => item.id !== action.payload.id);
    },
  },
  extraReducers: (builder) =>{
    builder.addCase(NewMenu.pending, (state, action) =>{
      state.isLoading = true
      state.error = null
    }).addCase(NewMenu.fulfilled, (state, action)=> {
      state.item = action.payload
      state.isLoading = false
      
    }).addCase(NewMenu.rejected,(state,action) =>{
      const e = new Error("Error is occoured")
      state.error = e.message
    })
  }
});

export const {addMenu,setMenu, removeMenu} = menu.actions;
export default menu.reducer;