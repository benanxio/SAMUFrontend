import { RootState } from "@/src/redux/store";
import { useDispatch, useSelector } from "react-redux";
import useRender from "../../Common/hooks/useRender";
import { UserRegisterData } from "../models/register.models";
import signUp from "../redux/useCases/sign-up";

const useRegister = () => {
  const isRender = useRender()
  
  console.log(isRender)
  const dispatch = useDispatch();
  const { isLoading, errors, isSendEmail } = useSelector(
    (state: RootState) => state.Register
  );
  const signNupWithEmail = async (user: UserRegisterData) => {
    await signUp(user, dispatch);
  };
  return {
    signNupWithEmail,
    errors: errors,
    signupLoading: isLoading,
    isSendEmail,
  };
};

export default useRegister;
