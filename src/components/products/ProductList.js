/*
 * File: ProductList.js
 * Project: leanscale_react
 * Author: Emre Tosun (emre@emretosun.dev)
 * -----
 * Last Modified: 2022
 * Modified By: Emre Tosun (emre@emretosun.dev)
 * -----
 * Copyright 2022 - 2022 Emre Tosun
 */
import React from "react";
import { Row } from "antd";
import { useSelector } from "react-redux";
import ProductListItem from "./ProductListItem";

const ProductList = () => {
	const store = useSelector((store) => store.products);
	return (
		<>
			{!store.isLoading && (
				<Row gutter={[24, 24]}>
					{store.products.map((item) => {
						return <ProductListItem item={item} key={`product-${item.code}`} />;
					})}
				</Row>
			)}
		</>
	);
};

export default ProductList;
