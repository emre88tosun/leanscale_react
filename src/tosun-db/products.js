/*
 * File: products.js
 * Project: leanscale_react
 * Author: Emre Tosun (emre@emretosun.dev)
 * -----
 * Last Modified: 2022
 * Modified By: Emre Tosun (emre@emretosun.dev)
 * -----
 * Copyright 2022 - 2022 Emre Tosun
 */
import mock from "./mock";

const data = {
	products: [
		{
			name: "Red Plate",
			slug: "red-plate-r01",
			description:
				"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt, id. Quam, excepturi cum, recusandae voluptatum perspiciatis repudiandae doloremque perferendis omnis aspernatur nostrum maiores suscipit numquam accusantium blanditiis nemo quisquam earum?",
			price: 32.95,
			image:
				"https://productimages.hepsiburada.net/s/68/550/110000009672421.jpg",
			code: "R01",
		},
		{
			name: "Green Plate",
			slug: "green-plate-g01",
			description:
				"Elit ad culpa duis nostrud. Enim tempor culpa aliqua dolor cupidatat anim consequat aliquip. Elit adipisicing irure velit officia veniam consequat sit est id officia.",
			price: 24.95,
			image:
				"https://productimages.hepsiburada.net/s/68/550/110000009670847.jpg",
			code: "G01",
		},
		{
			name: "Blue Plate",
			slug: "blue-plate-b01",
			description:
				"Et aliqua consectetur ad quis adipisicing est occaecat occaecat veniam minim aliquip consectetur. Qui enim tempor exercitation in. Fugiat reprehenderit do officia laborum. Cillum aute elit excepteur eu. Occaecat elit consectetur laboris in ad occaecat magna duis nisi tempor sint pariatur.",
			price: 7.95,
			image:
				"https://productimages.hepsiburada.net/s/68/550/110000009670876.jpg",
			code: "B01",
		},
	],
	cart: [],
};

// ------------------------------------------------
// GET: Return products
// ------------------------------------------------
mock.onGet("/api/products").reply(() => {
	data.products.forEach((product) => {
		product.isInCart = data.cart.findIndex((p) => p.code === product.code) > -1;
	});
	return [
		200,
		{
			products: data.products,
		},
	];
});

// ------------------------------------------------
// GET: Return cart products
// ------------------------------------------------
mock.onGet("/api/cart").reply(() => {
	const products = data.cart.map((cartProduct) => {
		const product = data.products.find((p) => p.code === cartProduct.code);

		product.quantity = cartProduct.quantity;

		return product;
	});

	return [200, { products: products ?? [] }];
});

// ------------------------------------------------
// POST: Add item to cart
// ------------------------------------------------
mock.onPost("/api/add-to-cart").reply((config) => {
	const { code } = JSON.parse(config.data);
	const { length } = data.cart;
	let lastId = 0;

	if (length) lastId = data.cart[length - 1].i;
	data.cart.push({
		id: lastId + 1,
		code,
		quantity: 1,
	});

	return [201];
});

// ------------------------------------------------
// POST: Update cart item's quantity in cart
// ------------------------------------------------
mock.onPost("/api/increment-cart-item-qty").reply((config) => {
	const { code, value } = JSON.parse(config.data);

	data.cart = data.cart.map((item) =>
		item.code === code ? { ...item, quantity: value } : item
	);

	return [200];
});

// ------------------------------------------------
// DELETE: Remove Item from cart
// ------------------------------------------------
mock.onDelete(/\/api\/delete-cart-item\/\w/).reply((config) => {
	// Get product code from URL
	let productCode = config.url.substring(config.url.lastIndexOf("/") + 1);

	const productIndex = data.cart.findIndex((i) => i.code === productCode);
	if (productIndex > -1) data.cart.splice(productIndex, 1);

	return [200];
});

// ------------------------------------------------
// GET: Return single product
// ------------------------------------------------
mock.onGet(/\/api\/products\/\w/).reply((config) => {
	// Get product slug from URL
	let slug = config.url.substring(config.url.lastIndexOf("/") + 1);

	const productIndex = data.products.findIndex((p) => p.slug === slug);
	const product = data.products[productIndex];

	if (product) {
		product.isInCart = data.cart.findIndex((p) => p.code === product.code) > -1;
		return [200, { product }];
	}
	return [404];
});
