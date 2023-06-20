import { RootState } from "@/src/redux/store";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { UserAuth } from "../login.model";
import { verifyTokenReducer } from "../redux/LoginSlice";
import { logOut } from "../redux/useCases/log-out";
import { signIn } from "../redux/useCases/sign-in";
const useLogin = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading, errors, isAuthenticated } = useSelector(
    (state: RootState) => state.Login
  );
  const loginWithEmail = async (userAuth: UserAuth) => {
    const isLogged = await signIn(userAuth, dispatch);
    if (isLogged) {
      router.push("/");
    }
  };
  const logOutApp = async () => {
    await logOut(dispatch);
    router.push("/login")
  };
  const clearErrors = () => {
    dispatch(
      verifyTokenReducer({
        errors: {},
      })
    );
  };
  return {
    loginWithEmail,
    isLoading,
    clearErrors,
    loginErrors: errors,
    isAuthenticated,
    logOutApp,
  };
};

export default useLogin;
