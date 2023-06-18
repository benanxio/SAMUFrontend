import { showNoti } from "@/src/apps/Common/redux/NotificationSlice";
import { UserRegisterData } from "../../models/register.models";
import { registerFetch } from "../../services/register-fetch";
import { signupReducer } from "../RegisterSlice";

export default async function signUp(user: UserRegisterData, dispatch: any) {
  dispatch(
    signupReducer({
      isLoading: true,
    })
  );
  try {
    const { isCreated, errors } = await registerFetch(user);

    if (isCreated) {
      dispatch(
        signupReducer({
          isLoading: false,
          isSendEmail: true,
          isActivateEmail:true,
          errors: {},
        })
      );
      dispatch(
        showNoti({
          message:
            "Usuario Creado.Te hemos mandado un correo de verificacion para activar tu cuenta.",
          type: "Success",
        })
      );

      return true;
    } else {
      dispatch(
        signupReducer({
          isLoading: false,
          isSendEmail: false,
          errors: errors,
          isActivateEmail:false,
          
        })
      );

      return false;
    }
  } catch (error) {
    dispatch(
      signupReducer({
        isLoading: false,
        isActivateEmail:false,
      })
    );

    return false;
  }
}
