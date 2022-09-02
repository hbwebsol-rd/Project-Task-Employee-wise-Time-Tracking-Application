// import axios from "axios";

// export const FETCH_PRODUCTS_BEGIN   = 'FETCH_PRODUCTS_BEGIN';
// export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
// export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const LOGGED_IN = 'LOGGED_IN';

// export const fetchProductsBegin = () => ({
//   type: FETCH_PRODUCTS_BEGIN
// });

// export const fetchProductsSuccess = products => ({
//   type: FETCH_PRODUCTS_SUCCESS,
//   payload: { products }
// });

// export const fetchProductsFailure = error => ({
//   type: FETCH_PRODUCTS_FAILURE,
//   payload: { error }
// });

export const loggedIn = ()=>({
  type: LOGGED_IN,
});

// export function fetchProducts() {
//   return dispatch => {
//     dispatch(fetchProductsBegin());
//     return axios
//       .get("/products")
//       .then(res => res.json())
//       .then(json => {
//         dispatch(fetchProductsSuccess(json.products));
//         return json.products;
//       })
//       .catch(error => dispatch(fetchProductsFailure(error)));
//   };
// }


// https://daveceddia.com/where-fetch-data-redux/