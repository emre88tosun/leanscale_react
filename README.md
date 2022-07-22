# LeanScale Case Study - ReactJS

Basic e-commerce project with 3 products. I've used axios-mock-adapter for API calls & fake database, Redux for state management and Ant Desing of React for UI concerns.

## Getting Started

First of all, you need to clone the project to your local.

```
git clone https://github.com/emre88tosun/leanscale_react.git
cd leanscale_react
```

### Building

### `yarn && yarn start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Testing

### `yarn test`

Launches the test runner. I've provided few Redux tests.

## Developer Notes

1. Simply we've 4 pages: Products, Cart, Product Detail and 404.
2. Our state starts with empty arrays of Products and Cart Items.
3. When we hit the first load of Products page, products will be retrieved from fake database.
4. Users may add items to cart via "Add To Cart" buttons that are located in products page or product details page.
5. Users may increase or decrease amount of goods via input spinners in cart page.
6. Users may delete item from cart via delete button in cart page.

### Assumptions

1. Since I've used axios-mock-adapter, I did not cover all the createAsyncThunk's states (pending or rejected). We could use them for loading indicators or error showing in real world cases.
2. Since there is only one offer for users, the initial offer (Second red plate offer) is hard-coded . We could design a flexible logic:
```
1. API call for offers
2. Offer's apply condition ( eg. Total price is bigger than 100$, Cart has 3 spesific items )
3. Applying discount
```
