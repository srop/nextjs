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


export const signIn = createAsyncThunk(
  "user/signin",
  async (credential: SignAction) => {
    const response = await httpClient.post(`auth/login`, credential,{
      baseURL: process.env.LOCAL_API,
    });
    // const response = await httpClient.post(`auth/login`, credential);
    console.log(response.data);
    if (!response.data) {
      throw new Error("login failed");
    }

    //set access token
    httpClient.interceptors.request.use((config?: AxiosRequestConfig): any => {
      if (config && config.headers) {
        console.log("set auth");
        config.headers["Authorization"] = `Bearer ${response.data.token}`;
      }

      return config;
    });

    return response;
  }
);

export const signOut = createAsyncThunk("user/signout", async () => {
  await httpClient.get(`auth/logout`, {
    baseURL: process.env.LOCAL_API,
  });
  //await serverService.signOut();
  Router.push("/login");
});
export const getProfile = createAsyncThunk("user/getProfile", async () => {
  const response = await httpClient.get(`users/15`);
  return response.data;
});

export const getSession = createAsyncThunk("user/fetchSession", async () => {
  const response = await httpClient.get(`auth/session`, {
    baseURL: process.env.LOCAL_API,
  });
  console.log("getSession getSessiongetSessiongetSession :", response.data);

  // const response = await serverService.getSession();
  // if (response) {
  //   httpClient.interceptors.request.use((config?: AxiosRequestConfig): any => {
  //     if (config && config.headers && response.data) {
  //       config.headers["Authorization"] = `Bearer ${response.data.user?.token}`;
  //     }
  //     return config;
  //   });
  // }
  return response;
});

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    resetUsername: (state, action: PayloadAction<SingleProp>) => {
      state.username = action.payload.data;
    },
  },
  extraReducers: (builder) => {
   
    builder.addCase(signIn.fulfilled, (state, action) => {
      console.log("user slice:", action.payload.data);
      state.accessToken = action.payload.data.token;
      state.isAuthenticated = true;
      state.isAuthenticating = false;
      // state.username = action.payload.data.username;
      // state.user = action.payload.data;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.accessToken = "";
      state.isAuthenticated = false;
      state.isAuthenticating = true;
      state.user = undefined;
    });
    builder.addCase(signOut.fulfilled, (state, action) => {
      (state.accessToken = ""), (state.isAuthenticated = false);
      state.isAuthenticating = false;
      state.username = "";
      // state.user = action.payload.user
    });
    builder.addCase(getSession.fulfilled, (state, action) => {
      state.isAuthenticating = false;
      console.log("getSession slice:", action.payload.data);
      if (action.payload && action.payload.data && action.payload.data.user) {
        state.accessToken = action.payload.data.user.token;
        state.user = action.payload.data.user;
        state.isAuthenticated = true;
      }
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      console.log(action.payload.data)
   
        console.log(action.payload)
        state.user = action.payload
        state.username = action.payload.username
        state.isAuthenticated = true;
        state.isAuthenticating = false;
      
    });
    builder.addCase(getSession.rejected, (state, action) => {
      state.accessToken = "";
      state.isAuthenticated = false;
      state.isAuthenticating = true;
      state.user = undefined;
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
