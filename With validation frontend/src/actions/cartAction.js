import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  USER_ADD_COUNTER_SUCCESS,
} from "../constants/userConstants";

// export const cartCntr = (counter) => async (dispatch) => {
//   dispatch({
//     type: USER_ADD_COUNTER_SUCCESS,
//     payload: counter,
//   });
// };

export const increment = () => {
  return {
    type: "INCREMENT",
  };
};

export const decrement = () => {
  return {
    type: "DECREMENT",
  };
};

export const reset = () => {
  return {
    type: "RESET",
  };
};

// export const addToCart = (id, qty) => async (dispatch, getState) => {
//   const { data } = await axios.get(`/api/products/${id}`);

//   dispatch({
//     type: CART_ADD_ITEM,
//     payload: {
//       product: data._id,
//       name: data.name,
//       image: data.image,
//       price: data.price,
//       countInStock: data.countInStock,
//       qty,
//     },
//   });

//   localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
// };

// export const removeFromCart = (id) => (dispatch, getState) => {
//   dispatch({
//     type: CART_REMOVE_ITEM,
//     payload: id,
//   });

//   localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
// };
