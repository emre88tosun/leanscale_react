/*
 * File: Products.js
 * Project: leanscale_react
 * Author: Emre Tosun (emre@emretosun.dev)
 * -----
 * Last Modified: 2022
 * Modified By: Emre Tosun (emre@emretosun.dev)
 * -----
 * Copyright 2022 - 2022 Emre Tosun
 */
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { PageHeader } from "antd";
import { useDispatch } from "react-redux";
import { getProducts } from "../redux/products";
import ProductList from "../components/products/ProductList";
import { getCartItems } from "../redux/cart";

const Products = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProducts());
		dispatch(getCartItems());
	}, [dispatch]);

	return (
		<>
			<Helmet>
				<title>Products - Plates Co.</title>
			</Helmet>
			<PageHeader
				className="site-page-header"
				style={{ padding: 0 }}
				title="Products"
			/>
			<ProductList />
		</>
	);
};

export default Products;
