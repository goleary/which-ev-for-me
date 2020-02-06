import { ADD_USER_INPUT } from "../actionTypes";

const initialState = null;

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_USER_INPUT: {
      const { input } = action.payload;
      return { ...input };
    }
    default:
      return state;
  }
}
