/*
 * File: store.test.js
 * Project: leanscale_react
 * Author: Emre Tosun (emre@emretosun.dev)
 * -----
 * Last Modified: 2022
 * Modified By: Emre Tosun (emre@emretosun.dev)
 * -----
 * Copyright 2022 - 2022 Emre Tosun
 */
import { store } from "./store";
import mock from "../tosun-db/mock";
import { getProducts } from "./products";

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

const mockNetworkResponse = () => {
	mock.onGet("/api/products").reply(() => {
		data.products.forEach((product) => {
			product.isInCart = false;
		});
		return [
			200,
			{
				products: data.products,
			},
		];
	});
};

describe("Products redux state tests", () => {
	beforeAll(() => {
		mockNetworkResponse();
	});
	it("Should initially set products to an empty array", () => {
		const state = store.getState().products;
		expect(state.products).toEqual([]);
	});
	it("Should initially set cart to an empty array", () => {
		const state = store.getState().cart;
		expect(state.cart).toEqual([]);
	});
	it("Should be able to fetch all products", async () => {
		const result = await store.dispatch(getProducts());
		const products = result.payload.data.products;

		expect(result.type).toBe("products/getProducts/fulfilled");
		expect(products[0]).toEqual(data.products[0]);

		const state = store.getState().products.products;
		expect(state).toEqual(products);
	});
});
