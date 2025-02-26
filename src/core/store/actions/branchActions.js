import { SET_BRANCH, RELOAD_APP } from "./actionTypes";

export const setBranch = (branchId) => ({
  type: SET_BRANCH,
  payload: branchId
});

export const reloadApp = () => ({
  type: RELOAD_APP
});
  