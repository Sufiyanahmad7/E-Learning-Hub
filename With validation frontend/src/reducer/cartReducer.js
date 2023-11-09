import {
  CART_ADD_ITEM,
  CART_CLEAR_ITEMS,
  CART_REMOVE_ITEM,
} from "../constants/userConstants";

// export const cartCounterReducer = (state = {}, action) => {
//   switch (action.type) {
//     case USER_ADD_COUNTER_REQUEST:
//       return { loading: true };

//     case USER_ADD_COUNTER_SUCCESS:
//       return { loading: false, cartCounter: action.payload };

//     case USER_ADD_COUNTER_FAIL:
//       return { loading: false, error: action.payload };

//     default:
//       return state;
//   }
// };

export const cartCounterReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "RESET":
      return (state = 0);
    default:
      return state;
  }
};

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};
