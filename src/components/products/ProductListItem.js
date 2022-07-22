/*
 * File: ProductListItem.js
 * Project: leanscale_react
 * Author: Emre Tosun (emre@emretosun.dev)
 * -----
 * Last Modified: 2022
 * Modified By: Emre Tosun (emre@emretosun.dev)
 * -----
 * Copyright 2022 - 2022 Emre Tosun
 */
import React from "react";
import { Col, Tooltip } from "antd";
import {
	EyeOutlined,
	ShoppingCartOutlined,
	PlusOutlined,
} from "@ant-design/icons";
import { Card } from "antd";
import { NavLink } from "react-router-dom";
import { addToCart, getCartItems } from "../../redux/cart";
import { useDispatch } from "react-redux";
import { getProducts } from "../../redux/products";
const { Meta } = Card;

const ProductListItem = ({ item }) => {
	const dispatch = useDispatch();

	const handleCartBtn = (code, val) => {
		if (val === false) {
			dispatch(addToCart(code));
		}
		dispatch(getProducts());
		dispatch(getCartItems());
	};

	return (
		<Col className="gutter-row" xs={24} md={12} lg={8} xl={4}>
			<Card
				cover={<img alt={`${item.code}-img`} src={`${item.image}`} />}
				actions={[
					<Tooltip title="Show Detail">
						<NavLink to={`/products/${item.slug}`}>
							<EyeOutlined />
						</NavLink>
					</Tooltip>,
					<>
						{item.isInCart ? (
							<Tooltip title="View In Cart">
								<NavLink to="/cart">
									<ShoppingCartOutlined />
								</NavLink>
							</Tooltip>
						) : (
							<Tooltip title="Add To Cart">
								<PlusOutlined
									onClick={() => handleCartBtn(item.code, item.isInCart)}
								/>
							</Tooltip>
						)}
					</>,
				]}
			>
				<Meta
					title={
						<>
							{item.name}
							<div className="ant-card-meta-description">${item.price}</div>
						</>
					}
				/>
			</Card>
		</Col>
	);
};

export default ProductListItem;
