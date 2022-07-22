/*
 * File: cart.js
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

export const getCartItems = createAsyncThunk("cart/getCartItems", async () => {
	const response = await axios.get("/api/cart");
	return response.data;
});

export const addToCart = createAsyncThunk("cart/addToCart", async (code) => {
	const response = await axios.post("/api/add-to-cart", { code: code });
	return response.data;
});

export const updateCartItemQty = createAsyncThunk(
	"cart/updateCartItemQty",
	async ({ code, value }, { dispatch }) => {
		const response = await axios.post("/api/increment-cart-item-qty", {
			code: code,
			value: value,
		});
		dispatch(getCartItems());
		return response.data;
	}
);

export const deleteCartItem = createAsyncThunk(
	"cart/removeFromCart",
	async (code, { dispatch }) => {
		await axios.delete(`/api/delete-cart-item/${code}`);
		dispatch(getCartItems());
		return code;
	}
);

export const cartSlice = createSlice({
	name: "cart",
	initialState: {
		cart: [],
		isLoading: true,
	},
	reducers: {
		increment: (state, action) => {
			state.cart = state.cart.map((item) =>
				item.code === action.payload.code
					? { ...item, quantity: action.payload.value }
					: item
			);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getCartItems.fulfilled, (state, action) => {
			state.cart = action.payload.products;
			state.isLoading = false;
		});
	},
});
export const { increment } = cartSlice.actions;
export default cartSlice.reducer;
