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
import React from "react";
import { useSelector } from "react-redux";
import {
	Button,
	Col,
	Row,
	Image,
	Typography,
	Divider,
	Result,
	Alert,
} from "antd";
import { ShoppingCartOutlined, PlusOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { addToCart, getCartItems } from "../../redux/cart";
import { useDispatch } from "react-redux";
import { getProduct, getProducts } from "../../redux/products";

const { Title } = Typography;
const ProductDetail = () => {
	const dispatch = useDispatch();

	const store = useSelector((state) => state.products.viewingProduct);
	const handleCartBtn = (code, val) => {
		if (val === false) {
			dispatch(addToCart(code));
		}
		dispatch(getProducts());
		dispatch(getProduct(store.product.slug));
		dispatch(getCartItems());
	};
	return (
		<>
			{store.notFound ? (
				<Result
					status="404"
					title="404"
					subTitle="Sorry, the product you are looking for does not exist."
					extra={
						<Button type="primary">
							<NavLink to="/">Back Home</NavLink>
						</Button>
					}
				/>
			) : (
				<Row justify="space-around" gutter={[24, 24]}>
					<Col xs={24} lg={8} xl={6}>
						<Image src={store.product.image} />
					</Col>
					<Col xs={24} lg={16} xl={12}>
						<Title level={4}>{store.product.name}</Title>
						<Title level={5} type="secondary">
							${store.product.price} / 1pc.
						</Title>
						<p>{store.product.description}</p>
						{store.product.code === "R01" && (
							<>
								<Divider />
								<Title level={4}>Offers</Title>
								<Alert
									style={{ marginBottom: "16px" }}
									message='Second "Red Plate" is 50% cheaper!'
									type="info"
								/>
							</>
						)}
						{store.product.isInCart ? (
							<NavLink to="/cart">
								<Button type="primary" icon={<ShoppingCartOutlined />}>
									View In Cart
								</Button>
							</NavLink>
						) : (
							<Button
								onClick={() =>
									handleCartBtn(store.product.code, store.product.isInCart)
								}
								type="primary"
								icon={<PlusOutlined />}
							>
								Add To Cart
							</Button>
						)}
					</Col>
				</Row>
			)}
		</>
	);
};

export default ProductDetail;
