/*
 * File: products.js
 * Project: leanscale_react
 * Author: Emre Tosun (emre@emretosun.dev)
 * -----
 * Last Modified: 2022
 * Modified By: Emre Tosun (emre@emretosun.dev)
 * -----
 * Copyright 2022 - 2022 Emre Tosun
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
	"products/getProducts",
	async () => {
		const response = await axios.get("/api/products");
		return { data: response.data };
	}
);

export const getProduct = createAsyncThunk(
	"products/getProduct",
	async (slug) => {
		const response = await axios.get(`/api/products/${slug}`);
		return response.data;
	}
);

export const productsSlice = createSlice({
	name: "products",
	initialState: {
		products: [],
		viewingProduct: {
			product: {},
			notFound: false,
		},
		isLoading: true,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getProducts.fulfilled, (state, action) => {
				state.products = action.payload.data.products;
				state.isLoading = false;
			})
			.addCase(getProduct.fulfilled, (state, action) => {
				state.viewingProduct.product = action.payload.product;
				state.viewingProduct.notFound = false;
			})
			.addCase(getProduct.rejected, (state, action) => {
				state.viewingProduct.product = {};
				state.viewingProduct.notFound = true;
			});
	},
});

export default productsSlice.reducer;
