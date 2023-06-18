import { showAlert, showNoti } from "@/src/apps/Common/redux/NotificationSlice"
import { ResetPasswordAuth } from "../../models"
import resetPasswordFetch from "../../services/reset-password-fetch"
import { resetPasswordReducer } from "../AuthSlice"


const resetPassword = async (data: ResetPasswordAuth, dispatch: any) => {
    dispatch(resetPasswordReducer({
        isLoading: true
    }))
    const {
        state,
        isSuccess,
        errors
    } = await resetPasswordFetch(data)
    if (isSuccess) {
        dispatch(showAlert({
            messageAlert: "Actualizacion de contraseña exitosa.",
            typeAlert: "Success"
        }))

        dispatch(resetPasswordReducer({
            isLoading: false,
            isUpdatedPassword: true

        }))
    } else {
        dispatch(showNoti({
            message: "No se pudo actualizar la contraseña.",
            type: "Fail"
        }))

        dispatch(resetPasswordReducer({
            isLoading: false,
            errors: errors
        }))
    }
}

export default resetPassword