import {
  SET_LOGIN_DATA,
  REMEMBER_ME,
  SET_BRANCH,
  RELOAD_APP,
  LOGOUT
} from "../actions/actionTypes";

const initialState = {
  branchId: null,
  username: null,
  loggedInUserId: null,
  role: null,
  userImg: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_DATA:
      localStorage.setItem("branchId", action.payload.branchMaster.branchId);
      return {
        ...state,
        branchId: action.payload.branchMaster.branchId,
        username: action.payload.userName,
        loggedInUserId: action.payload.id,
        role: action.payload.roleMaster.roleName,
        userImg: action.payload.userImg
      };
    case REMEMBER_ME:
      localStorage.setItem("rememberedUsername", action.payload.userName);
      return {
        ...state
      };
    case SET_BRANCH:
      localStorage.setItem("branchId", action.payload);
      return { ...state, branchId: action.payload };
    case RELOAD_APP:
      window.location.reload();
      return state;
    case LOGOUT:
      localStorage.removeItem("rememberedUsername");
      localStorage.removeItem("branchId");
      window.location.reload();
      return {
        branchId: null,
        username: null,
        loggedInUserId: null,
        role: null,
        userImg: null
      };
    default:
      return state;
  }
};

export default reducer;
