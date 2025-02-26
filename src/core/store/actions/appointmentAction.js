import { DOCTOR_AVAILABLE } from "./actionTypes";

export const doctorAvailable = (data) => {
  return (dispatch) => {
    dispatch({
      type: DOCTOR_AVAILABLE,
      payload: data,
    });
  };
};
