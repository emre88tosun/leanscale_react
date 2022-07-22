/*
 * File: THeader.js
 * Project: leanscale_react
 * Author: Emre Tosun (emre@emretosun.dev)
 * -----
 * Last Modified: 2022
 * Modified By: Emre Tosun (emre@emretosun.dev)
 * -----
 * Copyright 2022 - 2022 Emre Tosun
 */
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import { useSelector } from "react-redux";
const { Header } = Layout;

const THeader = () => {
	const store = useSelector((state) => state.cart);
	const { pathname } = useLocation();
	return (
		<Header>
			<div className="header-cname">Plates Co.</div>
			<Menu
				disabledOverflow={true}
				theme="dark"
				mode="horizontal"
				selectedKeys={[
					pathname === "/cart"
						? "menu-cart"
						: pathname === "/"
						? "menu-products"
						: null,
				]}
				items={[
					{
						label: <NavLink to="/">Products</NavLink>,
						key: "menu-products",
					},
					{
						label: (
							<NavLink to="/cart">
								Cart
								{store.cart.length !== 0 &&
									`  (${store.cart.reduce((p, n) => p + n.quantity, 0)})`}
							</NavLink>
						),
						key: "menu-cart",
					},
				]}
			/>
		</Header>
	);
};

export default THeader;
