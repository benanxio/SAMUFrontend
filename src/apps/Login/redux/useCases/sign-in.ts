import { showNoti } from "@/src/apps/Common/redux/NotificationSlice";
import { Dispatch } from "redux";
import { UserAuth } from "../../models/login.model";
import fetchCreateToken from "../../services/create-token";
import { saveTokensToLocalStorage } from "../../services/token-service";
import { verifyTokenReducer } from "../LoginSlice";

export const signIn = async (
  userAuth: UserAuth,
  dispatch: Dispatch<any>
): Promise<boolean> => {
  dispatch(
    verifyTokenReducer({
      isLoading: true,
    })
  );
  const { errors, status, isAuthenticated, data, networkerror } =
    await fetchCreateToken(userAuth);

  if (isAuthenticated) {
    dispatch(
      showNoti({
        type: "success",
        message: "Inicio de sesion con exito",
        visible: true,
      })
    );
    dispatch(
      verifyTokenReducer({
        accessToken: data?.accessToken,
        refreshToken: data?.refreshToken,
        isAuthenticated: true,
        isLoading: false,
      })
    );
    saveTokensToLocalStorage({
      accessToken: data?.accessToken,
      refreshToken: data?.refreshToken,
    });
    return true;
  } else {
    if (networkerror) {
      dispatch(
        showNoti({
          type: "error",
          message: "Error de red.El servidor no esta disponible.",
        })
      );
    }
    dispatch(
      verifyTokenReducer({
        isAuthenticated: false,
        accessToken: "",
        refreshToken: "",
        isLoading: false,
        errors: errors,
      })
    );
    return false;
  }
};
