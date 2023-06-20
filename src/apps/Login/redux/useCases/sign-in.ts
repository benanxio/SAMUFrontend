import { showNoti } from "@/src/apps/Common/redux/NotificationSlice";
import { Dispatch } from "redux";
import { UserAuth } from "../../login.model";
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
  const { errors, isSuccess, data, networkError } = await fetchCreateToken(
    userAuth
  );

  if (isSuccess) {
    saveTokensToLocalStorage({
      accessToken: data?.access,
      refreshToken: data?.refresh,
    });
    dispatch(
      showNoti({
        type: "success",
        message: "Inicio de sesion con exito",
        visible: true,
      })
    );
    dispatch(
      verifyTokenReducer({
        accessToken: data?.access,
        refreshToken: data?.refresh,
        isAuthenticated: true,
        isLoading: false,
      })
    );

    return true;
  } else {
    if (networkError) {
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
