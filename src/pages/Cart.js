/*
 * File: Cart.js
 * Project: leanscale_react
 * Author: Emre Tosun (emre@emretosun.dev)
 * -----
 * Last Modified: 2022
 * Modified By: Emre Tosun (emre@emretosun.dev)
 * -----
 * Copyright 2022 - 2022 Emre Tosun
 */
import React from "react";
import { Helmet } from "react-helmet";
import { PageHeader } from "antd";
import CartList from "../components/cart/CartList";

const Cart = () => {
	return (
		<>
			<Helmet>
				<title>Cart - Plates Co.</title>
			</Helmet>
			<PageHeader
				className="site-page-header"
				style={{ padding: 0 }}
				title="Cart"
			/>
			<CartList />
		</>
	);
};

export default Cart;
