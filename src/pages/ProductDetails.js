/*
 * File: ProductDetails.js
 * Project: leanscale_react
 * Author: Emre Tosun (emre@emretosun.dev)
 * -----
 * Last Modified: 2022
 * Modified By: Emre Tosun (emre@emretosun.dev)
 * -----
 * Copyright 2022 - 2022 Emre Tosun
 */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../redux/products";
import { Helmet } from "react-helmet";
import { PageHeader } from "antd";
import ProductDetail from "../components/products/ProductDetail";

const ProductDetails = () => {
	const slug = useParams().slug;
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getProduct(slug));
	}, [dispatch, slug]);
	return (
		<>
			<Helmet>
				<title>Product Details - Plates Co.</title>
			</Helmet>
			<PageHeader
				className="site-page-header"
				style={{ padding: 0 }}
				title="Product Details"
			/>
			<ProductDetail />
		</>
	);
};

export default ProductDetails;
