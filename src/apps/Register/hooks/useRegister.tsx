import { RootState } from "@/src/redux/store";
import { useDispatch, useSelector } from "react-redux";
import useRender from "../../Common/hooks/useRender";
import signUp from "../redux/useCases/sign-up";
import { UserRegisterData } from "../register.models";

const useRegister = () => {
  const isRender = useRender()
  
  
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
