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
  username: "",
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
    // httpClient.interceptors.request.use((config?: AxiosRequestConfig): any =>{
    //   if (config && config.headers) {
    //     config.headers["Authorization"] = `Bearer ${response.token}`;
    //   }

    //   return config;
    // });
    return response;
  }
);
export const signOut = createAsyncThunk("user/signout", async () => {
  await serverService.signOut();
  Router.push("/login");
});
export const getSession = createAsyncThunk("user/fetchSession",async () => {
    const response = await serverService.getSession()
    // if (response) {
    //   // httpClient.interceptors.request.use((config?: AxiosRequestConfig) => {
    //   //   if (config && config.headers && response.user) {
    //   //     config.headers["Authorization"] = `Bearer ${response.user?.token}`;
    //   //   }
    //   //   return config;
    //   // });
    // }
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
      console.log("user slice:",action.payload)
      state.accessToken = action.payload.token;
      state.isAuthenticated = true;
      state.isAuthenticating = false;
      state.username = action.payload.user.username
        // state.user = action.payload.user
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.accessToken = "";
      state.isAuthenticated = false;
      state.isAuthenticating = true;
      state.user = undefined;
    });
    builder.addCase(signOut.fulfilled, (state, action) => {
      console.log("user slice:",action.payload)
      state.accessToken = "",
      state.isAuthenticated = false;
      state.isAuthenticating = false;
      state.username = ""
        // state.user = action.payload.user
    });
    builder.addCase(getSession.fulfilled, (state, action) => {
      state.isAuthenticating = false;
       if (action.payload && action.payload.user && action.payload.user.token) {
        state.accessToken = action.payload.user.token;
        state.user = action.payload.user;
        state.username = action.payload.user.username;
        state.isAuthenticated = true;
       }
    });
  },
});
export const { resetUsername } = userSlice.actions;

// // export common user selector
export const userSelector = (store: RootState) => store.user;
export const isAuthenticatedSelector = (store: RootState): boolean =>
  store.user.isAuthenticated;
export const isAuthenticatingSelector = (store: RootState): boolean =>
  store.user.isAuthenticating;

// export reducer
export default userSlice.reducer;
