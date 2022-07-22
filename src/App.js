/*
 * File: App.js
 * Project: leanscale_react
 * Author: Emre Tosun (emre@emretosun.dev)
 * -----
 * Last Modified: 2022
 * Modified By: Emre Tosun (emre@emretosun.dev)
 * -----
 * Copyright 2022 - 2022 Emre Tosun
 */

import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "antd";
import THeader from "./components/THeader";
import TFooter from "./components/TFooter";
import TContent from "./components/TContent";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Error404 from "./pages/404";
import ProductDetails from "./pages/ProductDetails";

function App() {
	return (
		<Layout className="layout">
			<THeader />
			<TContent>
				<Routes>
					<Route path="/" element={<Products />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/products/:slug" element={<ProductDetails />} />
					<Route path="*" element={<Error404 />} />
				</Routes>
			</TContent>
			<TFooter />
		</Layout>
	);
}

export default App;
