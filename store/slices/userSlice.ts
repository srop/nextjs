import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "@/models/user.model";
import { RootState } from "@/store/store";
import * as serverService from "@/services/userService";
 import httpClient from "@/utils/httpClient";
import { AxiosRequestConfig } from "axios";
import Router from "next/router";
interface UserState {
  username: string;
  accessToken: string;
  error?: string;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  user?: UserData;
}

interface SingleProp {
  data: string;
}

const initialState: UserState = {
  username: "xxxxxxxxxxxx",
  accessToken: "",
  isAuthenticated: false,
  isAuthenticating: true,
  user: undefined,
};

interface SignAction {
  username: string;
  password: string;
}
export const signUp = createAsyncThunk(
  "user/signup",
  async (credential: SignAction) => {
    const result = await serverService.signUp(credential)
    return result
   }
);

export const signIn = createAsyncThunk(
  "user/signin",
  async (credential: SignAction) => {
    const response = await serverService.signIn(credential);
    if (response.result != "ok") {
      throw new Error("login failed");
    }

    // set access token
    httpClient.interceptors.request.use((config?: AxiosRequestConfig): any =>{
      if (config && config.headers) {
        config.headers["Authorization"] = `Bearer ${response.token}`;
      }

      return config;
    });
    return response;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    resetUsername: (state, action: PayloadAction<SingleProp>) => {
      state.username = action.payload.data;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.accessToken = "";
      state.user = undefined;
      state.isAuthenticated = false;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
        console.log(action.payload)
        state.username = action.payload.result;
    });
  },
});
export const { resetUsername } = userSlice.actions;

// // export common user selector
export const userSelector = (store: RootState) => store.user;
// export const isAuthenticatedSelector = (store: RootState): boolean =>
//   store.user.isAuthenticated;
// export const isAuthenticatingSelector = (store: RootState): boolean =>
//   store.user.isAuthenticating;

// export reducer
export default userSlice.reducer;
