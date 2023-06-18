import { showNoti } from "@/src/apps/Common/redux/NotificationSlice";
import { Dispatch } from "react";
import { DataActivation } from "../../models/register.models";
import fetchActivation from "../../services/fetch-activation";
import { activateUserReducer } from "../RegisterSlice";

const activateUser = async (data: DataActivation, dispatch: Dispatch<any>) => { 
  dispatch(
    activateUserReducer({
      isLoading: true,
    })
  );

  const { state, isSuccess, errors } = await fetchActivation(data);

  if (isSuccess) {
    
    dispatch(
      activateUserReducer({
        isActivateEmail: true,
        isLoading: false,
      })
    );
    dispatch(
      showNoti({
        type: "success",
        message: "Usuario activado con exito.",
      })
    );
  } else {
    dispatch(
      showNoti({
        type: "error",
        message: "No se puedo activar el usuario.Token invalido",
      })
    );
    dispatch(
      activateUserReducer({
        isActivateEmail: false,
        isLoading: false,
        errors: errors,
      })
    );
  }
};

export default activateUser;
