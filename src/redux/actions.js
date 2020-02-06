import { ADD_USER_INPUT } from "./actionTypes";
export const addUserInput = input => ({
  type: ADD_USER_INPUT,
  payload: { input }
});
