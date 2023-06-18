import { RootState } from '@/src/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { ResetPasswordAuth } from '../models'
import resetPassword from '../redux/useCases/reset-password'

const useResetPassword = () => {
    const dispatch = useDispatch()

    const { isLoading, isUpdatedPassword, errors } = useSelector((state: RootState) => state.Auth)
    const resetPaswordWithemail = async (data: ResetPasswordAuth) => {

        await resetPassword(data, dispatch)

    }
    return {
        resetPaswordWithemail,
        isLoadingResetPassword: isLoading,
        isUpdatedPassword, errors
    }
}

export default useResetPassword