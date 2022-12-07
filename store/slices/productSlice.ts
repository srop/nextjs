import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import httpClient from "@/utils/httpClient";
// import * as serverService from "@/services/serverService";
import { ProductData } from "@/models/product.model";
import { RootState, store } from "../store";

interface ProductState {
  total: number;
  skip: number;
  limit: number;
  products: ProductData[];
}

const initialState: ProductState = {
  products: [],
  total:0,
  skip:0,
  limit:0
};

export const getProducts = createAsyncThunk(
  "product/get",
  async () => {
    const response = await httpClient.get(`products`);
    console.log(response.data);
    return response.data
  }
);


const productSlice = createSlice({
  name: "productList",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
       
      state.products = action.payload.products
    
    });
  },
});

// export common user selector
export const productSelector = (store: RootState) => store.productList

// export reducer
export default productSlice.reducer;
