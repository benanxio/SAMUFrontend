import { Dispatch } from "redux";
import fetchVerifyToken from "../../services/fetch-verify-token";
import { getTokensFromLocalStorage } from "../../services/token-service";
import { verifyTokenReducer } from "../LoginSlice";

export const verifyToken = async (dispatch: Dispatch<any>) => {
  const { tokens } = getTokensFromLocalStorage();

  const { isSuccess } = await fetchVerifyToken(tokens?.accessToken || "");

  if (isSuccess) {
    dispatch(
      verifyTokenReducer({
        isAuthenticated: true,
        isLoading: false,
      })
    );
    return true;
  } else {
    dispatch(
      verifyTokenReducer({
        isAuthenticated: false,
        accessToken: "",
        refreshToken: "",
        isLoading: false,
      })
    );
    return false;
  }
};
