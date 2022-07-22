/*
 * File: CartList.js
 * Project: leanscale_react
 * Author: Emre Tosun (emre@emretosun.dev)
 * -----
 * Last Modified: 2022
 * Modified By: Emre Tosun (emre@emretosun.dev)
 * -----
 * Copyright 2022 - 2022 Emre Tosun
 */
import React, { useMemo, useEffect } from "react";
import { Button, Col, Row, Card, Divider, Popover, Alert } from "antd";
import Marquee from "react-fast-marquee";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCartOutlined, InfoOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";
import { InputNumber, List } from "antd";
import { NavLink } from "react-router-dom";
import {
	deleteCartItem,
	getCartItems,
	updateCartItemQty,
} from "../../redux/cart";

const CartList = () => {
	const store = useSelector((store) => store.cart);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCartItems());
	}, [dispatch]);

	const onChange = (code, value) => {
		if (value === null) value = 1;
		dispatch(updateCartItemQty({ code, value }));
	};
	const onDelete = (code) => {
		dispatch(deleteCartItem(code));
	};

	const determineDeliveryFee = useMemo(() => {
		const total = store.cart.reduce(
			(p, n) => p + Math.round(n.quantity * n.price * 100) / 100,
			0
		);
		if (total < 50) {
			return 4.95;
		} else if (total < 90) {
			return 2.95;
		} else {
			return 0;
		}
	}, [store.cart]);

	const lookForDiscount = useMemo(() => {
		const hasRedPlate =
			store.cart.findIndex((item) => item.code === "R01") > -1;
		if (hasRedPlate) {
			const quantity = store.cart.at(
				store.cart.findIndex((item) => item.code === "R01")
			).quantity;
			if (quantity > 1) {
				const discount =
					Math.round(
						(store.cart.at(store.cart.findIndex((item) => item.code === "R01"))
							.price /
							2) *
							100
					) / 100;
				return discount;
			} else {
				return 0;
			}
		}
		return 0;
	}, [store.cart]);

	return (
		<>
			{store.cart.length ? (
				<Row justify="space-around" gutter={[24, 24]}>
					<Col xs={24} lg={16} xl={12}>
						{lookForDiscount !== 0 ? (
							<Alert
								message='Second "Red Plate" discount is applied.'
								type="success"
								showIcon
							/>
						) : (
							<Alert
								showIcon={false}
								banner
								message={
									<Marquee pauseOnHover gradient={false}>
										Second "Red Plate" is %50 cheaper!
									</Marquee>
								}
							/>
						)}
						<List
							itemLayout="vertical"
							size="large"
							dataSource={store.cart}
							renderItem={(item) => (
								<List.Item
									key={item.title}
									actions={[
										<InputNumber
											min={1}
											max={10}
											addonAfter={item.quantity > 1 ? "Pcs." : "Pc."}
											value={item.quantity}
											onChange={(value) => onChange(item.code, value)}
										/>,
										<Button
											onClick={() => onDelete(item.code)}
											type="dashed"
											icon={<DeleteOutlined />}
										/>,
									]}
									extra={<img width={150} alt="logo" src={item.image} />}
								>
									<List.Item.Meta
										title={
											<NavLink to={`/products/${item.slug}`}>
												{item.name}
											</NavLink>
										}
										description={`$${item.price} / 1pc.`}
									/>
									{item.description}
								</List.Item>
							)}
						/>

						<Alert
							message="Delivery Fee Rules"
							description={
								<>
									<p>
										1. Orders under $50 will be charged a $4.95 delivery fee.
									</p>
									<p>
										2. Orders between $50 and $90 will be charged a $2.95
										delivery fee.
									</p>
									<p>3. Orders over $90 will be shipped free.</p>
								</>
							}
							type="info"
							showIcon
						/>
					</Col>
					<Col xs={24} lg={8} xl={6}>
						<Card title="Checkout" bordered={true}>
							{store.cart.map((item) => (
								<div key={`co-${item.code}`} className="co-product-price">
									<p>{item.name}</p>
									<strong>
										${Math.round(item.quantity * item.price * 100) / 100}
									</strong>
								</div>
							))}
							<div className="co-product-price">
								<p>Delivery Fee</p>
								<strong>${determineDeliveryFee}</strong>
							</div>
							{lookForDiscount !== 0 && (
								<>
									<Divider />
									<div className="co-product-price">
										<p style={{ marginBottom: 0 }}>
											Discount
											<Popover
												content='Second "Red Plate" has a 50% discount.'
												title="Discount"
												trigger="hover"
											>
												<Button
													style={{ marginLeft: "8px" }}
													type="dashed"
													size="small"
													shape="circle"
													icon={<InfoOutlined />}
												/>
											</Popover>
										</p>

										<strong style={{ color: "green", marginBottom: 0 }}>
											-$
											{lookForDiscount}
										</strong>
									</div>
								</>
							)}
							<Divider />
							<div className="co-product-price">
								<p>Grand Total</p>
								<strong>
									$
									{Math.round(
										(store.cart.reduce(
											(p, n) =>
												p + Math.round(n.quantity * n.price * 100) / 100,
											0
										) +
											determineDeliveryFee -
											lookForDiscount) *
											100
									) / 100}
								</strong>
							</div>
						</Card>
					</Col>
				</Row>
			) : (
				<>
					<Row style={{ textAlign: "center" }}>
						<Col span={24}>
							<ShoppingCartOutlined style={{ fontSize: 48 }} />
							<p>Your cart is empty.</p>
						</Col>
					</Row>
				</>
			)}
		</>
	);
};

export default CartList;
