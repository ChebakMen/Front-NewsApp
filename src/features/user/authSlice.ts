import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../app/types";

interface AuthState {
  token: string | null;
  user: User | null
}

const initialState: AuthState = {
  token: null,
  user: null,
}

export const authSlice = createSlice({
  name:'auth',
  initialState,
  reducers:{
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    clearToken(state) {
      state.token = null
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null
    }
  }
})

export const { setToken, clearToken, setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;


