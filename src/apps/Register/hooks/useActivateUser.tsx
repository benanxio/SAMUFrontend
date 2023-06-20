import { RootState } from "@/src/redux/store";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import activateUser from "../redux/useCases/activate-user";
import { DataActivation } from "../register.models";

const useActivateUser = () => {
  const dispatch = useDispatch();
  const { isLoading, errors, isActivateEmail } = useSelector(
    (state: RootState) => state.Register
  );
  const router = useRouter();
  const activateUserWithEmail = async (data: DataActivation) => {
    let is = await activateUser(data, dispatch);
    if (is) {
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  };

  return {
    activateUserWithEmail,
    isLoadingActivate: isLoading,
    errors,
    isActivateEmail,
  };
};

export default useActivateUser;
